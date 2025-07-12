export interface Exercise {
  id: number;
  title: string;
  videoUrl?: string;
  description: string;
  instructions?: string;
  severity: 'none' | 'mild' | 'moderate' | 'severe';
  category: string;
  evidence_level: 'A' | 'B' | 'C';
  target_skills: string;
  prerequisites: string;
  progress_indicators: string;
  duration_minutes: number;
}

export const exercisesBySeverity: Record<string, Exercise[]> = {
  none: [
    {
      id: 1,
      title: "Diaphragmatic Breathing Foundation",
      videoUrl: "https://www.youtube.com/embed/g2wo2Impnfg?si=RWgdU0_VLr-812Xc",
      description: "Establish proper breathing patterns as the foundation for fluent speech. This evidence-based technique reduces tension and provides a stable base for speech production.",
      severity: "none",
      category: "Breathing",
      evidence_level: "A",
      target_skills: "Respiratory control, tension reduction, speech foundation",
      prerequisites: "None",
      progress_indicators: "Consistent belly breathing, reduced chest movement, increased breath capacity",
      duration_minutes: 10
    },
    {
      id: 2,
      title: "Gentle Speech Onsets",
      videoUrl: "https://www.youtube.com/embed/_Qt_o_9b9KM?si=Huwy4zgo9lLMFThw",
      description: "Practice smooth speech initiation without hard glottal attacks. This technique reduces tension at word beginnings.",
      severity: "none",
      category: "Speech Technique",
      evidence_level: "B",
      target_skills: "Smooth speech initiation, reduced tension, voice control",
      prerequisites: "Basic breathing control",
      progress_indicators: "Smoother word beginnings, reduced hard attacks, increased confidence",
      duration_minutes: 8
    },
    {
      id: 3,
      title: "Progressive Muscle Relaxation",
      videoUrl: "https://youtu.be/L0tCkDyDno0?si=n9VR_7jh8eUtlByA",
      description: "Systematic relaxation technique to reduce physical tension that can contribute to speech difficulties.",
      severity: "none",
      category: "Relaxation",
      evidence_level: "A",
      target_skills: "Tension awareness, relaxation skills, stress management",
      prerequisites: "None",
      progress_indicators: "Faster relaxation, reduced baseline tension, improved awareness",
      duration_minutes: 15
    }
  ],

  mild: [
    {
      id: 4,
      title: "Light Articulatory Contacts",
      videoUrl: "https://www.youtube.com/embed/N4ldvmiShK0?si=KhQDsqde4KiFUKlu",
      description: "Practice reducing tension in speech muscles for smoother articulation and reduced blocks.",
      severity: "mild",
      category: "Articulation",
      evidence_level: "B",
      target_skills: "Reduced articulatory tension, smoother speech, block prevention",
      prerequisites: "Basic breathing and relaxation",
      progress_indicators: "Lighter contacts, reduced blocks, smoother transitions",
      duration_minutes: 12
    },
    {
      id: 5,
      title: "Paced Reading - Slow Rate",
      videoUrl: "https://www.youtube.com/embed/rqfUp6s9x58?si=IcXZbrYHSWOeq7F8",
      description: "Controlled reading practice to establish fluent speech patterns and reduce stuttering frequency.",
      severity: "mild",
      category: "Reading",
      evidence_level: "A",
      target_skills: "Rate control, rhythm, fluency patterns",
      prerequisites: "Basic speech techniques",
      progress_indicators: "Consistent slow rate, reduced stuttering, improved rhythm",
      duration_minutes: 15
    },
    {
      id: 6,
      title: "Continuous Phonation",
      videoUrl: "https://www.youtube.com/embed/SaKDKVChiW8?si=jiD7nrlE-UU624pQ",
      description: "Practice maintaining continuous voice flow to bridge between words and reduce speech blocks.",
      severity: "mild",
      category: "Voice",
      evidence_level: "B",
      target_skills: "Voice continuity, word linking, block reduction",
      prerequisites: "Gentle onsets and light contacts",
      progress_indicators: "Longer fluent stretches, reduced blocks, smoother transitions",
      duration_minutes: 10
    },
    {
      id: 7,
      title: "Prolonged Speech",
      videoUrl: "https://www.youtube.com/embed/Zr3uIjvsp-M?si=XZS75mCXVPT5Gkte",
      description: "Stretch vowels within words to slow pace and improve fluency.",
      severity: "mild",
      category: "Speech Technique",
      evidence_level: "B",
      target_skills: "Rate control, vowel prolongation, fluency improvement",
      prerequisites: "Basic speech techniques",
      progress_indicators: "Slower speech rate, reduced stuttering, improved fluency",
      duration_minutes: 12
    },
    {
      id: 8,
      title: "Choral Speech",
      videoUrl: "",
      description: "Read aloud with another speaker, matching timing. Start with simple phrases, gradually increase difficulty.",
      severity: "mild",
      category: "Speech Technique",
      evidence_level: "B",
      target_skills: "Rhythm matching, fluency modeling, confidence building",
      prerequisites: "Basic reading skills",
      progress_indicators: "Improved rhythm, increased fluency, reduced anxiety",
      duration_minutes: 15
    },
    {
      id: 9,
      title: "Breath Curve",
      videoUrl: "",
      description: "Inhale slowly and deeply, focus on abdominal expansion. Speak while exhaling to regulate airflow and reduce stuttering.",
      severity: "mild",
      category: "Breathing",
      evidence_level: "B",
      target_skills: "Breath control, speech-breathing coordination, tension reduction",
      prerequisites: "Diaphragmatic breathing",
      progress_indicators: "Better breath control, smoother speech, reduced tension",
      duration_minutes: 10
    }
  ],

        moderate: [
    {
      id: 10,
      title: "Light Pull-Outs",
      videoUrl: "https://youtu.be/C_bizdH7MB8?si=MDN3SZudJf3VefP7",
      description: "Ease out during blocks by gently stretching through the stutter.",
      severity: "moderate",
      category: "Stuttering Management",
      evidence_level: "B",
      target_skills: "In-the-moment modification, voluntary control, confidence",
      prerequisites: "Cancellation technique",
      progress_indicators: "Successful pull-outs, reduced stutter duration, increased confidence",
      duration_minutes: 18
    },
    {
      id: 11,
      title: "Preparatory Sets",
      videoUrl: "https://youtu.be/ISzf7M9FnR4?si=adFHFTR0lLMVal26",
      description: "Mentally prepare and initiate speech with a gentle onset before a word you expect to stutter on.",
      severity: "moderate",
      category: "Stuttering Management",
      evidence_level: "B",
      target_skills: "Anticipation management, word preparation, confidence building",
      prerequisites: "Basic modification techniques",
      progress_indicators: "Reduced anticipation, successful word production, increased confidence",
      duration_minutes: 15
    },
    {
      id: 12,
      title: "Self-Cancellations",
      videoUrl: "https://youtu.be/SSp0boMgghk?si=2k_4wS2DbUrPha7N",
      description: "Finish the stuttered word, pause briefly, then repeat it fluently with less tension.",
      severity: "moderate",
      category: "Stuttering Management",
      evidence_level: "B",
      target_skills: "Stutter modification, voluntary control, reduced fear",
      prerequisites: "Basic fluency techniques",
      progress_indicators: "Successful cancellations, reduced fear, increased control",
      duration_minutes: 15
    },
    {
      id: 13,
      title: "Yawn-Sigh Initiation",
      videoUrl: "https://youtu.be/SyvOZJZddyc?si=2GMvbn_TkMBHJnyW",
      description: "Use a relaxed yawn-sigh sound to gently begin speech, promoting calm onset.",
      severity: "moderate",
      category: "Speech Technique",
      evidence_level: "B",
      target_skills: "Relaxed speech onset, tension reduction, voice control",
      prerequisites: "Basic breathing and relaxation",
      progress_indicators: "Relaxed onsets, reduced tension, improved voice quality",
      duration_minutes: 12
    },
    {
      id: 14,
      title: "Fluency Shaping Drills",
      videoUrl: "https://youtu.be/g2wo2Impnfg?si=RWgdU0_VLr-812Xc",
      description: "Practice fluent speech with light articulatory contacts and controlled breathing.",
      severity: "moderate",
      category: "Fluency",
      evidence_level: "A",
      target_skills: "Integrated fluency techniques, natural speech, generalization",
      prerequisites: "Mastery of individual techniques",
      progress_indicators: "Longer fluent periods, natural speech quality, reduced effort",
      duration_minutes: 20
    },
    {
      id: 15,
      title: "Metronome or Rhythmic Speech",
      videoUrl: "https://youtu.be/l__Gri72UUc?si=ur8tgdebNdVJRXYj",
      description: "Speak along with a metronome or rhythmic beat to maintain a steady pace and reduce disfluencies.",
      severity: "moderate",
      category: "Speech Technique",
      evidence_level: "B",
      target_skills: "Rhythm control, pace management, fluency improvement",
      prerequisites: "Basic speech techniques",
      progress_indicators: "Consistent rhythm, reduced stuttering, improved pace",
      duration_minutes: 15
    },
    {
      id: 16,
      title: "Mindfulness & Meditation",
      videoUrl: "https://youtu.be/DbDoBzGY3vo?si=0JMKRhbP-wXtTb3e",
      description: "Use breathing and mindfulness techniques to lower anxiety, which helps reduce frequency of blocks.",
      severity: "moderate",
      category: "Cognitive",
      evidence_level: "B",
      target_skills: "Anxiety reduction, mindfulness, stress management",
      prerequisites: "Basic relaxation techniques",
      progress_indicators: "Reduced anxiety, improved focus, fewer blocks",
      duration_minutes: 20
    }
  ],

        severe: [
    {
      id: 17,
      title: "Continuous Phonation Phrases",
      videoUrl: "https://youtu.be/AJQ2xBns9JI?si=6yKwtI4yBACYpATh",
      description: "Practice saying longer phrases or passages in one continuous airflow to promote smoother speech.",
      severity: "severe",
      category: "Voice",
      evidence_level: "B",
      target_skills: "Extended fluency, voice continuity, phrase management",
      prerequisites: "Basic phonation techniques",
      progress_indicators: "Longer fluent phrases, improved voice flow, reduced blocks",
      duration_minutes: 15
    },
    {
      id: 18,
      title: "Delayed Auditory Feedback (DAF)",
      videoUrl: "https://youtu.be/d1_onnibnlc?si=CXUiMOaawWGxXyrP",
      description: "Use DAF apps or devices to slow down speech and improve fluency by hearing your voice with a slight delay.",
      severity: "severe",
      category: "Technology",
      evidence_level: "B",
      target_skills: "Rate control, auditory feedback, fluency improvement",
      prerequisites: "Basic speech techniques",
      progress_indicators: "Slower speech rate, improved fluency, reduced stuttering",
      duration_minutes: 20
    },
    {
      id: 19,
      title: "Speech Shadowing",
      videoUrl: "",
      description: "Listen to a fluent speaker and immediately mimic their words in real time to build timing and rhythm.",
      severity: "severe",
      category: "Speech Technique",
      evidence_level: "B",
      target_skills: "Timing, rhythm, fluency modeling",
      prerequisites: "Basic listening and speaking skills",
      progress_indicators: "Improved timing, better rhythm, increased fluency",
      duration_minutes: 15
    },
    {
      id: 20,
      title: "Breathing with 'Ssss' Exhale",
      videoUrl: "",
      description: "Take a breath and exhale slowly while saying 'ssss' to regulate airflow before starting speech.",
      severity: "severe",
      category: "Breathing",
      evidence_level: "B",
      target_skills: "Airflow control, breath regulation, tension reduction",
      prerequisites: "Basic breathing techniques",
      progress_indicators: "Better airflow control, reduced tension, improved speech onset",
      duration_minutes: 10
    },
    {
      id: 21,
      title: "Aerobic Exercise + Speaking",
      videoUrl: "https://youtu.be/BIJ9uWc5Nu0?si=ZFcMfYMAX9WWAK9I",
      description: "Combine light aerobic movement with speaking practice to reduce physical tension and enhance fluency.",
      severity: "severe",
      category: "Physical",
      evidence_level: "B",
      target_skills: "Tension reduction, movement integration, fluency improvement",
      prerequisites: "Basic exercise ability",
      progress_indicators: "Reduced tension, improved fluency, better coordination",
      duration_minutes: 25
    },
    {
      id: 22,
      title: "Comprehensive Stuttering Management",
      videoUrl: "",
      description: "Integrated approach combining all techniques for severe stuttering management.",
      severity: "severe",
      category: "Comprehensive",
      evidence_level: "A",
      target_skills: "Integrated management, long-term success, life participation",
      prerequisites: "All previous techniques",
      progress_indicators: "Improved communication, reduced impact, increased participation",
      duration_minutes: 30
    },
    {
      id: 23,
      title: "Maintenance and Generalization",
      videoUrl: "",
      description: "Focus on maintaining progress and applying techniques across all life situations.",
      severity: "severe",
      category: "Maintenance",
      evidence_level: "A",
      target_skills: "Long-term maintenance, generalization, life participation",
      prerequisites: "Significant therapy progress",
      progress_indicators: "Consistent application, successful generalization, maintained progress",
      duration_minutes: 25
    }
  ]
};

// Helper function to get exercises by severity
export const getExercisesBySeverity = (severity: string): Exercise[] => {
  return exercisesBySeverity[severity] || [];
};

// Helper function to get all exercises
export const getAllExercises = (): Exercise[] => {
  return Object.values(exercisesBySeverity).flat();
};

// Helper function to get exercises by category
export const getExercisesByCategory = (category: string): Exercise[] => {
  return getAllExercises().filter(exercise => exercise.category === category);
};
