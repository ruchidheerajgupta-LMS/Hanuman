import base64
from datetime import datetime

from flask import Blueprint, request, jsonify, current_app
from app.database import db
from app.models import Contact, Subscriber, PageView, EmailOpen
from app.email_utils import notify_contact, welcome_subscriber

misc_bp = Blueprint('misc', __name__, url_prefix='/api')

# Smallest valid PNG: a single transparent pixel. Served by /track/open so an
# email client loading it (i.e. displaying the email's images) logs an open.
_TRANSPARENT_PIXEL = base64.b64decode(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII='
)


@misc_bp.route('/contact', methods=['POST'])
def submit_contact():
    """General contact form submission."""
    data = request.get_json(silent=True) or {}

    name = (data.get('name') or '').strip()
    email = (data.get('email') or '').strip()
    message = (data.get('message') or '').strip()

    if not name or not email or not message:
        return jsonify({'success': False, 'error': 'Name, email, and message are required'}), 400

    contact = Contact(
        name=name,
        email=email,
        subject=data.get('subject', ''),
        message=message,
        ip_address=request.headers.get('X-Real-IP', request.remote_addr),
    )
    db.session.add(contact)
    db.session.commit()

    try:
        notify_contact(contact)
    except Exception:
        pass

    return jsonify({'success': True, 'message': 'Message received!', 'data': {'id': contact.id}}), 201


@misc_bp.route('/subscribe', methods=['POST'])
def subscribe():
    """Newsletter subscription."""
    data = request.get_json(silent=True) or {}
    email = (data.get('email') or '').strip()

    if not email:
        return jsonify({'success': False, 'error': 'Email is required'}), 400

    existing = Subscriber.query.filter_by(email=email).first()
    if existing:
        if not existing.subscribed:
            existing.subscribed = True
            existing.unsubscribed_at = None
            db.session.commit()
        return jsonify({'success': True, 'message': 'Already subscribed!'})

    sub = Subscriber(email=email, source=data.get('source', 'website'))
    db.session.add(sub)
    db.session.commit()

    try:
        welcome_subscriber(email)
    except Exception:
        pass

    return jsonify({'success': True, 'message': 'Subscribed successfully!'}), 201


@misc_bp.route('/unsubscribe', methods=['POST'])
def unsubscribe():
    """
    Spam Act 2003 unsubscribe facility. Accepts the email via query param
    (?email=) so it works both as the RFC 8058 one-click target in a
    List-Unsubscribe header — mail clients POST there directly, no page
    involved — and as a plain form POST from the /unsubscribe page a human
    lands on after clicking the link in the email body.

    Reuses the same Subscriber table as the newsletter opt-in: it's the
    one master "should we ever email this address" list, regardless of
    which list originally added them. Idempotent — safe to call repeatedly
    for the same address.
    """
    email = (request.args.get('email') or (request.get_json(silent=True) or {}).get('email') or '').strip().lower()
    if not email:
        return jsonify({'success': False, 'error': 'Email is required'}), 400

    sub = Subscriber.query.filter_by(email=email).first()
    if sub:
        sub.subscribed = False
        sub.unsubscribed_at = datetime.utcnow()
    else:
        sub = Subscriber(
            email=email,
            subscribed=False,
            unsubscribed_at=datetime.utcnow(),
            source=request.args.get('source', 'cold_email'),
        )
        db.session.add(sub)
    db.session.commit()

    return jsonify({'success': True, 'message': "You've been unsubscribed and won't receive further emails from us."})


@misc_bp.route('/unsubscribed', methods=['GET'])
def list_unsubscribed():
    """
    Export the current suppression list for the sending automation to pull
    before each campaign run, so it never relies solely on a local,
    disconnected CSV file. Key-protected (not public like /api/subscribe) —
    this lists real people who explicitly opted out.
    """
    key = current_app.config.get('UNSUB_EXPORT_KEY')
    if not key or request.headers.get('X-Export-Key') != key:
        return jsonify({'success': False, 'error': 'Not authorized'}), 401

    emails = [s.email for s in Subscriber.query.filter_by(subscribed=False).all()]
    return jsonify({'success': True, 'data': emails})


@misc_bp.route('/track/open', methods=['GET'])
def track_open():
    """
    Invisible 1x1 tracking pixel embedded in cold-email HTML bodies — the
    practical stand-in for a "read receipt" (real Disposition-Notification-To
    headers are silently ignored by nearly every modern client for
    unsolicited mail). Always returns the pixel even if email/campaign are
    missing or malformed, so a tracking hiccup never breaks the email's
    rendering for the recipient.
    """
    email = (request.args.get('email') or '').strip().lower()
    campaign = (request.args.get('campaign') or 'default').strip()
    if email:
        db.session.add(EmailOpen(
            email=email,
            campaign=campaign,
            user_agent=(request.headers.get('User-Agent') or '')[:500],
            ip_address=request.headers.get('X-Real-IP', request.remote_addr),
        ))
        db.session.commit()

    resp = current_app.response_class(_TRANSPARENT_PIXEL, mimetype='image/png')
    resp.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
    return resp


@misc_bp.route('/opens', methods=['GET'])
def list_opens():
    """
    Key-protected export of open events, for the sending automation's
    --report flag. Same protection model as /api/unsubscribed.
    """
    key = current_app.config.get('UNSUB_EXPORT_KEY')
    if not key or request.headers.get('X-Export-Key') != key:
        return jsonify({'success': False, 'error': 'Not authorized'}), 401

    query = EmailOpen.query
    campaign = request.args.get('campaign')
    if campaign:
        query = query.filter_by(campaign=campaign)
    opens = query.order_by(EmailOpen.opened_at.desc()).all()
    return jsonify({'success': True, 'data': [o.to_dict() for o in opens]})


@misc_bp.route('/analytics/pageview', methods=['POST'])
def track_pageview():
    """Lightweight page view tracking."""
    data = request.get_json(silent=True) or {}
    path = (data.get('path') or '/').strip()

    pv = PageView(
        path=path[:500],
        referrer=(data.get('referrer') or '')[:500] or None,
        user_agent=(request.headers.get('User-Agent') or '')[:500],
        ip_address=request.headers.get('X-Real-IP', request.remote_addr),
        session_id=data.get('session_id'),
    )
    db.session.add(pv)
    db.session.commit()

    return jsonify({'success': True}), 201
