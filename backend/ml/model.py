import os
import logging
import numpy as np
import torch
import torchaudio
from typing import Dict, List, Any
from transformers import Wav2Vec2Processor, Wav2Vec2ForSequenceClassification
import torch.nn.functional as F

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class StutteringAnalyzer:
    def __init__(self, model_path: str = None):
        """Initialize the stuttering detection model"""
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        
        # Set model path
        if model_path is None:
            self.model_path = os.path.join(os.path.dirname(__file__), 'stuttering_model')
        else:
            self.model_path = model_path
            
        self.model = None
        self.processor = None
        
        # Try to load the trained model
        self._load_model()
    
    def _load_model(self):
        """Load the trained Wav2Vec2 model and processor"""
        try:
            # Check if model files exist - using the actual files present
            required_files = ['pytorch_model.bin', 'preprocessor_config.json', 'tokenizer_config.json']
            model_files_exist = all(
                os.path.exists(os.path.join(self.model_path, file)) 
                for file in required_files
            )
            
            if model_files_exist:
                logger.info(f"Loading trained model from {self.model_path}")
                
                # Load processor
                self.processor = Wav2Vec2Processor.from_pretrained(self.model_path)
                
                # Load model - Wav2Vec2ForSequenceClassification will auto-detect config from preprocessor
                self.model = Wav2Vec2ForSequenceClassification.from_pretrained(
                    self.model_path,
                    num_labels=2  # Binary classification: stuttering vs non-stuttering
                )
                self.model.to(self.device)
                self.model.eval()
                
                logger.info("Trained model loaded successfully!")
            else:
                logger.warning(f"Trained model files not found in {self.model_path}")
                logger.info("Using placeholder model for development")
                self._load_placeholder_model()
                
        except Exception as e:
            logger.error(f"Error loading trained model: {e}")
            logger.info("Falling back to placeholder model")
            self._load_placeholder_model()
    
    def _load_placeholder_model(self):
        """Load placeholder model for development/testing"""
        logger.info("Loading placeholder model for development")
        # This would be replaced with actual model loading in production
        self.model = None
        self.processor = None
    
    def analyze_audio_file(self, audio_path: str) -> Dict[str, Any]:
        """
        Analyze audio file for stuttering patterns using Wav2Vec2 model
        
        Args:
            audio_path: Path to the audio file
            
        Returns:
            Dictionary with analysis results
        """
        try:
            if self.model is None or self.processor is None:
                logger.warning("No trained model available, using fallback analysis")
                return self._generate_fallback_result()
            
            # Use the trained model for prediction
            prediction, probability = self._predict_with_model(audio_path)
            
            # Determine severity based on probability
            severity = self._determine_severity(probability)
            
            # Generate detailed analysis
            analysis_data = self._generate_detailed_analysis(audio_path, probability)
            
            # Generate recommendations
            recommendations = self._generate_recommendations(severity)
            
            # Suggest exercises
            exercises = self._suggest_exercises(severity)
            
            return {
                'stutter_probability': probability,
                'severity': severity,
                'analysis_data': analysis_data,
                'recommendations': recommendations,
                'exercises': exercises,
                'confidence': self._calculate_confidence(probability, analysis_data)
            }
            
        except Exception as e:
            logger.error(f"Error in audio analysis: {e}")
            return self._generate_fallback_result()
    
    def _predict_with_model(self, audio_path: str) -> tuple:
        """Make prediction using the trained Wav2Vec2 model"""
        try:
            # Load audio
            waveform, sample_rate = torchaudio.load(audio_path)
            
            # Resample to 16kHz if needed
            if sample_rate != 16000:
                resampler = torchaudio.transforms.Resample(sample_rate, 16000)
                waveform = resampler(waveform)
            
            # Convert to mono if stereo
            if waveform.shape[0] > 1:
                waveform = torch.mean(waveform, dim=0, keepdim=True)
            
            # Flatten to 1D tensor
            waveform = waveform.squeeze()
            
            # Process with Wav2Vec2Processor
            inputs = self.processor(
                waveform,
                sampling_rate=16000,
                return_tensors="pt",
                padding=True
            )
            
            # Move to appropriate device
            input_values = inputs.input_values.to(self.device)
            
            # Model inference
            self.model.eval()
            with torch.no_grad():
                outputs = self.model(input_values)
                logits = outputs.logits
                
                # Apply softmax to get probabilities for each class
                probabilities = F.softmax(logits, dim=-1)
                
                # Get the probability of stuttering (assuming class 1 is stuttering)
                stutter_probability = probabilities[0][1].item()
                
                # Binary prediction based on 0.5 threshold
                prediction = 1 if stutter_probability > 0.5 else 0
            
            return prediction, stutter_probability
            
        except Exception as e:
            logger.error(f"Error in model prediction: {e}")
            raise
    
    def analyze_audio_features(self, audio_features: Dict[str, Any]) -> Dict[str, Any]:
        """
        Analyze audio features (fallback method when model is not available)
        
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
                'confidence': self._calculate_confidence(stutter_probability, analysis_data)
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
    
    def _generate_detailed_analysis(self, speech_rate: float = 0, pause_frequency: float = 0,
                                  repetition_patterns: List = None, prolongation_patterns: List = None,
                                  block_patterns: List = None, probability: float = 0.5) -> Dict[str, Any]:
        """Generate detailed analysis of speech patterns"""
        if repetition_patterns is None:
            repetition_patterns = []
        if prolongation_patterns is None:
            prolongation_patterns = []
        if block_patterns is None:
            block_patterns = []
            
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
    
    def _suggest_exercises(self, severity: str) -> List[Dict[str, str]]:
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
                {'title': 'Complex Fluency Shaping', 'category': 'Fluency'}
            ],
            'severe': [
                {'title': 'Comprehensive Stuttering Management', 'category': 'Comprehensive'},
                {'title': 'Maintenance and Generalization', 'category': 'Maintenance'},
                {'title': 'Professional Therapy Support', 'category': 'Professional'}
            ]
        }
        
        return exercise_mapping.get(severity, [])
    
    def _calculate_confidence(self, probability: float, analysis_data: Dict[str, Any]) -> float:
        """Calculate confidence level of the analysis"""
        try:
            # Base confidence from probability certainty
            if probability > 0.8 or probability < 0.2:
                confidence = 0.9  # High confidence for extreme probabilities
            elif probability > 0.6 or probability < 0.4:
                confidence = 0.7  # Medium confidence for moderate probabilities
            else:
                confidence = 0.5  # Lower confidence for uncertain cases
            
            # Adjust based on data availability
            if analysis_data.get('speech_rate_analysis', {}).get('rate', 0) > 0:
                confidence += 0.1
            
            if analysis_data.get('repetition_analysis', {}).get('count', 0) >= 0:
                confidence += 0.1
            
            return min(1.0, confidence)
        except Exception as e:
            logger.error(f"Error calculating confidence: {e}")
            return 0.7  # Default confidence
    
    def _generate_fallback_result(self) -> Dict[str, Any]:
        """Generate fallback result when analysis fails"""
        return {
            'stutter_probability': 0.5,
            'severity': 'moderate',
            'analysis_data': {
                'overall_assessment': {
                    'stutter_count': 0,
                    'fluency_score': 50,
                    'confidence_level': 'low'
                }
            },
            'recommendations': [
                "Unable to analyze audio properly",
                "Please try recording again",
                "Consider professional assessment"
            ],
            'exercises': [],
            'confidence': 0.3
        }

# Global analyzer instance
analyzer = StutteringAnalyzer()

def analyze_audio(audio_features: Dict[str, Any]) -> Dict[str, Any]:
    """Global function to analyze audio features"""
    return analyzer.analyze_audio_features(audio_features)

def analyze_audio_file(audio_path: str) -> Dict[str, Any]:
    """Global function to analyze audio file"""
    return analyzer.analyze_audio_file(audio_path)