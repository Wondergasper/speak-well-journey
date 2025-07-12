#!/usr/bin/env python3
"""
Script to create a test user for authentication testing
"""

import os
import sys
from werkzeug.security import generate_password_hash

def create_test_user():
    """Create a test user in the database"""
    
    print("👤 Creating test user...")
    
    try:
        # Import Flask app
        from app import app
        
        with app.app_context():
            from db import db
            from models import User
            
            # Check if test user already exists
            existing_user = User.query.filter_by(email='test@example.com').first()
            if existing_user:
                print("✅ Test user already exists:")
                print(f"   Email: {existing_user.email}")
                print(f"   Name: {existing_user.name}")
                print(f"   ID: {existing_user.id}")
                return existing_user
            
            # Create new test user
            test_user = User(
                name='Test User',
                email='test@example.com',
                password_hash=generate_password_hash('password123'),
                severity='mild'
            )
            
            db.session.add(test_user)
            db.session.commit()
            
            print("✅ Test user created successfully!")
            print(f"   Email: {test_user.email}")
            print(f"   Password: password123")
            print(f"   Name: {test_user.name}")
            print(f"   ID: {test_user.id}")
            
            return test_user
            
    except Exception as e:
        print(f"❌ Failed to create test user: {e}")
        import traceback
        traceback.print_exc()
        return None

def test_login():
    """Test the login functionality"""
    
    print("\n🧪 Testing login functionality...")
    
    try:
        import requests
        
        login_data = {
            "email": "test@example.com",
            "password": "password123"
        }
        
        response = requests.post(
            "http://localhost:5000/api/auth/login",
            json=login_data,
            headers={"Content-Type": "application/json"},
            timeout=5
        )
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Login test successful!")
            print(f"   Token: {data.get('token', 'N/A')[:20]}...")
            print(f"   User: {data.get('user', {}).get('name', 'N/A')}")
            return True
        else:
            print(f"❌ Login test failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Login test error: {e}")
        return False

def list_users():
    """List all users in the database"""
    
    print("📋 Listing all users...")
    
    try:
        from app import app
        
        with app.app_context():
            from models import User
            
            users = User.query.all()
            
            if not users:
                print("ℹ️  No users found in database")
                return
            
            print(f"Found {len(users)} user(s):")
            for user in users:
                print(f"   ID: {user.id}, Name: {user.name}, Email: {user.email}")
                
    except Exception as e:
        print(f"❌ Failed to list users: {e}")

if __name__ == '__main__':
    if len(sys.argv) > 1:
        if sys.argv[1] == 'list':
            list_users()
        elif sys.argv[1] == 'test':
            test_login()
        else:
            print("Usage: python create_test_user.py [list|test]")
    else:
        create_test_user()
        print("\n🚀 You can now log in with:")
        print("   Email: test@example.com")
        print("   Password: password123")
        print("\n🧪 To test login, run: python create_test_user.py test") 