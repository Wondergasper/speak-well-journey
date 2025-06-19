from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

# Import blueprints (to be created)
from routes.analysis import analysis_bp
from routes.auth import auth_bp
from routes.profile import profile_bp
from routes.settings import settings_bp
from routes.exercises import exercises_bp
from routes.progress import progress_bp
from routes.community import community_bp

db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    CORS(app)
    db.init_app(app)
    jwt.init_app(app)

    # Register blueprints
    app.register_blueprint(analysis_bp, url_prefix='/api/analysis')
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(profile_bp, url_prefix='/api/profile')
    app.register_blueprint(settings_bp, url_prefix='/api/settings')
    app.register_blueprint(exercises_bp, url_prefix='/api/exercises')
    app.register_blueprint(progress_bp, url_prefix='/api/progress')
    app.register_blueprint(community_bp, url_prefix='/api/community')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True) 