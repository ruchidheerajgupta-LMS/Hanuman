from flask import Blueprint, request, jsonify, current_app, make_response
import requests as http_requests
import psycopg2
import psycopg2.extras
import bcrypt
import secrets
import string

gateway_bp = Blueprint('gateway', __name__, url_prefix='/api/gateway')


def _get_db_conn():
    """Get a connection to TrainTrack's PostgreSQL database."""
    return psycopg2.connect(current_app.config['TRAINTRACK_DB_URL'])


@gateway_bp.route('/tenants', methods=['GET'])
def list_tenants():
    """Return all active tenants with branding info for the portal page."""
    try:
        conn = _get_db_conn()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cur.execute("""
            SELECT id, name, rto_code, domain, logo_url, primary_color, tagline,
                   plan, status
            FROM tenants
            WHERE status = 'active'
            ORDER BY name
        """)
        tenants = cur.fetchall()
        cur.close()
        conn.close()
        return jsonify({'success': True, 'data': tenants}), 200
    except Exception as e:
        current_app.logger.error(f'Failed to fetch tenants: {e}')
        return jsonify({'success': False, 'error': 'Failed to fetch tenants'}), 500


@gateway_bp.route('/tenants/<rto_code>', methods=['GET'])
def get_tenant(rto_code):
    """Return a single tenant's branding info by RTO code."""
    try:
        conn = _get_db_conn()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cur.execute("""
            SELECT id, name, rto_code, domain, email, phone, address,
                   logo_url, primary_color, tagline, plan, status
            FROM tenants
            WHERE rto_code = %s
        """, (rto_code,))
        tenant = cur.fetchone()
        cur.close()
        conn.close()

        if not tenant:
            return jsonify({'success': False, 'error': 'Tenant not found'}), 404
        if tenant['status'] == 'suspended':
            return jsonify({'success': False, 'error': 'This RTO account is suspended'}), 403

        return jsonify({'success': True, 'data': tenant}), 200
    except Exception as e:
        current_app.logger.error(f'Failed to fetch tenant: {e}')
        return jsonify({'success': False, 'error': 'Failed to fetch tenant'}), 500


@gateway_bp.route('/identify', methods=['POST'])
def identify():
    """Resolve a tenant's branding from a user's email, for the email-first
    login step. Always returns 200 with branding-or-null so this endpoint can't
    be used to enumerate which emails exist (it never says 'no such user')."""
    data = request.get_json(silent=True) or {}
    email = (data.get('email') or '').lower().strip()
    if not email:
        return jsonify({'success': True, 'data': {'tenant': None}}), 200

    tenant = None
    try:
        conn = _get_db_conn()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cur.execute("""
            SELECT t.name, t.rto_code, t.logo_url, t.primary_color, t.tagline, t.status
            FROM users u
            JOIN tenants t ON t.id = u.tenant_id
            WHERE u.email = %s AND u.is_active = TRUE
            LIMIT 1
        """, (email,))
        row = cur.fetchone()
        cur.close()
        conn.close()
        if row and row['status'] == 'active':
            tenant = {
                'name': row['name'], 'rto_code': row['rto_code'],
                'logo_url': row['logo_url'], 'primary_color': row['primary_color'],
                'tagline': row['tagline'],
            }
    except Exception as e:
        current_app.logger.error(f'identify failed: {e}')
        # Fail open to a neutral response — never block login on a lookup error.

    return jsonify({'success': True, 'data': {'tenant': tenant}}), 200


@gateway_bp.route('/login', methods=['POST'])
def gateway_login():
    """Proxy login to TrainTrack auth service and return tenant-aware response."""
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'success': False, 'error': 'Email and password are required'}), 400

    # The base auth URL must NOT include a path — this endpoint appends
    # /api/auth/login. Be forgiving of misconfiguration: strip a trailing slash
    # and an accidental '/api/auth' suffix so the call doesn't become a doubled
    # path (which returns a 404 HTML page and used to crash json parsing).
    auth_url = current_app.config['TRAINTRACK_AUTH_URL'].rstrip('/')
    if auth_url.endswith('/api/auth'):
        auth_url = auth_url[: -len('/api/auth')]

    # Pass remember_me to auth service via request forwarding
    login_payload = {'email': data['email'], 'password': data['password']}
    if data.get('remember_me'):
        login_payload['remember_me'] = True

    try:
        resp = http_requests.post(
            f'{auth_url}/api/auth/login',
            json=login_payload,
            timeout=30,
            verify=False,
        )
    except http_requests.RequestException as e:
        current_app.logger.error(f'Auth service unreachable: {e}')
        return jsonify({'success': False, 'error': 'Authentication service unavailable'}), 503

    # The auth service should always return JSON. If it doesn't (e.g. a wrong
    # URL hitting an nginx 404 page), surface a clear error instead of a 500.
    try:
        body = resp.json()
    except ValueError:
        current_app.logger.error(
            f'Auth service returned non-JSON ({resp.status_code}) from {auth_url}/api/auth/login'
        )
        return jsonify({'success': False, 'error': 'Authentication service misconfigured'}), 502

    if resp.status_code != 200:
        return jsonify(body), resp.status_code

    auth_data = body
    user = auth_data.get('data', {}).get('user', {})
    tenant_id = user.get('tenant_id')

    # Fetch tenant branding if user belongs to one
    tenant_info = None
    if tenant_id:
        try:
            conn = _get_db_conn()
            cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
            cur.execute("""
                SELECT id, name, rto_code, domain, logo_url, primary_color, tagline
                FROM tenants WHERE id = %s
            """, (tenant_id,))
            tenant_info = cur.fetchone()
            cur.close()
            conn.close()
        except Exception as e:
            current_app.logger.error(f'Failed to fetch tenant for login: {e}')

    # ✓ FIXED: Relay cookies with correct domain for cross-port access
    # cookies sent between localhost:9080 (Hanuman) and localhost:3000 (TrainTrack)
    response = make_response(jsonify({
        'success': True,
        'data': {
            'user': user,
            'tenant': tenant_info,
            'must_change_password': auth_data.get('data', {}).get('must_change_password', False) or user.get('must_change_password', False),
            'traintrack_url': current_app.config['TRAINTRACK_FRONTEND_URL'],
        }
    }))
    
    # Extract JWT cookie(s) from auth response and re-set with localhost domain
    # resp.cookies is a dict-like object with cookie names and values
    for cookie_name, cookie_value in resp.cookies.items():
        # Re-set cookie with correct attributes for cross-port access
        response.set_cookie(
            cookie_name,
            value=cookie_value,
            domain='localhost',  # ✓ Works across all localhost ports
            path='/',
            httponly=True,  # ✓ All JWT cookies should be httponly
            secure=False,   # ✓ False for http:// (development). Set True for production with https://
            samesite='Lax',  # ✓ Allow same-site requests
        )
        
        current_app.logger.info(f'Set cookie {cookie_name} with domain=localhost')

    return response, 200


@gateway_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    """Handle password reset request.

    Generates a temporary password, sets must_change_password flag,
    and returns success. In production, an email service would send
    the temp password to the user. For now, the admin can also reset
    passwords manually from the admin panel.
    """
    data = request.get_json()
    email = (data.get('email') or '').lower().strip()
    if not email:
        return jsonify({'success': False, 'error': 'Email is required'}), 400

    # Generic response used whether or not the account exists, so this endpoint
    # can't be used to enumerate registered email addresses.
    generic = jsonify({
        'success': True,
        'emailed': True,
        'message': 'If an account exists for this email, a temporary password has been sent to it.',
    }), 200

    try:
        conn = _get_db_conn()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        cur.execute("SELECT id, email, first_name, tenant_id FROM users WHERE email = %s AND is_active = TRUE", (email,))
        user = cur.fetchone()

        if not user:
            cur.close()
            conn.close()
            return generic

        # Generate a temporary password
        alphabet = string.ascii_letters + string.digits + '!@#$'
        temp_password = ''.join(secrets.choice(alphabet) for _ in range(12))
        hashed = bcrypt.hashpw(temp_password.encode('utf-8'), bcrypt.gensalt(12)).decode('utf-8')

        from app.email_utils import is_configured, send_password_reset
        login_url = current_app.config.get('PORTAL_URL', '')

        if is_configured():
            # Only change the password if we can actually deliver it — otherwise
            # the user would be locked out with a password they never receive.
            sent = send_password_reset(user['email'], user.get('first_name'), temp_password, login_url)
            if not sent:
                cur.close(); conn.close()
                return jsonify({'success': False, 'error': 'Unable to send the reset email right now. Please try again later or contact your administrator.'}), 503

            cur.execute(
                "UPDATE users SET password_hash = %s, must_change_password = TRUE, failed_login_attempts = 0, locked_until = NULL, updated_at = NOW() WHERE id = %s",
                (hashed, user['id'])
            )
            conn.commit()
            cur.close(); conn.close()
            current_app.logger.info(f"Password reset for {email}: temporary password emailed")
            return generic

        # ── SMTP not configured (local/dev or pre-setup) ──────────────────────
        # Fall back to the legacy behaviour of returning the temp password inline
        # so the flow still works, but flag it so the UI/admin knows email is off.
        cur.execute(
            "UPDATE users SET password_hash = %s, must_change_password = TRUE, failed_login_attempts = 0, locked_until = NULL, updated_at = NOW() WHERE id = %s",
            (hashed, user['id'])
        )
        conn.commit()
        cur.close(); conn.close()
        current_app.logger.warning(f"Password reset for {email}: SMTP not configured — returning temp password inline")
        return jsonify({
            'success': True,
            'emailed': False,
            'temp_password': temp_password,
            'first_name': user['first_name'],
        }), 200

    except Exception as e:
        current_app.logger.error(f'Password reset failed: {e}')
        return jsonify({'success': False, 'error': 'Password reset service unavailable'}), 500


@gateway_bp.route('/change-password', methods=['POST'])
def change_password():
    """Change password for a user who must_change_password.

    Accepts email + current_password (to verify identity) + new_password.
    Validates new password rules, hashes and saves, clears must_change_password flag.
    """
    data = request.get_json()
    email = (data.get('email') or '').lower().strip()
    current_pw = data.get('current_password', '')
    new_pw = data.get('new_password', '')

    if not email or not current_pw or not new_pw:
        return jsonify({'success': False, 'error': 'Email, current password, and new password are required'}), 400

    # Password rules: min 8 chars, at least 1 uppercase, 1 lowercase, 1 digit
    if len(new_pw) < 8:
        return jsonify({'success': False, 'error': 'Password must be at least 8 characters'}), 400
    import re
    if not re.search(r'[A-Z]', new_pw):
        return jsonify({'success': False, 'error': 'Password must contain at least one uppercase letter'}), 400
    if not re.search(r'[a-z]', new_pw):
        return jsonify({'success': False, 'error': 'Password must contain at least one lowercase letter'}), 400
    if not re.search(r'[0-9]', new_pw):
        return jsonify({'success': False, 'error': 'Password must contain at least one number'}), 400

    try:
        conn = _get_db_conn()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        cur.execute("SELECT id, password_hash, must_change_password FROM users WHERE email = %s AND is_active = TRUE", (email,))
        user = cur.fetchone()

        if not user:
            cur.close()
            conn.close()
            return jsonify({'success': False, 'error': 'Invalid credentials'}), 401

        # Verify current (temporary) password
        if not bcrypt.checkpw(current_pw.encode('utf-8'), user['password_hash'].encode('utf-8')):
            cur.close()
            conn.close()
            return jsonify({'success': False, 'error': 'Current password is incorrect'}), 401

        # Hash and save new password, clear must_change_password
        hashed = bcrypt.hashpw(new_pw.encode('utf-8'), bcrypt.gensalt(12)).decode('utf-8')
        cur.execute(
            "UPDATE users SET password_hash = %s, must_change_password = FALSE, updated_at = NOW() WHERE id = %s",
            (hashed, user['id'])
        )
        conn.commit()
        cur.close()
        conn.close()

        return jsonify({'success': True, 'message': 'Password changed successfully'}), 200

    except Exception as e:
        current_app.logger.error(f'Change password failed: {e}')
        return jsonify({'success': False, 'error': 'Password change service unavailable'}), 500
