import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev')
    UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
    RESULTS_FOLDER = os.path.join(os.getcwd(), 'results')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB max upload size
    SQLALCHEMY_DATABASE_URI = 'sqlite:///app.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'super-secret-key') 