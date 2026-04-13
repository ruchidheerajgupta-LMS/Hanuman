from flask import Blueprint, request, jsonify, current_app
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


@gateway_bp.route('/login', methods=['POST'])
def gateway_login():
    """Proxy login to TrainTrack auth service and return tenant-aware response."""
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'success': False, 'error': 'Email and password are required'}), 400

    auth_url = current_app.config['TRAINTRACK_AUTH_URL']

    # Pass remember_me to auth service via request forwarding
    login_payload = {'email': data['email'], 'password': data['password']}
    if data.get('remember_me'):
        login_payload['remember_me'] = True

    try:
        resp = http_requests.post(
            f'{auth_url}/api/auth/login',
            json=login_payload,
            timeout=10,
            verify=False,
        )
    except http_requests.RequestException as e:
        current_app.logger.error(f'Auth service unreachable: {e}')
        return jsonify({'success': False, 'error': 'Authentication service unavailable'}), 503

    if resp.status_code != 200:
        return jsonify(resp.json()), resp.status_code

    auth_data = resp.json()
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

    # Forward auth cookies from TrainTrack to the client
    response = jsonify({
        'success': True,
        'data': {
            'user': user,
            'tenant': tenant_info,
        }
    })

    # Relay Set-Cookie headers from TrainTrack auth response
    for cookie_name, cookie_value in resp.cookies.items():
        response.set_cookie(
            cookie_name,
            cookie_value,
            httponly='access_token' in cookie_name,
            secure=True,
            samesite='Lax',
            path='/',
        )

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

    try:
        conn = _get_db_conn()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        # Check if user exists
        cur.execute("SELECT id, email, first_name, tenant_id FROM users WHERE email = %s AND is_active = TRUE", (email,))
        user = cur.fetchone()

        if not user:
            # Return success even if user doesn't exist (no user enumeration)
            cur.close()
            conn.close()
            return jsonify({'success': True, 'message': 'If an account exists, reset instructions have been sent.'}), 200

        # Generate a temporary password
        alphabet = string.ascii_letters + string.digits + '!@#$'
        temp_password = ''.join(secrets.choice(alphabet) for _ in range(12))
        hashed = bcrypt.hashpw(temp_password.encode('utf-8'), bcrypt.gensalt(12)).decode('utf-8')

        # Update user with temp password and force change flag
        cur.execute(
            "UPDATE users SET password_hash = %s, must_change_password = TRUE, failed_login_attempts = 0, locked_until = NULL, updated_at = NOW() WHERE id = %s",
            (hashed, user['id'])
        )
        conn.commit()

        # Log the temp password for admin reference (in production, send via email)
        current_app.logger.info(f"Password reset for {email}: temporary password generated (check admin panel or email delivery)")

        cur.close()
        conn.close()

        return jsonify({
            'success': True,
            'message': 'If an account exists, reset instructions have been sent.'
        }), 200

    except Exception as e:
        current_app.logger.error(f'Password reset failed: {e}')
        return jsonify({'success': False, 'error': 'Password reset service unavailable'}), 500
