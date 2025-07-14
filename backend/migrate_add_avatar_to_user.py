from backend.db import db
from backend.models import User
from sqlalchemy import Column, String
from sqlalchemy import inspect
from backend.app import app

with app.app_context():
    inspector = inspect(db.engine)
    columns = [col['name'] for col in inspector.get_columns('user')]
    if 'avatar' not in columns:
        with db.engine.connect() as conn:
            conn.execute('ALTER TABLE user ADD COLUMN avatar VARCHAR(256)')
        print("✅ 'avatar' column added to user table.")
    else:
        print("'avatar' column already exists.") 