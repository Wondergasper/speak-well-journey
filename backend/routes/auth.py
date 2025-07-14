from flask import Blueprint, request, jsonify
from models import User
from db import db
from flask_jwt_extended import create_access_token, decode_token, jwt_required, get_jwt_identity, create_refresh_token
from marshmallow import Schema, fields, ValidationError
from datetime import timedelta
from werkzeug.security import check_password_hash, generate_password_hash

class SignupSchema(Schema):
    name = fields.Str(required=True)
    email = fields.Email(required=True)
    password = fields.Str(required=True)

class LoginSchema(Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True)

class ForgotPasswordSchema(Schema):
    email = fields.Email(required=True)

class ResetPasswordSchema(Schema):
    token = fields.Str(required=True)
    new_password = fields.Str(required=True)

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['OPTIONS'])
def handle_login_options():
    """Handle CORS preflight requests for login"""
    response = jsonify({'status': 'ok'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'POST,OPTIONS')
    return response

@auth_bp.route('/signup', methods=['OPTIONS'])
def handle_signup_options():
    """Handle CORS preflight requests for signup"""
    response = jsonify({'status': 'ok'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'POST,OPTIONS')
    return response

@auth_bp.route('/signup', methods=['POST'])
def signup():
    try:
        data = SignupSchema().load(request.json)
    except ValidationError as err:
        return jsonify({'error': err.messages}), 400
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 400
    user = User(name=data['name'], email=data['email'])
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'Signup successful'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = LoginSchema().load(request.json)
    except ValidationError as err:
        return jsonify({'error': err.messages}), 400
    user = User.query.filter_by(email=data['email']).first()
    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=str(user.id))
        refresh_token = create_refresh_token(identity=str(user.id))
        return jsonify({'token': access_token, 'refresh_token': refresh_token, 'user': {'id': user.id, 'name': user.name, 'email': user.email}})
    return jsonify({'error': 'Invalid credentials'}), 401

@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    try:
        data = ForgotPasswordSchema().load(request.json)
    except ValidationError as err:
        return jsonify({'error': err.messages}), 400
    user = User.query.filter_by(email=data['email']).first()
    if not user:
        return jsonify({'error': 'Email not found'}), 404
    # Generate a short-lived JWT as a reset token
    reset_token = create_access_token(identity=str(user.id), expires_delta=timedelta(minutes=15), additional_claims={'pwreset': True})
    return jsonify({'message': 'Password reset token generated', 'reset_token': reset_token})

@auth_bp.route('/reset-password', methods=['POST'])
def reset_password():
    try:
        data = ResetPasswordSchema().load(request.json)
    except ValidationError as err:
        return jsonify({'error': err.messages}), 400
    try:
        decoded = decode_token(data['token'])
        if not decoded.get('pwreset'):
            return jsonify({'error': 'Invalid reset token'}), 400
        user_id = decoded['sub']
    except Exception:
        return jsonify({'error': 'Invalid or expired token'}), 400
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    user.set_password(data['new_password'])
    db.session.commit()
    return jsonify({'message': 'Password reset successful'})

@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    return jsonify({'token': access_token})

@auth_bp.route('/change-password', methods=['POST'])
@jwt_required()
def change_password():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    data = request.get_json() or {}
    current_password = data.get('current_password')
    new_password = data.get('new_password')
    if not current_password or not new_password:
        return jsonify({'error': 'Current and new password required'}), 400
    if not user.check_password(current_password):
        return jsonify({'error': 'Current password is incorrect'}), 403
    user.set_password(new_password)
    db.session.commit()
    return jsonify({'message': 'Password changed successfully'}), 200 