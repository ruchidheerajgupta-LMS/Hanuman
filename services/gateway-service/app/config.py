import os


class Config:
    TRAINTRACK_AUTH_URL = os.environ.get('TRAINTRACK_AUTH_URL', 'http://traintrack-auth:5001')
    # Verify the auth service's TLS certificate when proxying credentials to it.
    # Defaults to True (secure). Only set false if the auth URL is an HTTPS host
    # with a self-signed/internal cert — better still, point TRAINTRACK_AUTH_URL
    # at the internal/private endpoint so credentials never leave the private net.
    TRAINTRACK_VERIFY_TLS = os.environ.get('TRAINTRACK_VERIFY_TLS', 'true').lower() == 'true'
    TRAINTRACK_FRONTEND_URL = os.environ.get('TRAINTRACK_FRONTEND_URL', 'http://localhost:3000')
    TRAINTRACK_DB_URL = os.environ.get('TRAINTRACK_DB_URL')
    # Public URL of the Hanuman portal — used for the "Sign in" link in emails
    PORTAL_URL = os.environ.get('PORTAL_URL', '')
    # Domain the relayed SSO/JWT cookie is set on. For production where the
    # portal (traintrack.work) and the LMS (app.traintrack.work) are different
    # subdomains, set this to ".traintrack.work" so the cookie is shared with
    # the app. Defaults to "localhost" for local dev (cookies work across ports).
    SSO_COOKIE_DOMAIN = os.environ.get('SSO_COOKIE_DOMAIN', 'localhost')
    # Whether to mark the cookie Secure (required for https). Set true in prod.
    SSO_COOKIE_SECURE = os.environ.get('SSO_COOKIE_SECURE', 'false').lower() == 'true'
    REDIS_URL = os.environ.get('REDIS_URL', 'redis://redis:6379/0')
    CORS_ORIGINS = [o.strip() for o in os.environ.get('CORS_ORIGINS', '').split(',') if o.strip()]
