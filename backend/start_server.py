#!/usr/bin/env python3
"""
Startup script for the Flask backend with error handling
"""

import sys
import os
import traceback

def main():
    """Start the Flask server with error handling"""
    
    print("🚀 Starting Flask backend server...")
    print("📍 Working directory:", os.getcwd())
    
    try:
        # Test basic imports first
        print("\n🔍 Testing imports...")
        
        # Test Flask and extensions
        try:
            from flask import Flask
            print("✅ Flask imported")
        except ImportError as e:
            print(f"❌ Flask import failed: {e}")
            print("Please install Flask: pip install flask")
            return
        
        # Test database
        try:
            from db import db
            print("✅ Database imported")
        except ImportError as e:
            print(f"❌ Database import failed: {e}")
            return
        
        # Test models
        try:
            from models import User, Exercise, Progress, AnalysisResult
            print("✅ Models imported")
        except ImportError as e:
            print(f"❌ Models import failed: {e}")
            return
        
        # Test ML model
        try:
            from ml.model import StutteringAnalyzer
            print("✅ ML model imported")
        except ImportError as e:
            print(f"⚠️  ML model import failed: {e}")
            print("Server will start with fallback analysis")
        
        # Test app creation
        print("\n🔍 Testing app creation...")
        try:
            from app import app
            print("✅ App created successfully")
        except Exception as e:
            print(f"❌ App creation failed: {e}")
            print("\n🔧 Error details:")
            traceback.print_exc()
            return
        
        # Test database connection
        print("\n🔍 Testing database connection...")
        try:
            with app.app_context():
                # Use the correct SQLAlchemy syntax
                from sqlalchemy import text
                db.session.execute(text("SELECT 1"))
                db.session.commit()
                print("✅ Database connection successful")
        except Exception as e:
            print(f"❌ Database connection failed: {e}")
            print("Please check your database configuration")
            return
        
        print("\n🎉 All tests passed! Starting server...")
        print("🌐 Server will be available at: http://localhost:5000")
        print("📱 API endpoints will be at: http://localhost:5000/api/")
        print("\nPress Ctrl+C to stop the server")
        
        # Start the server
        app.run(host='0.0.0.0', port=5000, debug=True)
        
    except KeyboardInterrupt:
        print("\n👋 Server stopped by user")
    except Exception as e:
        print(f"\n❌ Unexpected error: {e}")
        print("\n🔧 Error details:")
        traceback.print_exc()

if __name__ == '__main__':
    main() 