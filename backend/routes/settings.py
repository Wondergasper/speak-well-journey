from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import User
from app import db
from marshmallow import Schema, fields, ValidationError

class SettingsUpdateSchema(Schema):
    notifications = fields.Bool(required=True)
    theme = fields.Str(required=True)

settings_bp = Blueprint('settings', __name__)

@settings_bp.route('/', methods=['GET'])
@jwt_required()
def get_settings():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    # For demo, return mock settings; extend User model for real settings
    return jsonify({'notifications': True, 'theme': 'dark'})

@settings_bp.route('/', methods=['PUT'])
@jwt_required()
def update_settings():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    try:
        data = SettingsUpdateSchema().load(request.json)
    except ValidationError as err:
        return jsonify({'error': err.messages}), 400
    # For demo, just echo back; extend User model for real settings
    return jsonify({'message': 'Settings updated', 'settings': data}) 