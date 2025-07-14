from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import db
from models import User

onboarding_bp = Blueprint('onboarding', __name__)

@onboarding_bp.route('/', methods=['POST'])
@jwt_required()
def save_onboarding():
    user_id = get_jwt_identity()
    data = request.get_json()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    # Update user fields from onboarding data
    user.name = data.get('name', user.name)
    user.age = data.get('age', user.age)
    user.therapy_goals = data.get('goals', user.therapy_goals)
    # Add more fields as needed (e.g., severity, bio, etc.)
    db.session.commit()
    return jsonify({'message': 'Onboarding data saved successfully'}) 