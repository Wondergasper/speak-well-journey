from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
import os
from werkzeug.utils import secure_filename
from ml.model import analyze_audio
import uuid
from models import AnalysisResult  # Assuming you have a models.py with AnalysisResult
from db import db  # Assuming you have a db instance in your main app

analysis_bp = Blueprint('analysis', __name__)

ALLOWED_EXTENSIONS = {'wav', 'mp3', 'ogg', 'webm', 'm4a'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@analysis_bp.route('/upload', methods=['POST'])
@jwt_required()
def upload_audio():
    try:
        if 'audio' not in request.files:
            return jsonify({'error': 'No audio file provided'}), 400

        audio = request.files['audio']
        if audio.filename == '':
            return jsonify({'error': 'No file selected'}), 400

        if not allowed_file(audio.filename):
            return jsonify({'error': 'Invalid file type. Supported formats: wav, mp3, ogg, webm, m4a'}), 400

        # Generate unique filename to avoid conflicts
        file_extension = audio.filename.rsplit('.', 1)[1].lower()
        unique_filename = f"{uuid.uuid4().hex}.{file_extension}"
        upload_path = os.path.join(current_app.config['UPLOAD_FOLDER'], unique_filename)

        # Save the file
        audio.save(upload_path)

        # Get user ID for tracking
        user_id = get_jwt_identity()

        # Call ML model for analysis
        result = analyze_audio(upload_path)

        # Store the analysis result in the database
        analysis_result = AnalysisResult(
            user_id=user_id,
            filename=unique_filename,
            severity=result.get('severity', 'Unknown'),
            score=result.get('score', 0.0),
            confidence=result.get('confidence', 0.0),
            stutter_count=result.get('stutter_count', 0),
            word_count=result.get('word_count', 0),
            analysis_data=result  # Store the entire result dictionary
        )

        db.session.add(analysis_result)
        db.session.commit()

        result_id = analysis_result.id

        # Clean up the uploaded file after analysis
        try:
            os.remove(upload_path)
        except OSError:
            pass

        return jsonify({
            'message': 'Audio uploaded and analyzed successfully',
            'analysis_id': result_id
        })

    except Exception as e:
        current_app.logger.error(f"Audio analysis error: {str(e)}")
        return jsonify({'error': 'Failed to process audio file'}), 500

@analysis_bp.route('/results/<int:result_id>', methods=['GET'])
@jwt_required()
def get_analysis_result(result_id):
    user_id = get_jwt_identity()

    # Get analysis result
    result = AnalysisResult.query.filter_by(id=result_id, user_id=user_id).first()
    if not result:
        return jsonify({'error': 'Analysis result not found'}), 404

    return jsonify({
        'id': result.id,
        'severity': result.severity,
        'score': result.score,
        'confidence': result.confidence,
        'stutter_count': result.stutter_count,
        'word_count': result.word_count,
        'analysis_data': result.analysis_data,
        'created_at': result.created_at.isoformat()
    })

@analysis_bp.route('/history', methods=['GET'])
@jwt_required()
def get_analysis_history():
    user_id = get_jwt_identity()

    results = AnalysisResult.query.filter_by(user_id=user_id).order_by(AnalysisResult.created_at.desc()).all()

    return jsonify({
        'results': [{
            'id': result.id,
            'severity': result.severity,
            'score': result.score,
            'created_at': result.created_at.isoformat()
        } for result in results]
    })