#!/usr/bin/env python3
"""
Test script to verify the profile endpoint is working
"""

import requests
import json

def test_profile_endpoint():
    """Test the profile endpoint"""
    
    base_url = "http://localhost:5000"
    
    print("🧪 Testing profile endpoint...")
    
    # Test 1: Check if server is running
    try:
        response = requests.get(f"{base_url}/", timeout=5)
        print(f"✅ Server is running (status: {response.status_code})")
    except requests.exceptions.RequestException as e:
        print(f"❌ Server is not running: {e}")
        return False
    
    # Test 2: Test profile endpoint without auth (should return 401)
    try:
        response = requests.get(f"{base_url}/api/profile", timeout=5)
        print(f"✅ Profile endpoint accessible (status: {response.status_code})")
        if response.status_code == 401:
            print("✅ Correctly requires authentication")
        else:
            print(f"⚠️  Unexpected status: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"❌ Profile endpoint failed: {e}")
        return False
    
    # Test 3: Test OPTIONS request (CORS preflight)
    try:
        response = requests.options(f"{base_url}/api/profile", timeout=5)
        print(f"✅ OPTIONS request successful (status: {response.status_code})")
        print(f"   CORS headers: {dict(response.headers)}")
    except requests.exceptions.RequestException as e:
        print(f"❌ OPTIONS request failed: {e}")
        return False
    
    # Test 4: Test with trailing slash
    try:
        response = requests.get(f"{base_url}/api/profile/", timeout=5)
        print(f"✅ Profile endpoint with trailing slash (status: {response.status_code})")
    except requests.exceptions.RequestException as e:
        print(f"❌ Profile endpoint with trailing slash failed: {e}")
        return False
    
    print("\n🎉 All tests completed!")
    return True

if __name__ == '__main__':
    test_profile_endpoint() 