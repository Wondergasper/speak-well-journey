from datetime import datetime
from db import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    bio = db.Column(db.Text)
    age = db.Column(db.Integer)
    severity = db.Column(db.String(32), default='mild')  # none, mild, moderate, severe
    therapy_goals = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    preferences = db.Column(db.JSON, default=dict)
    avatar = db.Column(db.String(256))  # Path or URL to profile picture

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        if not self.password_hash:
            return False
        return check_password_hash(self.password_hash, password)

    def get_preferences(self):
        return self.preferences or {}

class Exercise(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    instructions = db.Column(db.Text)
    duration_minutes = db.Column(db.Integer, default=10)
    category = db.Column(db.String(100), default="General")
    severity = db.Column(db.String(32), default='mild')  # none, mild, moderate, severe
    evidence_level = db.Column(db.String(20), default='B')  # A (strong), B (moderate), C (limited)
    target_skills = db.Column(db.Text)  # Specific skills this exercise targets
    prerequisites = db.Column(db.Text)  # What should be mastered before this exercise
    progress_indicators = db.Column(db.Text)  # How to measure progress
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

class Progress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercise.id'))
    date = db.Column(db.Date)
    score = db.Column(db.Integer)
    session_duration = db.Column(db.Integer)  # in seconds
    severity_level = db.Column(db.String(32))  # none, mild, moderate, severe
    notes = db.Column(db.Text)
    fluency_rating = db.Column(db.Integer)  # 1-10 scale
    confidence_rating = db.Column(db.Integer)  # 1-10 scale
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

class AnalysisResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    audio_file_path = db.Column(db.String(256))
    severity = db.Column(db.String(32))  # none, mild, moderate, severe
    score = db.Column(db.Integer)
    confidence = db.Column(db.Float)
    stutter_count = db.Column(db.Integer)
    word_count = db.Column(db.Integer)
    analysis_data = db.Column(db.JSON)  # detailed analysis results
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    content = db.Column(db.Text)
    created_at = db.Column(db.DateTime)

class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    message = db.Column(db.String(255), nullable=False)
    read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', backref=db.backref('notifications', lazy=True))