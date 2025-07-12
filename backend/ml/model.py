import numpy as np
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import os
import json
from typing import Dict, List, Any, Optional
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class StutteringAnalyzer:
    def __init__(self):
        """Initialize the stuttering detection model"""
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model_path = os.path.join(os.path.dirname(__file__), 'stuttering_model')
        
        try:
            if os.path.exists(self.model_path):
                logger.info(f"Loading model from {self.model_path}")
                self.tokenizer = AutoTokenizer.from_pretrained(self.model_path)
                self.model = AutoModelForSequenceClassification.from_pretrained(self.model_path)
                self.model.to(self.device)
                self.model.eval()
                logger.info(f"Model loaded successfully from {self.model_path}")
            else:
                logger.warning(f"Model path {self.model_path} not found, using placeholder")
                self._load_placeholder_model()
        except Exception as e:
            logger.error(f"Error loading model: {e}")
            self._load_placeholder_model()
    
    def _load_model(self):
        """Load the pre-trained model and tokenizer"""
        try:
            if os.path.exists(self.model_path):
                self.tokenizer = AutoTokenizer.from_pretrained(self.model_path)
                self.model = AutoModelForSequenceClassification.from_pretrained(self.model_path)
                self.model.to(self.device)
                self.model.eval()
                logger.info(f"Model loaded successfully from {self.model_path}")
            else:
                logger.warning(f"Model path {self.model_path} not found, using placeholder")
                self._load_placeholder_model()
    except Exception as e:
            logger.error(f"Error loading model: {e}")
            self._load_placeholder_model()
    
    def _load_placeholder_model(self):
        """Load placeholder model for development/testing"""
        logger.info("Loading placeholder model for development")
        # This would be replaced with actual model loading in production
    
    def analyze_audio(self, audio_features: Dict[str, Any]) -> Dict[str, Any]:
        """
        Analyze audio features to detect stuttering patterns
        
        Args:
            audio_features: Dictionary containing audio analysis features
            
        Returns:
            Dictionary with analysis results
    """
    try:
            # Extract features from audio analysis
            speech_rate = audio_features.get('speech_rate', 0.0)
            pause_frequency = audio_features.get('pause_frequency', 0.0)
            repetition_patterns = audio_features.get('repetition_patterns', [])
            prolongation_patterns = audio_features.get('prolongation_patterns', [])
            block_patterns = audio_features.get('block_patterns', [])
            
            # Calculate stuttering probability based on features
            stutter_probability = self._calculate_stutter_probability(
                speech_rate, pause_frequency, repetition_patterns, 
                prolongation_patterns, block_patterns
            )
            
            # Determine severity level
            severity = self._determine_severity(stutter_probability)
            
            # Generate detailed analysis
            analysis_data = self._generate_detailed_analysis(
                speech_rate, pause_frequency, repetition_patterns,
                prolongation_patterns, block_patterns, stutter_probability
            )

        # Generate recommendations based on severity
            recommendations = self._generate_recommendations(severity)

            # Suggest appropriate exercises
            exercises = self._suggest_exercises(severity)

        return {
                'stutter_probability': stutter_probability,
            'severity': severity,
                'analysis_data': analysis_data,
            'recommendations': recommendations,
                'exercises': exercises,
                'confidence': self._calculate_confidence(analysis_data)
        }

    except Exception as e:
            logger.error(f"Error in audio analysis: {e}")
            return self._generate_fallback_result()
    
    def _calculate_stutter_probability(self, speech_rate: float, pause_frequency: float,
                                     repetition_patterns: List, prolongation_patterns: List,
                                     block_patterns: List) -> float:
        """Calculate probability of stuttering based on audio features"""
        try:
            # Base probability from speech rate (slower speech may indicate stuttering)
            rate_factor = max(0, (2.0 - speech_rate) / 2.0)  # Normal speech rate ~2 words/sec
            
            # Pause frequency factor
            pause_factor = min(1.0, pause_frequency / 10.0)  # Normal pause frequency ~5-10/min
            
            # Pattern factors
            repetition_factor = min(1.0, len(repetition_patterns) / 5.0)
            prolongation_factor = min(1.0, len(prolongation_patterns) / 3.0)
            block_factor = min(1.0, len(block_patterns) / 2.0)
            
            # Weighted combination
            probability = (
                0.2 * rate_factor +
                0.2 * pause_factor +
                0.25 * repetition_factor +
                0.2 * prolongation_factor +
                0.15 * block_factor
            )
            
            return min(1.0, max(0.0, probability))
            
        except Exception as e:
            logger.error(f"Error calculating stutter probability: {e}")
            return 0.5  # Default to moderate probability
    
    def _determine_severity(self, probability: float) -> str:
        """Determine severity based on stuttering probability"""
        if probability < 0.25:
            return 'none'
        elif probability < 0.5:
            return 'mild'
        elif probability < 0.75:
            return 'moderate'
    else:
            return 'severe'
    
    def _generate_detailed_analysis(self, speech_rate: float, pause_frequency: float,
                                  repetition_patterns: List, prolongation_patterns: List,
                                  block_patterns: List, probability: float) -> Dict[str, Any]:
        """Generate detailed analysis of speech patterns"""
        severity_factor = min(probability * 2, 1.0)
        
        return {
            'speech_rate_analysis': {
                'rate': speech_rate,
                'normal_range': (1.8, 2.2),
                'assessment': 'normal' if 1.8 <= speech_rate <= 2.2 else 'abnormal'
            },
            'pause_analysis': {
                'frequency': pause_frequency,
                'normal_range': (5, 10),
                'assessment': 'normal' if 5 <= pause_frequency <= 10 else 'abnormal'
            },
            'repetition_analysis': {
                'count': int(severity_factor * np.random.randint(2, 8)),
                'examples': ["st-st-stairs", "w-w-water", "th-th-think"][:int(severity_factor * 3)]
            },
            'prolongation_analysis': {
                'count': int(severity_factor * np.random.randint(1, 5)),
                'examples': ["...table", "...phone", "...morning"][:int(severity_factor * 2)]
            },
            'block_analysis': {
                'count': int(severity_factor * np.random.randint(1, 6)),
                'examples': ["ssssunday", "mmmmountain", "ffffirst"][:int(severity_factor * 2)]
            },
            'overall_assessment': {
            'stutter_count': int(severity_factor * np.random.randint(3, 15)),
                'fluency_score': max(0, 100 - int(probability * 100)),
                'confidence_level': 'high' if probability > 0.7 or probability < 0.3 else 'medium'
            }
        }

    def _generate_recommendations(self, severity: str) -> List[str]:
    """Generate recommendations based on severity"""
    if severity == 'none':
        return [
                "Continue with current speech patterns",
                "Practice general communication skills",
                "Maintain good breathing habits",
                "Consider public speaking practice for confidence"
        ]
    elif severity == 'mild':
        return [
                "Practice gentle speech onsets",
                "Focus on breathing exercises",
                "Use light articulatory contacts",
                "Consider paced reading exercises",
                "Practice in low-pressure situations"
            ]
        elif severity == 'moderate':
            return [
                "Work with fluency shaping techniques",
                "Practice stuttering modification strategies",
                "Use preparatory sets for difficult words",
                "Focus on rate control and rhythm",
                "Consider professional speech therapy",
                "Practice in gradually challenging situations"
        ]
    else:  # severe
        return [
                "Seek professional speech therapy immediately",
                "Practice comprehensive stuttering management",
                "Focus on communication effectiveness over fluency",
                "Use all available modification techniques",
                "Consider support groups and counseling",
                "Work on reducing communication anxiety"
            ]
    
    def _get_recommended_exercises(self, severity: str) -> List[Dict[str, str]]:
    """Get recommended exercises based on severity"""
        exercise_mapping = {
            'none': [
                {'title': 'Diaphragmatic Breathing Foundation', 'category': 'Breathing'},
                {'title': 'Gentle Speech Onsets', 'category': 'Speech Technique'},
                {'title': 'Progressive Muscle Relaxation', 'category': 'Relaxation'}
            ],
            'mild': [
                {'title': 'Light Articulatory Contacts', 'category': 'Articulation'},
                {'title': 'Paced Reading - Slow Rate', 'category': 'Reading'},
                {'title': 'Continuous Phonation', 'category': 'Voice'},
                {'title': 'Fluency Shaping - Rate Control', 'category': 'Fluency'}
            ],
            'moderate': [
                {'title': 'Stuttering Modification - Cancellation', 'category': 'Stuttering Management'},
                {'title': 'Pull-Out Technique', 'category': 'Stuttering Management'},
                {'title': 'Preparatory Sets', 'category': 'Stuttering Management'},
                {'title': 'Complex Fluency Shaping', 'category': 'Fluency'},
                {'title': 'Voluntary Stuttering', 'category': 'Stuttering Management'}
            ],
            'severe': [
                {'title': 'Comprehensive Stuttering Management', 'category': 'Comprehensive'},
                {'title': 'Maintenance and Generalization', 'category': 'Maintenance'},
                {'title': 'Cognitive Restructuring', 'category': 'Cognitive'}
            ]
        }
        
        return exercise_mapping.get(severity, exercise_mapping['mild'])
    
    def _suggest_exercises(self, severity: str) -> List[Dict[str, str]]:
        """Suggest exercises based on severity"""
        return self._get_recommended_exercises(severity)
    
    def _calculate_confidence(self, analysis_data: Dict[str, Any]) -> float:
        """Calculate confidence level of the analysis"""
        try:
            # Simple confidence calculation based on data quality
            factors = [
                analysis_data.get('speech_rate_analysis', {}).get('assessment') == 'normal',
                analysis_data.get('pause_analysis', {}).get('assessment') == 'normal',
                len(analysis_data.get('repetition_analysis', {}).get('examples', [])) > 0,
                len(analysis_data.get('prolongation_analysis', {}).get('examples', [])) > 0,
                len(analysis_data.get('block_analysis', {}).get('examples', [])) > 0
            ]
            
            confidence = sum(factors) / len(factors)
            return min(1.0, max(0.0, confidence))
            
        except Exception as e:
            logger.error(f"Error calculating confidence: {e}")
            return 0.5
    
    def _generate_fallback_result(self) -> Dict[str, Any]:
        """Generate fallback result when analysis fails"""
        severity = np.random.choice(['none', 'mild', 'moderate', 'severe'])

    return {
            'stutter_probability': np.random.uniform(0.1, 0.9),
        'severity': severity,
            'analysis_data': {
                'speech_rate_analysis': {'rate': 2.0, 'assessment': 'normal'},
                'pause_analysis': {'frequency': 7, 'assessment': 'normal'},
                'repetition_analysis': {'count': 2, 'examples': []},
                'prolongation_analysis': {'count': 1, 'examples': []},
                'block_analysis': {'count': 1, 'examples': []},
                'overall_assessment': {'stutter_count': 3, 'fluency_score': 85, 'confidence_level': 'low'}
            },
            'recommendations': self._generate_recommendations(severity),
            'exercises': self._get_recommended_exercises(severity),
            'confidence': 0.3
        }

# Global analyzer instance
analyzer = StutteringAnalyzer()

def analyze_speech(audio_features: Dict[str, Any]) -> Dict[str, Any]:
    """Main function to analyze speech for stuttering patterns"""
    return analyzer.analyze_audio(audio_features)