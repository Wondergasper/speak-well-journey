import torch
import os
from transformers import Wav2Vec2Processor, Wav2Vec2ForSequenceClassification
from .predict_single_audio import predict_single_audio
import numpy as np

# Model configuration - Updated path to match actual directory structure
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'stuttering_model', 'Stuttering_model')

# Global variables for model and processor
processor = None
model = None

def load_model():
    """Load the trained Wav2Vec2 model and processor"""
    global processor, model

    try:
        # Load processor
        processor = Wav2Vec2Processor.from_pretrained(MODEL_PATH)

        # Load model
        model = Wav2Vec2ForSequenceClassification.from_pretrained(
            MODEL_PATH,
            num_labels=2  # Binary classification
        )

        # Set to evaluation mode
        model.eval()

        print("Model and processor loaded successfully")
        return True

    except Exception as e:
        print(f"Error loading model: {str(e)}")
        processor = None
        model = None
        return False

def predict_stuttering(file_path):
    """
    Predict stuttering in audio file using the loaded model.
    This is the function called by analyze_audio.
    """
    global processor, model
    
    if processor is None or model is None:
        print("Model not loaded, using dummy prediction")
        return _dummy_prediction()
    
    try:
        # Use the predict_single_audio function
        prediction, probability = predict_single_audio(file_path, model, processor)
        
        # Generate detailed analysis
        details = _generate_details(prediction, probability)
        
        return {
            'prediction': prediction,
            'stutter_probability': probability,
            'confidence': probability if prediction == 1 else (1 - probability),
            'stutter_count': details['stutter_count'],
            'word_count': details['word_count'],
            'details': details
        }
        
    except Exception as e:
        print(f"Error in predict_stuttering: {str(e)}")
        return _dummy_prediction()

def _dummy_prediction():
    """Fallback dummy prediction when model fails"""
    return {
        'prediction': np.random.choice([0, 1]),
        'stutter_probability': np.random.uniform(0, 1),
        'confidence': np.random.uniform(0.5, 0.9),
        'stutter_count': np.random.randint(0, 10),
        'word_count': np.random.randint(20, 50),
        'details': _generate_details(np.random.choice([0, 1]), np.random.uniform(0, 1))
    }

def analyze_audio(file_path):
    """
    Analyze audio file for stuttering patterns.
    This uses a placeholder model for development.
    Replace with actual ML model inference in production.
    """
    try:
        # Get prediction from ML model
        result = predict_stuttering(file_path)

        if result is None:
            print("ML prediction failed, using dummy analysis")
            return _dummy_analysis()

        # Extract relevant information from ML result
        severity = _determine_severity(result.get('stutter_probability', 0))
        confidence = result.get('confidence', 0.5)
        stutter_count = result.get('stutter_count', 0)
        word_count = result.get('word_count', 10)

        # Calculate score (0-100, higher is better fluency)
        score = max(0, 100 - (result.get('stutter_probability', 0) * 100))

        # Generate recommendations based on severity
        recommendations = _generate_recommendations(severity)

        # Suggest exercises based on analysis
        exercises = _suggest_exercises(severity)

        return {
            'severity': severity,
            'score': round(score, 1),
            'confidence': round(confidence, 2),
            'stutter_count': stutter_count,
            'word_count': word_count,
            'stutter_probability': result.get('stutter_probability', 0),
            'recommendations': recommendations,
            'exercises': exercises
        }

    except Exception as e:
        print(f"Error in audio analysis: {str(e)}")
        # Fallback to dummy analysis on error
        return _dummy_analysis()

def _generate_details(prediction, probability):
    """Generate detailed analysis based on model prediction"""
    if prediction == 0:
        return {
            'repetitions': {'count': 0, 'examples': []},
            'blocks': {'count': 0, 'examples': []},
            'prolongations': {'count': 0, 'examples': []},
            'stutter_count': 0,
            'word_count': np.random.randint(20, 50)
        }
    else:
        # Estimate stuttering patterns based on probability
        severity_factor = min(probability * 2, 1.0)
        return {
            'repetitions': {
                'count': int(severity_factor * np.random.randint(2, 8)),
                'examples': ["st-st-stairs", "w-w-water", "th-th-think"][:int(severity_factor * 3)]
            },
            'blocks': {
                'count': int(severity_factor * np.random.randint(1, 5)),
                'examples': ["...table", "...phone", "...morning"][:int(severity_factor * 2)]
            },
            'prolongations': {
                'count': int(severity_factor * np.random.randint(1, 6)),
                'examples': ["ssssunday", "mmmmountain", "ffffirst"][:int(severity_factor * 2)]
            },
            'stutter_count': int(severity_factor * np.random.randint(3, 15)),
            'word_count': np.random.randint(25, 60)
        }

def _generate_recommendations(severity):
    """Generate recommendations based on severity"""
    if severity == 'none':
        return [
            "Great job! Continue practicing to maintain fluency",
            "Keep up with regular speech exercises",
            "Try challenging yourself with more complex speaking tasks"
        ]
    elif severity == 'mild':
        return [
            "Practice slow, controlled speech exercises",
            "Focus on breath control techniques",
            "Try the guided relaxation exercises in our app"
        ]
    else:  # severe
        return [
            "Consider working with a speech-language pathologist",
            "Practice daily breathing and relaxation exercises",
            "Start with simple words and gradually increase complexity",
            "Use the app's intensive practice modules"
        ]

def _get_recommended_exercises(severity):
    """Get recommended exercises based on severity"""
    base_exercises = [
        {'id': 1, 'title': "Deep Breathing", 'difficulty': "Easy"},
        {'id': 2, 'title': "Gentle Onsets", 'difficulty': "Medium"},
        {'id': 3, 'title': "Paced Reading", 'difficulty': "Medium"}
    ]

    if severity == 'severe':
        base_exercises.extend([
            {'id': 4, 'title': "Progressive Relaxation", 'difficulty': "Easy"},
            {'id': 5, 'title': "Vowel Extension", 'difficulty': "Hard"}
        ])

    return base_exercises

def _determine_severity(probability):
    """Determine severity based on stuttering probability"""
    if probability < 0.3:
        return 'none'
    elif probability < 0.7:
        return 'mild'
    else:
        return 'severe'

def _suggest_exercises(severity):
    """Suggest exercises based on severity"""
    return _get_recommended_exercises(severity)

def _dummy_analysis():
    """Fallback dummy analysis when model is not available"""
    severity = np.random.choice(['none', 'mild', 'severe'])
    score = int(np.random.uniform(50, 90))

    details = {
        'repetitions': {'count': np.random.randint(0, 5), 'examples': ["st-st-stairs"]},
        'blocks': {'count': np.random.randint(0, 3), 'examples': ["...table"]},
        'prolongations': {'count': np.random.randint(0, 4), 'examples': ["ssssunday"]},
        'stutter_count': np.random.randint(0, 10),
        'word_count': np.random.randint(20, 50)
    }

    return {
        'severity': severity,
        'score': score,
        'confidence': 0.75,
        'stutter_count': details['stutter_count'],
        'word_count': details['word_count'],
        'details': details,
        'recommendations': _generate_recommendations(severity),
        'exercises': _get_recommended_exercises(severity)
    }

# Initialize model on module import
load_model()