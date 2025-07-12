from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import User, AnalysisResult
from db import db
from marshmallow import Schema, fields, ValidationError
from werkzeug.security import check_password_hash, generate_password_hash

class ProfileUpdateSchema(Schema):
    name = fields.Str(required=True)
    email = fields.Email(required=False)
    bio = fields.Str(required=False)
    age = fields.Int(required=False)
    therapy_goals = fields.Str(required=False)

class PasswordUpdateSchema(Schema):
    current_password = fields.Str(required=True)
    new_password = fields.Str(required=True, validate=fields.Length(min=6))

profile_bp = Blueprint('profile', __name__)

@profile_bp.route('/', methods=['OPTIONS'])
def handle_options():
    """Handle CORS preflight requests"""
    response = jsonify({'status': 'ok'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@profile_bp.route('/', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    # Get user statistics
    analysis_count = AnalysisResult.query.filter_by(user_id=user_id).count()
    
    return jsonify({
        'name': user.name, 
        'email': user.email,
        'bio': getattr(user, 'bio', ''),
        'age': getattr(user, 'age', None),
        'therapy_goals': getattr(user, 'therapy_goals', ''),
        'member_since': user.created_at.isoformat() if hasattr(user, 'created_at') else None,
        'analysis_count': analysis_count
    })

@profile_bp.route('/', methods=['PUT'])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    try:
        data = ProfileUpdateSchema().load(request.json)
    except ValidationError as err:
        return jsonify({'error': err.messages}), 400
    
    # Update basic profile fields
    user.name = data['name']
    
    # Update optional fields if provided
    if 'email' in data:
        # Check if email is already taken
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user and existing_user.id != user_id:
            return jsonify({'error': 'Email already in use'}), 400
        user.email = data['email']
    
    if 'bio' in data:
        user.bio = data['bio']
    if 'age' in data:
        user.age = data['age']
    if 'therapy_goals' in data:
        user.therapy_goals = data['therapy_goals']
    
    try:
        db.session.commit()
        return jsonify({
            'message': 'Profile updated successfully',
            'name': user.name,
            'email': user.email,
            'bio': getattr(user, 'bio', ''),
            'age': getattr(user, 'age', None),
            'therapy_goals': getattr(user, 'therapy_goals', '')
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to update profile'}), 500

@profile_bp.route('/password', methods=['PUT'])
@jwt_required()
def update_password():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    try:
        data = PasswordUpdateSchema().load(request.json)
    except ValidationError as err:
        return jsonify({'error': err.messages}), 400
    
    # Verify current password
    if not check_password_hash(user.password_hash, data['current_password']):
        return jsonify({'error': 'Current password is incorrect'}), 400
    
    # Update password
    user.password_hash = generate_password_hash(data['new_password'])
    
    try:
        db.session.commit()
        return jsonify({'message': 'Password updated successfully'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to update password'}), 500

@profile_bp.route('/statistics', methods=['GET'])
@jwt_required()
def get_user_statistics():
    user_id = get_jwt_identity()
    
    # Get comprehensive user statistics
    total_analyses = AnalysisResult.query.filter_by(user_id=user_id).count()
    recent_analyses = AnalysisResult.query.filter_by(user_id=user_id).order_by(AnalysisResult.created_at.desc()).limit(5).all()
    
    avg_score = db.session.query(db.func.avg(AnalysisResult.score)).filter_by(user_id=user_id).scalar()
    
    return jsonify({
        'total_analyses': total_analyses,
        'average_score': round(avg_score, 2) if avg_score else 0,
        'recent_analyses': [{
            'id': r.id,
            'severity': r.severity,
            'score': r.score,
            'created_at': r.created_at.isoformat()
        } for r in recent_analyses]
    }) 