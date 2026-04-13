import re

from flask import Blueprint, request, jsonify
from app.database import db
from app.models import Lead

leads_bp = Blueprint('leads', __name__, url_prefix='/api/leads')

EMAIL_RE = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')


@leads_bp.route('/audit-booking', methods=['POST'])
def book_audit():
    """Submit a compliance audit booking from the marketing site."""
    data = request.get_json(silent=True) or {}

    name = (data.get('name') or '').strip()
    email = (data.get('email') or '').strip()
    rto_name = (data.get('rto_name') or '').strip()

    errors = []
    if not name:
        errors.append('Name is required')
    if not email or not EMAIL_RE.match(email):
        errors.append('Valid email is required')
    if not rto_name:
        errors.append('RTO name is required')

    if errors:
        return jsonify({'success': False, 'errors': errors}), 400

    lead = Lead(
        name=name,
        email=email,
        rto_name=rto_name,
        student_count=data.get('student_count', 'Under 50'),
        pain_point=data.get('pain_point', 'AVETMISS exports and errors'),
        source=data.get('source', 'website'),
        ip_address=request.headers.get('X-Real-IP', request.remote_addr),
        user_agent=request.headers.get('User-Agent', '')[:500],
        utm_source=data.get('utm_source', '')[:100] or None,
        utm_medium=data.get('utm_medium', '')[:100] or None,
        utm_campaign=data.get('utm_campaign', '')[:100] or None,
    )
    db.session.add(lead)
    db.session.commit()

    return jsonify({
        'success': True,
        'message': 'Audit booking received! Check your email for confirmation.',
        'data': {'id': lead.id},
    }), 201


@leads_bp.route('', methods=['GET'])
def list_leads():
    """List all leads (admin endpoint — add auth later)."""
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 20))
    status_filter = request.args.get('status')

    query = Lead.query
    if status_filter:
        query = query.filter_by(status=status_filter)

    paginated = query.order_by(Lead.created_at.desc()).paginate(
        page=page, per_page=per_page, error_out=False
    )

    return jsonify({
        'success': True,
        'data': [l.to_dict() for l in paginated.items],
        'meta': {
            'page': page,
            'per_page': per_page,
            'total': paginated.total,
            'pages': paginated.pages,
        },
    })


@leads_bp.route('/<int:lead_id>', methods=['GET'])
def get_lead(lead_id):
    lead = Lead.query.get(lead_id)
    if not lead:
        return jsonify({'success': False, 'error': 'Lead not found'}), 404
    return jsonify({'success': True, 'data': lead.to_dict()})


@leads_bp.route('/<int:lead_id>/status', methods=['PUT'])
def update_lead_status(lead_id):
    """Update lead status (admin endpoint)."""
    lead = Lead.query.get(lead_id)
    if not lead:
        return jsonify({'success': False, 'error': 'Lead not found'}), 404

    data = request.get_json(silent=True) or {}
    new_status = data.get('status')
    valid = {'new', 'contacted', 'qualified', 'converted', 'lost'}
    if new_status not in valid:
        return jsonify({'success': False, 'error': f'Invalid status. Must be one of: {", ".join(sorted(valid))}'}), 400

    lead.status = new_status
    lead.notes = data.get('notes', lead.notes)
    db.session.commit()

    return jsonify({'success': True, 'data': lead.to_dict()})
