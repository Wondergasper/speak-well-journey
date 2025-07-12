#!/usr/bin/env python3
"""
Simple database initialization script
"""

import os
import sys

def init_database():
    """Initialize the database"""
    
    print("🗄️  Initializing database...")
    
    try:
        # Import Flask app
        from app import app
        
        with app.app_context():
            from db import db
            from models import User, Exercise, Progress, AnalysisResult, Notification
            
            # Create all tables
            print("📋 Creating database tables...")
            db.create_all()
            print("✅ Database tables created successfully!")
            
            # Check if database is accessible
            from sqlalchemy import text
            result = db.session.execute(text("SELECT name FROM sqlite_master WHERE type='table'"))
            tables = [row[0] for row in result.fetchall()]
            print(f"📊 Found {len(tables)} tables: {', '.join(tables)}")
            
            # Test basic operations
            print("🔍 Testing database operations...")
            
            # Test user creation
            test_user = User.query.first()
            if test_user:
                print(f"✅ Found existing user: {test_user.name}")
            else:
                print("ℹ️  No users found (this is normal for a new database)")
            
            # Test exercise count
            exercise_count = Exercise.query.count()
            print(f"✅ Found {exercise_count} exercises")
            
            print("\n🎉 Database initialization completed successfully!")
            return True
            
    except Exception as e:
        print(f"❌ Database initialization failed: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == '__main__':
    success = init_database()
    if success:
        print("\n🚀 Database is ready! You can now start the server.")
    else:
        print("\n🔧 Please fix the database issues before starting the server.") 