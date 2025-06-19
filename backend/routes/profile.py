from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import User
from app import db
from marshmallow import Schema, fields, ValidationError

class ProfileUpdateSchema(Schema):
    name = fields.Str(required=True)

profile_bp = Blueprint('profile', __name__)

@profile_bp.route('/', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify({'name': user.name, 'email': user.email})

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
    user.name = data['name']
    db.session.commit()
    return jsonify({'message': 'Profile updated', 'name': user.name, 'email': user.email}) 