from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import User
from db import db
from marshmallow import Schema, fields, ValidationError

class SettingsUpdateSchema(Schema):
    notifications = fields.Bool(required=False)
    theme = fields.Str(required=False)
    emailUpdates = fields.Bool(required=False)
    accessibility = fields.Bool(required=False)
    darkMode = fields.Bool(required=False)

settings_bp = Blueprint('settings', __name__)

@settings_bp.route('/', methods=['GET'])
@jwt_required()
def get_settings():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify(user.preferences or {}), 200

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
    # Merge new settings into existing preferences
    prefs = user.preferences or {}
    prefs.update(data)
    user.preferences = prefs
    try:
        db.session.commit()
        return jsonify({'message': 'Settings updated', 'settings': user.preferences}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to update settings'}), 500
