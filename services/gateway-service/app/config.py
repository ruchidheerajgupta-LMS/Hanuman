import os


class Config:
    TRAINTRACK_AUTH_URL = os.environ.get('TRAINTRACK_AUTH_URL', 'http://traintrack-auth:5001')
    TRAINTRACK_DB_URL = os.environ.get('TRAINTRACK_DB_URL')
    REDIS_URL = os.environ.get('REDIS_URL', 'redis://redis:6379/0')
    CORS_ORIGINS = [o.strip() for o in os.environ.get('CORS_ORIGINS', '').split(',') if o.strip()]
