#!/usr/bin/env python3
"""
Database update script for removing difficulty field and reinitializing exercises
"""

import os
import sys

def main():
    print("🔄 Updating database structure...")
    
    # Step 1: Run migration to remove difficulty column
    print("\n1️⃣ Running migration to remove difficulty column...")
    try:
        from migrate_remove_difficulty import migrate_remove_difficulty
        migrate_remove_difficulty()
        print("✅ Migration completed successfully!")
    except Exception as e:
        print(f"❌ Migration failed: {e}")
        return
    
    # Step 2: Reinitialize database with new exercise structure
    print("\n2️⃣ Reinitializing database with new exercise structure...")
    try:
        from init_db import init_database
        init_database()
        print("✅ Database reinitialized successfully!")
    except Exception as e:
        print(f"❌ Database reinitialization failed: {e}")
        return
    
    print("\n🎉 Database update completed successfully!")
    print("\n📋 Summary of changes:")
    print("   • Removed 'difficulty' field from Exercise model")
    print("   • Updated exercises to use severity-based organization only")
    print("   • Added evidence-based exercise data with proper categorization")
    print("   • Updated API routes to remove difficulty filtering")
    print("\n🚀 Your backend is now ready with the new exercise system!")

if __name__ == '__main__':
    main() 