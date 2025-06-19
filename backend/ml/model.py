from sklearn.dummy import DummyClassifier
import numpy as np
from .utils import extract_features

# For demo: train a dummy classifier
_dummy_clf = DummyClassifier(strategy='uniform', random_state=42)
_dummy_clf.fit(np.zeros((3, 26)), ['none', 'mild', 'severe'])

SEVERITY_LABELS = ['none', 'mild', 'severe']


def analyze_audio(audio_path):
    features = extract_features(audio_path).reshape(1, -1)
    severity = _dummy_clf.predict(features)[0]
    score = int(np.random.uniform(50, 90))
    # Mock details, but severity is now model-driven
    details = {
        'repetitions': {'count': np.random.randint(0, 10), 'examples': ["st-st-stairs", "w-w-water"]},
        'blocks': {'count': np.random.randint(0, 5), 'examples': ["...table", "...phone"]},
        'prolongations': {'count': np.random.randint(0, 8), 'examples': ["ssssunday", "mmmmountain"]},
    }
    recommendations = [
        "Practice slow, controlled speech exercises",
        "Focus on breath control techniques",
        "Try the guided relaxation exercises in our app"
    ]
    exercises = [
        { 'id': 1, 'title': "Deep Breathing", 'difficulty': "Easy" },
        { 'id': 2, 'title': "Gentle Onsets", 'difficulty': "Medium" },
        { 'id': 3, 'title': "Paced Reading", 'difficulty': "Medium" }
    ]
    return {
        'severity': severity,
        'score': score,
        'details': details,
        'recommendations': recommendations,
        'exercises': exercises
    } 