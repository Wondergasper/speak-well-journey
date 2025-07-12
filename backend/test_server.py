#!/usr/bin/env python3
"""
Simple test script to check if the Flask app can start without errors
"""

import sys
import os

# Add the backend directory to the Python path
sys.path.insert(0, os.path.dirname(__file__))

def test_app_import():
    """Test if the app can be imported without errors"""
    try:
        print("🔍 Testing app import...")
        from app import app
        print("✅ App imported successfully!")
        return True
    except Exception as e:
        print(f"❌ App import failed: {e}")
        return False

def test_blueprint_imports():
    """Test if all blueprints can be imported"""
    blueprints = [
        'routes.auth',
        'routes.exercises', 
        'routes.progress',
        'routes.analysis',
        'routes.user',
        'routes.profile',
        'routes.settings',
        'routes.community',
        'routes.analytics',
        'routes.notifications'
    ]
    
    for bp in blueprints:
        try:
            print(f"🔍 Testing {bp}...")
            __import__(bp)
            print(f"✅ {bp} imported successfully!")
        except Exception as e:
            print(f"❌ {bp} import failed: {e}")
            return False
    
    return True

def test_model_imports():
    """Test if all models can be imported"""
    try:
        print("🔍 Testing model imports...")
        from models import User, Exercise, Progress, AnalysisResult, Notification
        print("✅ All models imported successfully!")
        return True
    except Exception as e:
        print(f"❌ Model import failed: {e}")
        return False

def main():
    """Run all tests"""
    print("🚀 Testing Flask app setup...\n")
    
    tests = [
        ("Model Imports", test_model_imports),
        ("Blueprint Imports", test_blueprint_imports),
        ("App Import", test_app_import)
    ]
    
    all_passed = True
    for test_name, test_func in tests:
        print(f"\n📋 Running {test_name}...")
        if not test_func():
            all_passed = False
            print(f"❌ {test_name} failed!")
        else:
            print(f"✅ {test_name} passed!")
    
    print(f"\n{'🎉 All tests passed!' if all_passed else '❌ Some tests failed!'}")
    
    if all_passed:
        print("\n🚀 Your Flask app should start successfully!")
        print("Run: python app.py")
    else:
        print("\n🔧 Please fix the errors above before starting the server.")

if __name__ == '__main__':
    main() 