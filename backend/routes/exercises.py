from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Exercise
from db import db
from marshmallow import Schema, fields, ValidationError
from models import Progress
from datetime import datetime

class CompleteExerciseSchema(Schema):
    exercise_id = fields.Int(required=True)

exercises_bp = Blueprint('exercises', __name__)

@exercises_bp.route('/', methods=['GET'])
@jwt_required()
def get_exercises():
    user_id = get_jwt_identity()
    severity = request.args.get('severity')  # Get severity from query params
    category = request.args.get('category')  # Get category from query params
    
    query = Exercise.query
    
    # Filter by severity if provided
    if severity:
        query = query.filter_by(severity=severity)
    
    # Filter by category if provided
    if category:
        query = query.filter_by(category=category)
    
    exercises = query.all()
    
    return jsonify([{
        'id': exercise.id,
        'title': exercise.title,
        'description': exercise.description,
        'instructions': exercise.instructions,
        'severity': exercise.severity,
        'duration_minutes': exercise.duration_minutes,
        'category': exercise.category,
        'evidence_level': exercise.evidence_level,
        'target_skills': exercise.target_skills,
        'prerequisites': exercise.prerequisites,
        'progress_indicators': exercise.progress_indicators
    } for exercise in exercises])

@exercises_bp.route('/<int:exercise_id>', methods=['GET'])
@jwt_required()
def get_exercise(exercise_id):
    exercise = Exercise.query.get(exercise_id)
    if not exercise:
        return jsonify({'error': 'Exercise not found'}), 404
    return jsonify({
        'id': exercise.id, 
        'title': exercise.title, 
        'description': exercise.description,
        'instructions': exercise.instructions,
        'duration_minutes': exercise.duration_minutes,
        'category': exercise.category,
        'severity': exercise.severity,
        'evidence_level': exercise.evidence_level,
        'target_skills': exercise.target_skills,
        'prerequisites': exercise.prerequisites,
        'progress_indicators': exercise.progress_indicators
    })

@exercises_bp.route('/recommended', methods=['GET'])
@jwt_required()
def get_recommended_exercises():
    """Get exercises recommended for the user's severity level"""
    user_id = get_jwt_identity()
    
    # Get user's severity level (you might want to get this from user profile)
    # For now, we'll get it from query params or use default
    severity = request.args.get('severity', 'mild')
    
    # Get exercises appropriate for the user's severity level
    exercises = Exercise.query.filter_by(severity=severity).all()
    
    return jsonify([{
        'id': exercise.id,
        'title': exercise.title,
        'description': exercise.description,
        'instructions': exercise.instructions,
        'severity': exercise.severity,
        'duration_minutes': exercise.duration_minutes,
        'category': exercise.category,
        'evidence_level': exercise.evidence_level,
        'target_skills': exercise.target_skills,
        'prerequisites': exercise.prerequisites,
        'progress_indicators': exercise.progress_indicators
    } for exercise in exercises])

@exercises_bp.route('/complete', methods=['POST'])
@jwt_required()
def complete_exercise():
    try:
        data = CompleteExerciseSchema().load(request.json)
    except ValidationError as err:
        return jsonify({'error': err.messages}), 400
    # For demo, just echo back; extend Progress model for real completion
    return jsonify({'message': 'Exercise marked as complete', 'data': data})

@exercises_bp.route('/<int:exercise_id>/start', methods=['POST'])
@jwt_required()
def start_exercise(exercise_id):
    exercise = Exercise.query.get(exercise_id)
    if not exercise:
        return jsonify({'error': 'Exercise not found'}), 404
    
    user_id = get_jwt_identity()
    return jsonify({
        'message': 'Exercise started successfully',
        'exercise': {
            'id': exercise.id,
            'title': exercise.title,
            'severity': exercise.severity,
            'duration_minutes': exercise.duration_minutes
        },
        'user_id': user_id
    }) 

@exercises_bp.route('/<int:exercise_id>/complete', methods=['POST'])
@jwt_required()
def complete_exercise(exercise_id):
    user_id = get_jwt_identity()
    
    # Check if exercise exists
    exercise = Exercise.query.get(exercise_id)
    if not exercise:
        return jsonify({'error': 'Exercise not found'}), 404
    
    # Get additional data from request
    request_data = request.json or {}
    fluency_rating = request_data.get('fluency_rating')
    confidence_rating = request_data.get('confidence_rating')
    notes = request_data.get('notes', '')
    
    # Record completion in progress table
    progress = Progress(
        user_id=user_id,
        exercise_id=exercise_id,
        date=datetime.now().date(),
        score=request_data.get('score', 100),  # Default score for completion
        session_duration=request_data.get('duration', 300),  # Default 5 minutes
        severity_level=exercise.severity,
        notes=notes,
        fluency_rating=fluency_rating,
        confidence_rating=confidence_rating
    )
    
    try:
        db.session.add(progress)
        db.session.commit()
        
        return jsonify({
            'message': 'Exercise completed successfully',
            'progress_id': progress.id,
            'exercise': {
                'title': exercise.title,
                'severity': exercise.severity
            }
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to record completion'}), 500 