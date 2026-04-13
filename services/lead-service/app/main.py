from flask import Flask, jsonify
from flask_cors import CORS

from app.config import Config
from app.database import db
from app.routes import leads_bp, misc_bp


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)

    CORS(app, origins=app.config['CORS_ORIGINS'], supports_credentials=True)

    app.register_blueprint(leads_bp)
    app.register_blueprint(misc_bp)

    @app.route('/health')
    def health():
        try:
            db.session.execute(db.text('SELECT 1'))
            return jsonify({'status': 'healthy', 'service': 'lead-service'}), 200
        except Exception:
            return jsonify({'status': 'unhealthy', 'service': 'lead-service'}), 503

    return app


app = create_app()
