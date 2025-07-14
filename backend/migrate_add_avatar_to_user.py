from db import db
from app import app
from sqlalchemy import inspect, text

with app.app_context():
    inspector = inspect(db.engine)
    columns = [col['name'] for col in inspector.get_columns('user')]
    if 'avatar' not in columns:
        with db.engine.connect() as conn:
            conn.execute(text('ALTER TABLE user ADD COLUMN avatar TEXT'))
        print("✅ 'avatar' column added to user table.")
    else:
        print("'avatar' column already exists.") 