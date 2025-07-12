#!/usr/bin/env python3
"""
Test script to verify the auth endpoint is working with CORS
"""

import requests
import json

def test_auth_endpoint():
    """Test the auth endpoint"""
    
    base_url = "http://localhost:5000"
    
    print("🧪 Testing auth endpoint...")
    
    # Test 1: Check if server is running
    try:
        response = requests.get(f"{base_url}/", timeout=5)
        print(f"✅ Server is running (status: {response.status_code})")
    except requests.exceptions.RequestException as e:
        print(f"❌ Server is not running: {e}")
        return False
    
    # Test 2: Test OPTIONS request for login (CORS preflight)
    try:
        response = requests.options(f"{base_url}/api/auth/login", timeout=5)
        print(f"✅ OPTIONS request successful (status: {response.status_code})")
        print(f"   CORS headers: {dict(response.headers)}")
    except requests.exceptions.RequestException as e:
        print(f"❌ OPTIONS request failed: {e}")
        return False
    
    # Test 3: Test login with invalid credentials (should return 401)
    try:
        login_data = {
            "email": "nonexistent@example.com",
            "password": "wrongpassword"
        }
        response = requests.post(
            f"{base_url}/api/auth/login", 
            json=login_data,
            headers={"Content-Type": "application/json"},
            timeout=5
        )
        print(f"✅ Login endpoint accessible (status: {response.status_code})")
        if response.status_code == 401:
            print("✅ Correctly rejects invalid credentials")
        else:
            print(f"⚠️  Unexpected status: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"❌ Login endpoint failed: {e}")
        return False
    
    # Test 4: Test login with valid credentials (if test user exists)
    try:
        login_data = {
            "email": "test@example.com",
            "password": "password123"
        }
        response = requests.post(
            f"{base_url}/api/auth/login", 
            json=login_data,
            headers={"Content-Type": "application/json"},
            timeout=5
        )
        print(f"✅ Login with test user (status: {response.status_code})")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Login successful! Token: {data.get('token', 'N/A')[:20]}...")
        else:
            print(f"⚠️  Login failed: {response.text}")
    except requests.exceptions.RequestException as e:
        print(f"❌ Login with test user failed: {e}")
        return False
    
    print("\n🎉 All auth tests completed!")
    return True

if __name__ == '__main__':
    test_auth_endpoint() 