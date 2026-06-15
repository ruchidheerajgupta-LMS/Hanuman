"""
Transactional email helper for the gateway-service (password reset).

is_configured() lets callers fall back gracefully when SMTP isn't set up yet
(e.g. local dev or before production SMTP is wired), instead of locking users
out of password reset.
"""
import os
import logging
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formataddr

log = logging.getLogger(__name__)


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


def is_configured() -> bool:
    return _settings() is not None


def _send(to_email: str, subject: str, html_body: str) -> bool:
    cfg = _settings()
    if not cfg or not to_email:
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


def send_password_reset(to_email: str, first_name: str, temp_password: str, login_url: str = '') -> bool:
    cta = (f'<p style="margin:22px 0;"><a href="{login_url}" '
           f'style="background:#0ED4A0;color:#063;text-decoration:none;font-weight:700;'
           f'padding:11px 22px;border-radius:8px;display:inline-block;">Sign in</a></p>') if login_url else ''
    body = f"""
      <h2 style="margin:0 0 12px;font-size:20px;">Hi {first_name or 'there'}, here's your temporary password</h2>
      <p>Use the temporary password below to sign in. You'll be prompted to set a new
      password immediately.</p>
      <p style="font-family:monospace;font-size:20px;font-weight:700;letter-spacing:.08em;
         background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 18px;text-align:center;">
         {temp_password}</p>
      {cta}
      <p style="margin-top:18px;color:#64748b;font-size:13px;">If you didn't request a password
      reset, you can safely ignore this email — your password won't change unless you use the
      temporary one above.</p>
    """
    html = f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Password reset</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px;">
    <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.08);">
      <tr><td style="background:#0A2540;padding:24px 32px;">
        <span style="color:#fff;font-size:22px;font-weight:700;letter-spacing:-.5px;">TrainTrack</span>
      </td></tr>
      <tr><td style="padding:32px;color:#1f2937;font-size:15px;line-height:1.6;">{body}</td></tr>
    </table>
  </td></tr></table>
</body></html>"""
    return _send(to_email, 'Your TrainTrack temporary password', html)
