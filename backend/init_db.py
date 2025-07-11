from app import app, db
from models import User, Exercise, Progress, AnalysisResult
from werkzeug.security import generate_password_hash

def init_database():
    with app.app_context():
        # Create all tables
        db.create_all()

        # Add sample exercises if they don't exist
        if Exercise.query.count() == 0:
            # Create comprehensive exercise data
            exercises = [
                Exercise(
                    title="Deep Breathing Exercise",
                    difficulty="Easy",
                    description="Learn diaphragmatic breathing to reduce tension and improve speech fluency. Practice slow, controlled breathing to establish a calm foundation for speech.",
                    instructions="1. Sit comfortably with your back straight\n2. Place one hand on your chest, one on your belly\n3. Breathe in slowly through your nose for 4 counts\n4. Hold for 2 counts\n5. Exhale through your mouth for 6 counts\n6. Repeat 10 times",
                    duration_minutes=5,
                    category="Breathing"
                ),
                Exercise(
                    title="Gentle Speech Onsets",
                    difficulty="Easy",
                    description="Practice starting words smoothly without hard attacks. Focus on gentle, flowing speech initiation.",
                    instructions="1. Take a breath\n2. Start each word with a gentle, breathy sound\n3. Practice with vowel sounds: 'ah', 'ee', 'oh'\n4. Move to simple words: 'apple', 'ocean', 'under'\n5. Gradually increase to sentences",
                    duration_minutes=10,
                    category="Speech Technique"
                ),
                Exercise(
                    title="Paced Reading",
                    difficulty="Medium",
                    description="Read aloud at a controlled, steady pace to improve rhythm and reduce stuttering frequency.",
                    instructions="1. Choose a comfortable reading passage\n2. Read at half your normal speed\n3. Pause at commas and periods\n4. Focus on smooth word transitions\n5. Gradually increase speed while maintaining control",
                    duration_minutes=15,
                    category="Reading"
                ),
                Exercise(
                    title="Light Articulatory Contacts",
                    difficulty="Medium",
                    description="Practice reducing tension in speech muscles for smoother articulation.",
                    instructions="1. Practice consonants with light touch: 'p', 'b', 't', 'd'\n2. Focus on minimal muscle tension\n3. Practice in syllables: 'pa-pa-pa', 'ta-ta-ta'\n4. Move to words and phrases\n5. Monitor for tension and adjust",
                    duration_minutes=12,
                    category="Articulation"
                ),
                Exercise(
                    title="Continuous Phonation",
                    difficulty="Medium",
                    description="Practice maintaining continuous voice flow to bridge between words and reduce blocks.",
                    instructions="1. Hum continuously while reading\n2. Practice linking words together\n3. Focus on smooth voice transitions\n4. Start with phrases, build to sentences\n5. Maintain steady airflow throughout",
                    duration_minutes=10,
                    category="Voice"
                ),
                Exercise(
                    title="Stuttering Modification",
                    difficulty="Hard",
                    description="Learn to modify moments of stuttering using pull-outs and preparatory sets.",
                    instructions="1. Identify anticipated difficult words\n2. Practice preparatory sets before speaking\n3. Use pull-outs during moments of stuttering\n4. Practice cancellations after stuttering moments\n5. Focus on voluntary control",
                    duration_minutes=20,
                    category="Stuttering Management"
                ),
                Exercise(
                    title="Progressive Muscle Relaxation",
                    difficulty="Easy",
                    description="Release physical tension that can contribute to stuttering through systematic muscle relaxation.",
                    instructions="1. Tense and release each muscle group\n2. Start with feet, work up to head\n3. Hold tension for 5 seconds\n4. Release and relax for 10 seconds\n5. Notice the difference between tense and relaxed",
                    duration_minutes=15,
                    category="Relaxation"
                ),
                Exercise(
                    title="Fluency Shaping",
                    difficulty="Hard",
                    description="Practice comprehensive fluency techniques including rate control, gentle onsets, and continuous voice.",
                    instructions="1. Combine slow rate with gentle onsets\n2. Maintain continuous voice flow\n3. Use light articulatory contacts\n4. Practice with increasing complexity\n5. Focus on natural-sounding fluent speech",
                    duration_minutes=25,
                    category="Fluency"
                )
            ]

            for exercise in exercises:
                db.session.add(exercise)

            db.session.commit()
            print("Sample exercises added successfully!")

        print("Database initialized successfully!")

if __name__ == '__main__':
    init_database()