from app import app, db
from sqlalchemy import text

def migrate_remove_difficulty():
    with app.app_context():
        try:
            # Check if difficulty column exists
            result = db.session.execute(text("""
                SELECT name FROM pragma_table_info('exercise') 
                WHERE name = 'difficulty'
            """))
            
            if result.fetchone():
                print("Removing difficulty column from exercise table...")
                
                # Remove the difficulty column
                db.session.execute(text("""
                    ALTER TABLE exercise DROP COLUMN difficulty
                """))
                
                db.session.commit()
                print("Successfully removed difficulty column from exercise table!")
            else:
                print("Difficulty column does not exist in exercise table.")
                
        except Exception as e:
            print(f"Error during migration: {e}")
            db.session.rollback()

if __name__ == '__main__':
    migrate_remove_difficulty() 