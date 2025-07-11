from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_socketio import SocketIO
from config import Config
import os
from db import db

jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Configure upload folder
    upload_folder = os.path.join(os.path.dirname(__file__), 'uploads')
    if not os.path.exists(upload_folder):
        os.makedirs(upload_folder)
    app.config['UPLOAD_FOLDER'] = upload_folder

    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})

    # Import models
    from models import User, Exercise, Progress

    # Create upload folder
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    # Global error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Resource not found'}), 404

    @app.errorhandler(500)
    def internal_error(error):
        db.session.rollback()
        return jsonify({'error': 'Internal server error'}), 500

    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({'error': 'Bad request'}), 400

    @jwt.unauthorized_loader
    def unauthorized_callback(callback):
        print("JWT unauthorized:", callback)
        return jsonify({'error': 'Missing or invalid token'}), 401

    @jwt.invalid_token_loader
    def invalid_token_callback(callback):
        print("JWT invalid:", callback)
        return jsonify({'error': 'Invalid token'}), 401

    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        print("JWT expired")
        return jsonify({'error': 'Token has expired'}), 401

    # Import and register blueprints
    from routes.auth import auth_bp
    from routes.exercises import exercises_bp
    from routes.progress import progress_bp
    from routes.analysis import analysis_bp
    from routes.user import user_bp
    from routes.profile import profile_bp
    from routes.settings import settings_bp
    from routes.community import community_bp
    from routes.analytics import analytics_bp
    from routes.notifications import notifications_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(exercises_bp, url_prefix='/api/exercises')
    app.register_blueprint(progress_bp, url_prefix='/api/progress')
    app.register_blueprint(analysis_bp, url_prefix='/api/analysis')
    app.register_blueprint(user_bp, url_prefix='/api/user')
    app.register_blueprint(profile_bp, url_prefix='/api/profile')
    app.register_blueprint(settings_bp, url_prefix='/api/settings')
    app.register_blueprint(community_bp, url_prefix='/api/community')
    app.register_blueprint(analytics_bp, url_prefix='/api/analytics')
    app.register_blueprint(notifications_bp, url_prefix='/api/notifications')

    # Global error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Resource not found'}), 404

    @app.errorhandler(500)
    def internal_error(error):
        db.session.rollback()
        app.logger.error(f'Server Error: {error}')
        return jsonify({'error': 'Internal server error'}), 500

    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({'error': 'Bad request'}), 400

    return app

app = create_app()

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000, debug=True)