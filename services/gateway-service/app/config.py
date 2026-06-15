import os


class Config:
    TRAINTRACK_AUTH_URL = os.environ.get('TRAINTRACK_AUTH_URL', 'http://traintrack-auth:5001')
    TRAINTRACK_FRONTEND_URL = os.environ.get('TRAINTRACK_FRONTEND_URL', 'http://localhost:3000')
    TRAINTRACK_DB_URL = os.environ.get('TRAINTRACK_DB_URL')
    # Public URL of the Hanuman portal — used for the "Sign in" link in emails
    PORTAL_URL = os.environ.get('PORTAL_URL', '')
    REDIS_URL = os.environ.get('REDIS_URL', 'redis://redis:6379/0')
    CORS_ORIGINS = [o.strip() for o in os.environ.get('CORS_ORIGINS', '').split(',') if o.strip()]
