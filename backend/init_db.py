from app import app, db
from models import User, Exercise, Progress, AnalysisResult
from werkzeug.security import generate_password_hash
import sqlite3

def init_database():
    with app.app_context():
        # Create all tables
        db.create_all()

        # Add evidence-based exercises if they don't exist
        if Exercise.query.count() == 0:
            # Create comprehensive evidence-based exercise data
            exercises = [
                # BEGINNER LEVEL - NONE/MILD SEVERITY
                Exercise(
                    title="Diaphragmatic Breathing Foundation",
                    severity="none",
                    description="Establish proper breathing patterns as the foundation for fluent speech. This evidence-based technique reduces tension and provides a stable base for speech production.",
                    instructions="1. Lie on your back with knees bent\n2. Place one hand on chest, one on belly\n3. Breathe in through nose - belly should rise\n4. Breathe out through mouth - belly should fall\n5. Practice 5-10 minutes daily\n6. Gradually incorporate into sitting/standing",
                    duration_minutes=10,
                    category="Breathing",
                    evidence_level="A",
                    target_skills="Respiratory control, tension reduction, speech foundation",
                    prerequisites="None",
                    progress_indicators="Consistent belly breathing, reduced chest movement, increased breath capacity"
                ),
                Exercise(
                    title="Gentle Speech Onsets",
                    severity="none",
                    description="Practice smooth speech initiation without hard glottal attacks. This technique reduces tension at word beginnings.",
                    instructions="1. Start with vowel sounds: 'ah', 'ee', 'oh'\n2. Use gentle, breathy voice onset\n3. Practice with simple words: 'apple', 'ocean'\n4. Focus on smooth transitions\n5. Gradually increase complexity",
                    duration_minutes=8,
                    category="Speech Technique",
                    evidence_level="B",
                    target_skills="Smooth speech initiation, reduced tension, voice control",
                    prerequisites="Basic breathing control",
                    progress_indicators="Smoother word beginnings, reduced hard attacks, increased confidence"
                ),
                Exercise(
                    title="Progressive Muscle Relaxation",
                    severity="none",
                    description="Systematic relaxation technique to reduce physical tension that can contribute to speech difficulties.",
                    instructions="1. Tense each muscle group for 5 seconds\n2. Release and relax for 10 seconds\n3. Progress from feet to head\n4. Focus on the contrast between tense and relaxed\n5. Practice daily for 15 minutes",
                    duration_minutes=15,
                    category="Relaxation",
                    evidence_level="A",
                    target_skills="Tension awareness, relaxation skills, stress management",
                    prerequisites="None",
                    progress_indicators="Faster relaxation, reduced baseline tension, improved awareness"
                ),
                
                # BEGINNER LEVEL - MILD SEVERITY
                Exercise(
                    title="Light Articulatory Contacts",
                    severity="mild",
                    description="Practice reducing tension in speech muscles for smoother articulation and reduced blocks.",
                    instructions="1. Practice consonants with minimal tension: 'p', 'b', 't', 'd'\n2. Use light touch - imagine touching cotton\n3. Practice in syllables: 'pa-pa-pa', 'ta-ta-ta'\n4. Move to words and phrases\n5. Monitor for tension and adjust",
                    duration_minutes=12,
                    category="Articulation",
                    evidence_level="B",
                    target_skills="Reduced articulatory tension, smoother speech, block prevention",
                    prerequisites="Basic breathing and relaxation",
                    progress_indicators="Lighter contacts, reduced blocks, smoother transitions"
                ),
                Exercise(
                    title="Paced Reading - Slow Rate",
                    severity="mild",
                    description="Controlled reading practice to establish fluent speech patterns and reduce stuttering frequency.",
                    instructions="1. Choose simple reading material\n2. Read at 50% of normal speed\n3. Pause at punctuation marks\n4. Focus on smooth word transitions\n5. Gradually increase speed while maintaining control",
                    duration_minutes=15,
                    category="Reading",
                    evidence_level="A",
                    target_skills="Rate control, rhythm, fluency patterns",
                    prerequisites="Basic speech techniques",
                    progress_indicators="Consistent slow rate, reduced stuttering, improved rhythm"
                ),
                Exercise(
                    title="Continuous Phonation",
                    severity="mild",
                    description="Practice maintaining continuous voice flow to bridge between words and reduce speech blocks.",
                    instructions="1. Hum continuously while reading\n2. Practice linking words together\n3. Focus on smooth voice transitions\n4. Start with phrases, build to sentences\n5. Maintain steady airflow throughout",
                    duration_minutes=10,
                    category="Voice",
                    evidence_level="B",
                    target_skills="Voice continuity, word linking, block reduction",
                    prerequisites="Gentle onsets and light contacts",
                    progress_indicators="Longer fluent stretches, reduced blocks, smoother transitions"
                ),
                
                # INTERMEDIATE LEVEL - MILD SEVERITY
                Exercise(
                    title="Fluency Shaping - Rate Control",
                    severity="mild",
                    description="Comprehensive fluency technique combining rate control with other fluency strategies.",
                    instructions="1. Combine slow rate with gentle onsets\n2. Maintain continuous voice flow\n3. Use light articulatory contacts\n4. Practice with increasing complexity\n5. Focus on natural-sounding fluent speech",
                    duration_minutes=20,
                    category="Fluency",
                    evidence_level="A",
                    target_skills="Integrated fluency techniques, natural speech, generalization",
                    prerequisites="Mastery of individual techniques",
                    progress_indicators="Longer fluent periods, natural speech quality, reduced effort"
                ),
                Exercise(
                    title="Stuttering Modification - Cancellation",
                    severity="mild",
                    description="Learn to modify moments of stuttering using cancellation technique after a stutter occurs.",
                    instructions="1. Complete the stutter naturally\n2. Pause briefly (1-2 seconds)\n3. Repeat the word smoothly\n4. Continue with the sentence\n5. Focus on voluntary control",
                    duration_minutes=15,
                    category="Stuttering Management",
                    evidence_level="B",
                    target_skills="Stutter modification, voluntary control, reduced fear",
                    prerequisites="Basic fluency techniques",
                    progress_indicators="Successful cancellations, reduced fear, increased control"
                ),
                Exercise(
                    title="Easy Onset with Vowels",
                    severity="mild",
                    description="Advanced practice of gentle speech onsets with vowel-initiated words and phrases.",
                    instructions="1. Practice vowel-initiated words: 'apple', 'elephant', 'orange'\n2. Use gentle, breathy onset\n3. Maintain continuous voice\n4. Practice in sentences\n5. Focus on natural flow",
                    duration_minutes=12,
                    category="Speech Technique",
                    evidence_level="B",
                    target_skills="Vowel onset control, natural speech, fluency maintenance",
                    prerequisites="Basic gentle onsets",
                    progress_indicators="Smooth vowel onsets, reduced blocks, natural speech"
                ),
                
                # INTERMEDIATE LEVEL - MODERATE SEVERITY
                Exercise(
                    title="Pull-Out Technique",
                    severity="moderate",
                    description="Learn to modify stuttering moments while they are occurring using pull-out technique.",
                    instructions="1. When stuttering begins, slow down\n2. Ease out of the stutter smoothly\n3. Complete the word with control\n4. Continue with the sentence\n5. Practice with increasing difficulty",
                    duration_minutes=18,
                    category="Stuttering Management",
                    evidence_level="B",
                    target_skills="In-the-moment modification, voluntary control, confidence",
                    prerequisites="Cancellation technique",
                    progress_indicators="Successful pull-outs, reduced stutter duration, increased confidence"
                ),
                Exercise(
                    title="Preparatory Sets",
                    severity="moderate",
                    description="Practice anticipating and preparing for difficult words before speaking them.",
                    instructions="1. Identify anticipated difficult words\n2. Prepare the word mentally\n3. Use fluency techniques before speaking\n4. Practice with feared words\n5. Gradually reduce preparation time",
                    duration_minutes=15,
                    category="Stuttering Management",
                    evidence_level="B",
                    target_skills="Anticipation management, word preparation, confidence building",
                    prerequisites="Basic modification techniques",
                    progress_indicators="Reduced anticipation, successful word production, increased confidence"
                ),
                Exercise(
                    title="Complex Fluency Shaping",
                    severity="moderate",
                    description="Advanced fluency shaping with complex speech tasks and real-world applications.",
                    instructions="1. Combine all fluency techniques\n2. Practice with complex sentences\n3. Use in conversation scenarios\n4. Focus on natural speech quality\n5. Apply to feared situations",
                    duration_minutes=25,
                    category="Fluency",
                    evidence_level="A",
                    target_skills="Integrated techniques, real-world application, natural speech",
                    prerequisites="Basic fluency shaping",
                    progress_indicators="Natural speech quality, reduced effort, successful generalization"
                ),
                
                # ADVANCED LEVEL - MODERATE SEVERITY
                Exercise(
                    title="Voluntary Stuttering",
                    severity="moderate",
                    description="Practice voluntary stuttering to reduce fear and gain control over stuttering moments.",
                    instructions="1. Choose a safe environment\n2. Intentionally stutter on easy words\n3. Use modification techniques\n4. Gradually increase difficulty\n5. Practice in various situations",
                    duration_minutes=20,
                    category="Stuttering Management",
                    evidence_level="B",
                    target_skills="Fear reduction, voluntary control, desensitization",
                    prerequisites="Modification techniques",
                    progress_indicators="Reduced fear, increased control, successful desensitization"
                ),
                Exercise(
                    title="Cognitive Restructuring",
                    severity="moderate",
                    description="Address negative thoughts and beliefs about stuttering to improve overall communication confidence.",
                    instructions="1. Identify negative thoughts about stuttering\n2. Challenge irrational beliefs\n3. Develop positive self-talk\n4. Practice in challenging situations\n5. Build communication confidence",
                    duration_minutes=30,
                    category="Cognitive",
                    evidence_level="B",
                    target_skills="Cognitive change, confidence building, communication skills",
                    prerequisites="Basic therapy progress",
                    progress_indicators="Reduced negative thoughts, increased confidence, improved communication"
                ),
                
                # ADVANCED LEVEL - SEVERE SEVERITY
                Exercise(
                    title="Comprehensive Stuttering Management",
                    severity="severe",
                    description="Integrated approach combining all techniques for severe stuttering management.",
                    instructions="1. Assess current stuttering patterns\n2. Apply appropriate techniques\n3. Practice in challenging situations\n4. Monitor progress and adjust\n5. Build long-term management skills",
                    duration_minutes=30,
                    category="Comprehensive",
                    evidence_level="A",
                    target_skills="Integrated management, long-term success, life participation",
                    prerequisites="All previous techniques",
                    progress_indicators="Improved communication, reduced impact, increased participation"
                ),
                Exercise(
                    title="Maintenance and Generalization",
                    severity="severe",
                    description="Focus on maintaining progress and applying techniques across all life situations.",
                    instructions="1. Review and practice all techniques\n2. Apply to new situations\n3. Monitor for regression\n4. Adjust strategies as needed\n5. Build long-term habits",
                    duration_minutes=25,
                    category="Maintenance",
                    evidence_level="A",
                    target_skills="Long-term maintenance, generalization, life participation",
                    prerequisites="Significant therapy progress",
                    progress_indicators="Consistent application, successful generalization, maintained progress"
                )
            ]

            for exercise in exercises:
                db.session.add(exercise)

            db.session.commit()
            print("Evidence-based exercises added successfully!")

        # Migration: Add preferences column if not exists
        conn = sqlite3.connect('instance/speech_therapy.db')
        c = conn.cursor()
        try:
            c.execute("ALTER TABLE user ADD COLUMN preferences JSON")
        except Exception as e:
            print("[Migration] Preferences column may already exist or not supported:", e)
        conn.commit()
        conn.close()

        print("Database initialized successfully!")

if __name__ == '__main__':
    init_database()