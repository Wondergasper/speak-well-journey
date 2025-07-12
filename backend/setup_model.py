#!/usr/bin/env python3
"""
Setup script for adding trained Wav2Vec2 model files to the backend
"""

import os
import shutil
import sys

def setup_model():
    """Setup the trained model files in the correct location"""
    
    print("🔧 Setting up Wav2Vec2 model for stuttering detection...")
    
    # Define the target directory
    target_dir = os.path.join(os.path.dirname(__file__), 'ml', 'stuttering_model')
    
    # Create target directory if it doesn't exist
    os.makedirs(target_dir, exist_ok=True)
    
    print(f"\n📁 Target directory: {target_dir}")
    
    # List of required files
    required_files = [
        'pytorch_model.bin',
        'preprocessor_config.json',
        'tokenizer_config.json',
        'special_tokens_map.json',
        'vocab.json'
    ]
    
    print("\n📋 Required model files:")
    for file in required_files:
        file_path = os.path.join(target_dir, file)
        if os.path.exists(file_path):
            print(f"  ✅ {file}")
        else:
            print(f"  ❌ {file} (missing)")
    
    print("\n📝 Instructions:")
    print("1. Copy your trained model files to the target directory above")
    print("2. Ensure all required files are present")
    print("3. Run the backend to test the integration")
    
    print("\n🚀 Next steps:")
    print("1. Place your model files in the target directory")
    print("2. Run: python app.py")
    print("3. Test the API endpoints")
    
    # Check if any files exist
    existing_files = [f for f in required_files if os.path.exists(os.path.join(target_dir, f))]
    
    if existing_files:
        print(f"\n✅ Found {len(existing_files)} model files")
        print("You can now start the backend server!")
    else:
        print("\n⚠️  No model files found")
        print("Please add your trained model files to continue")
    
    return target_dir

def check_model_status():
    """Check the current status of model files"""
    
    target_dir = os.path.join(os.path.dirname(__file__), 'ml', 'stuttering_model')
    
    print("🔍 Checking model status...")
    
    required_files = [
        'pytorch_model.bin',
        'preprocessor_config.json',
        'tokenizer_config.json',
        'special_tokens_map.json',
        'vocab.json'
    ]
    
    missing_files = []
    existing_files = []
    
    for file in required_files:
        file_path = os.path.join(target_dir, file)
        if os.path.exists(file_path):
            existing_files.append(file)
        else:
            missing_files.append(file)
    
    print(f"\n📊 Status:")
    print(f"  ✅ Found: {len(existing_files)} files")
    print(f"  ❌ Missing: {len(missing_files)} files")
    
    if existing_files:
        print(f"\n✅ Existing files:")
        for file in existing_files:
            print(f"  - {file}")
    
    if missing_files:
        print(f"\n❌ Missing files:")
        for file in missing_files:
            print(f"  - {file}")
    
    if len(existing_files) == len(required_files):
        print("\n🎉 All model files are present! Your model is ready to use.")
        return True
    elif len(existing_files) > 0:
        print("\n⚠️  Some model files are missing. The system will use fallback analysis.")
        return False
    else:
        print("\n❌ No model files found. The system will use placeholder analysis.")
        return False

if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == 'check':
        check_model_status()
    else:
        setup_model() 