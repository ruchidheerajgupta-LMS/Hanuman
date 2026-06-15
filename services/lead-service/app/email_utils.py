"""
Lightweight transactional email helper for the lead-service.

SMTP settings are read from the environment. If SMTP_HOST is not set, email is
skipped (logged) rather than raising — so local/dev runs without a mail server
keep working. All call sites treat sending as best-effort and never block the
HTTP response on a mail failure.
"""
import os
import logging
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formataddr

log = logging.getLogger(__name__)

_BRAND_COLOR = '#0ED4A0'


def _settings():
    host = os.environ.get('SMTP_HOST', '').strip()
    if not host:
        return None
    return {
        'host':       host,
        'port':       int(os.environ.get('SMTP_PORT', 587)),
        'user':       os.environ.get('SMTP_USER', ''),
        'password':   os.environ.get('SMTP_PASSWORD', ''),
        'from_email': os.environ.get('SMTP_FROM_EMAIL', 'noreply@traintrack.work'),
        'from_name':  os.environ.get('SMTP_FROM_NAME', 'TrainTrack'),
        'tls':        os.environ.get('SMTP_TLS', 'true').lower() != 'false',
    }


def sales_inbox():
    """Address that internal lead / contact notifications are sent to."""
    return os.environ.get('SALES_NOTIFY_EMAIL', '').strip()


def send_email(to_email: str, subject: str, html_body: str) -> bool:
    cfg = _settings()
    if not cfg:
        log.info('SMTP not configured — skipping email to %s (%s)', to_email, subject)
        return False
    if not to_email:
        return False
    try:
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = formataddr((cfg['from_name'], cfg['from_email']))
        msg['To'] = to_email
        msg.attach(MIMEText(html_body, 'html'))
        with smtplib.SMTP(cfg['host'], cfg['port'], timeout=10) as srv:
            if cfg['tls']:
                srv.starttls()
            if cfg['user']:
                srv.login(cfg['user'], cfg['password'])
            srv.sendmail(cfg['from_email'], [to_email], msg.as_string())
        log.info('Email sent to %s | %s', to_email, subject)
        return True
    except Exception as exc:
        log.error('Email failed to %s: %s', to_email, exc)
        return False


def _wrap(body_html: str, title: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>{title}</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px;">
    <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.08);">
      <tr><td style="background:#0A2540;padding:24px 32px;">
        <span style="color:#fff;font-size:22px;font-weight:700;letter-spacing:-.5px;">TrainTrack</span>
      </td></tr>
      <tr><td style="padding:32px;color:#1f2937;font-size:15px;line-height:1.6;">{body_html}</td></tr>
      <tr><td style="padding:18px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;color:#94a3b8;font-size:12px;">
        TrainTrack — Compliance-first LMS for Australian RTOs
      </td></tr>
    </table>
  </td></tr></table>
</body></html>"""


# ── Public senders ────────────────────────────────────────────────────────────

def notify_audit_booking(lead) -> None:
    """Confirmation to the prospect + notification to the sales inbox."""
    # Prospect confirmation
    body = f"""
      <h2 style="margin:0 0 12px;font-size:20px;">Thanks, {lead.name.split(' ')[0]} — your audit is booked</h2>
      <p>We've received your compliance audit request for <strong>{lead.rto_name}</strong>.
      One of our specialists will be in touch within one business day to arrange a time.</p>
      <p style="margin-top:18px;color:#64748b;font-size:13px;">If you didn't request this, you can ignore this email.</p>
    """
    send_email(lead.email, 'Your TrainTrack compliance audit is booked', _wrap(body, 'Audit booked'))

    # Internal notification
    inbox = sales_inbox()
    if inbox:
        body = f"""
          <h2 style="margin:0 0 12px;font-size:18px;">New audit booking</h2>
          <table cellpadding="6" style="font-size:14px;">
            <tr><td style="color:#64748b;">Name</td><td><strong>{lead.name}</strong></td></tr>
            <tr><td style="color:#64748b;">Email</td><td>{lead.email}</td></tr>
            <tr><td style="color:#64748b;">RTO</td><td>{lead.rto_name}</td></tr>
            <tr><td style="color:#64748b;">Students</td><td>{lead.student_count or '—'}</td></tr>
            <tr><td style="color:#64748b;">Pain point</td><td>{lead.pain_point or '—'}</td></tr>
            <tr><td style="color:#64748b;">Source</td><td>{lead.source or '—'} / {lead.utm_source or 'direct'}</td></tr>
          </table>
        """
        send_email(inbox, f'New lead: {lead.rto_name} ({lead.name})', _wrap(body, 'New lead'))


def notify_contact(contact) -> None:
    """Notify the sales inbox of a contact-form message."""
    inbox = sales_inbox()
    if not inbox:
        return
    body = f"""
      <h2 style="margin:0 0 12px;font-size:18px;">New contact message</h2>
      <table cellpadding="6" style="font-size:14px;">
        <tr><td style="color:#64748b;">Name</td><td><strong>{contact.name}</strong></td></tr>
        <tr><td style="color:#64748b;">Email</td><td>{contact.email}</td></tr>
        <tr><td style="color:#64748b;">Subject</td><td>{contact.subject or '—'}</td></tr>
      </table>
      <p style="margin-top:14px;white-space:pre-wrap;">{contact.message}</p>
    """
    send_email(inbox, f'Contact form: {contact.subject or contact.name}', _wrap(body, 'Contact message'))


def welcome_subscriber(email: str) -> None:
    """Light confirmation to a new newsletter subscriber."""
    body = """
      <h2 style="margin:0 0 12px;font-size:20px;">You're subscribed 🎉</h2>
      <p>Thanks for subscribing to TrainTrack updates. We'll send occasional notes on
      RTO compliance, AVETMISS, and product news — no spam.</p>
    """
    send_email(email, 'Welcome to TrainTrack updates', _wrap(body, 'Subscribed'))
