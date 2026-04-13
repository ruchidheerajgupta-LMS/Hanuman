from flask import Flask, jsonify
from flask_cors import CORS

from app.config import Config
from app.routes import gateway_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app, origins=Config.CORS_ORIGINS, supports_credentials=True)

    app.register_blueprint(gateway_bp)

    @app.route('/health')
    def health():
        return jsonify({'status': 'healthy', 'service': 'gateway-service'}), 200

    return app


app = create_app()
