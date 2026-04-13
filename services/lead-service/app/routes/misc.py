from flask import Blueprint, request, jsonify
from app.database import db
from app.models import Contact, Subscriber, PageView

misc_bp = Blueprint('misc', __name__, url_prefix='/api')


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

    return jsonify({'success': True, 'message': 'Subscribed successfully!'}), 201


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
