import os


def _read_secret(path, fallback_env, default=''):
    """Read a Docker secret file, fall back to env var."""
    if path and os.path.exists(path):
        with open(path) as f:
            return f.read().strip()
    return os.getenv(fallback_env, default)


class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv(
        'DATABASE_URL',
        'postgresql://hanuman:password@db:5432/hanuman_db',
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_size': 5,
        'pool_recycle': 300,
        'pool_pre_ping': True,
    }

    REDIS_URL = os.getenv('REDIS_URL', 'redis://redis:6379/0')

    CORS_ORIGINS = os.getenv('CORS_ORIGINS', '*').split(',')
