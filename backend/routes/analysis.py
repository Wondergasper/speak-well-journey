from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import AnalysisResult, User
from db import db
import os
import tempfile
from werkzeug.utils import secure_filename
import logging

logger = logging.getLogger(__name__)

analysis_bp = Blueprint('analysis', __name__)

# Import ML model with error handling
try:
    from ml.model import analyze_audio_file, analyze_audio
    ML_MODEL_AVAILABLE = True
except ImportError as e:
    logger.warning(f"ML model not available: {e}")
    ML_MODEL_AVAILABLE = False
    # Create placeholder functions
    def analyze_audio_file(audio_path):
        return {
            'stutter_probability': 0.5,
            'severity': 'moderate',
            'analysis_data': {'overall_assessment': {'stutter_count': 0, 'fluency_score': 50}},
            'recommendations': ['ML model not available'],
            'exercises': [],
            'confidence': 0.3
        }
    
    def analyze_audio(audio_features):
        return {
            'stutter_probability': 0.5,
            'severity': 'moderate',
            'analysis_data': {'overall_assessment': {'stutter_count': 0, 'fluency_score': 50}},
            'recommendations': ['ML model not available'],
            'exercises': [],
            'confidence': 0.3
        }

ALLOWED_EXTENSIONS = {'wav', 'mp3', 'm4a', 'flac', 'ogg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@analysis_bp.route('/upload', methods=['POST'])
@jwt_required()
def upload_audio():
    """Upload and analyze audio file for stuttering detection"""
    try:
        user_id = get_jwt_identity()
        
        # Check if audio file is present
        if 'audio' not in request.files:
            return jsonify({'error': 'No audio file provided'}), 400
        
        file = request.files['audio']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type. Allowed: wav, mp3, m4a, flac, ogg'}), 400
        
        # Create temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.wav') as temp_file:
            file.save(temp_file.name)
            temp_path = temp_file.name
        
        try:
            # Analyze the audio file
            analysis_result = analyze_audio_file(temp_path)
            
            # Save analysis result to database
            analysis_record = AnalysisResult(
                user_id=user_id,
                audio_file_path=temp_path,  # Store the path for reference
                severity=analysis_result['severity'],
                score=int(analysis_result['stutter_probability'] * 100),
                confidence=analysis_result['confidence'],
                stutter_count=analysis_result['analysis_data']['overall_assessment']['stutter_count'],
                word_count=0,  # Could be calculated from audio
                analysis_data=analysis_result
            )
            
            db.session.add(analysis_record)
            db.session.commit()
            
            # Return the analysis results
            return jsonify({
                'message': 'Audio analysis completed successfully',
                'analysis_id': analysis_record.id,
                'results': {
                    'severity': analysis_result['severity'],
                    'score': int(analysis_result['stutter_probability'] * 100),
                    'confidence': analysis_result['confidence'],
                    'details': analysis_result['analysis_data'],
                    'recommendations': analysis_result['recommendations'],
                    'exercises': analysis_result['exercises']
                }
            })
            
        finally:
            # Clean up temporary file
            try:
                os.unlink(temp_path)
            except Exception as e:
                logger.warning(f"Could not delete temporary file {temp_path}: {e}")
                
    except Exception as e:
        logger.error(f"Error in audio upload: {e}")
        return jsonify({'error': 'Failed to process audio file'}), 500

@analysis_bp.route('/results/<int:analysis_id>', methods=['GET'])
@jwt_required()
def get_analysis_results(analysis_id):
    """Get analysis results by ID"""
    try:
        user_id = get_jwt_identity()
        
        # Get analysis result
        analysis = AnalysisResult.query.filter_by(id=analysis_id, user_id=user_id).first()
        if not analysis:
            return jsonify({'error': 'Analysis not found'}), 404
        
        return jsonify({
            'id': analysis.id,
            'severity': analysis.severity,
            'score': analysis.score,
            'confidence': analysis.confidence,
            'stutter_count': analysis.stutter_count,
            'word_count': analysis.word_count,
            'details': analysis.analysis_data,
            'created_at': analysis.created_at.isoformat()
        })
        
    except Exception as e:
        logger.error(f"Error getting analysis results: {e}")
        return jsonify({'error': 'Failed to retrieve analysis results'}), 500

@analysis_bp.route('/history', methods=['GET'])
@jwt_required()
def get_analysis_history():
    """Get user's analysis history"""
    try:
        user_id = get_jwt_identity()
        
        # Get user's analysis history
        analyses = AnalysisResult.query.filter_by(user_id=user_id)\
            .order_by(AnalysisResult.created_at.desc()).limit(20).all()
        
        history = []
        for analysis in analyses:
            history.append({
                'id': analysis.id,
                'severity': analysis.severity,
                'score': analysis.score,
                'confidence': analysis.confidence,
                'created_at': analysis.created_at.isoformat()
            })
        
        return jsonify({'results': history})
        
    except Exception as e:
        logger.error(f"Error getting analysis history: {e}")
        return jsonify({'error': 'Failed to retrieve analysis history'}), 500

@analysis_bp.route('/analyze-features', methods=['POST'])
@jwt_required()
def analyze_audio_features():
    """Analyze audio features (for when audio file is not available)"""
    try:
        user_id = get_jwt_identity()
        
        # Get audio features from request
        audio_features = request.json.get('audio_features', {})
        if not audio_features:
            return jsonify({'error': 'No audio features provided'}), 400
        
        # Analyze the features
        analysis_result = analyze_audio(audio_features)
        
        # Save analysis result to database
        analysis_record = AnalysisResult(
            user_id=user_id,
            audio_file_path=None,  # No file for feature-based analysis
            severity=analysis_result['severity'],
            score=int(analysis_result['stutter_probability'] * 100),
            confidence=analysis_result['confidence'],
            stutter_count=analysis_result['analysis_data']['overall_assessment']['stutter_count'],
            word_count=0,
            analysis_data=analysis_result
        )
        
        db.session.add(analysis_record)
        db.session.commit()
        
        return jsonify({
            'message': 'Audio features analysis completed successfully',
            'analysis_id': analysis_record.id,
            'results': {
                'severity': analysis_result['severity'],
                'score': int(analysis_result['stutter_probability'] * 100),
                'confidence': analysis_result['confidence'],
                'details': analysis_result['analysis_data'],
                'recommendations': analysis_result['recommendations'],
                'exercises': analysis_result['exercises']
            }
        })
        
    except Exception as e:
        logger.error(f"Error in audio features analysis: {e}")
        return jsonify({'error': 'Failed to analyze audio features'}), 500

@analysis_bp.route('/stats', methods=['GET'])
@jwt_required()
def get_analysis_stats():
    """Get user's analysis statistics"""
    try:
        user_id = get_jwt_identity()
        
        # Get user's analysis statistics
        total_analyses = AnalysisResult.query.filter_by(user_id=user_id).count()
        
        if total_analyses == 0:
            return jsonify({
                'total_analyses': 0,
                'average_score': 0,
                'severity_distribution': {},
                'recent_trend': 'no_data'
            })
        
        # Calculate average score
        avg_score = db.session.query(db.func.avg(AnalysisResult.score))\
            .filter_by(user_id=user_id).scalar() or 0
        
        # Get severity distribution
        severity_counts = db.session.query(
            AnalysisResult.severity, 
            db.func.count(AnalysisResult.id)
        ).filter_by(user_id=user_id).group_by(AnalysisResult.severity).all()
        
        severity_distribution = {severity: count for severity, count in severity_counts}
        
        # Get recent trend (last 5 analyses)
        recent_analyses = AnalysisResult.query.filter_by(user_id=user_id)\
            .order_by(AnalysisResult.created_at.desc()).limit(5).all()
        
        if len(recent_analyses) >= 2:
            recent_avg = sum(a.score for a in recent_analyses[:2]) / 2
            older_avg = sum(a.score for a in recent_analyses[2:]) / (len(recent_analyses) - 2)
            trend = 'improving' if recent_avg > older_avg else 'declining' if recent_avg < older_avg else 'stable'
        else:
            trend = 'insufficient_data'
        
        return jsonify({
            'total_analyses': total_analyses,
            'average_score': round(avg_score, 1),
            'severity_distribution': severity_distribution,
            'recent_trend': trend
        })
        
    except Exception as e:
        logger.error(f"Error getting analysis stats: {e}")
        return jsonify({'error': 'Failed to retrieve analysis statistics'}), 500