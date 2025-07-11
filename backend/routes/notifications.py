from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Notification
from db import db
from datetime import datetime

notifications_bp = Blueprint('notifications', __name__)

@notifications_bp.route('/', methods=['GET'])
@jwt_required()
def list_notifications():
    user_id = get_jwt_identity()
    notifications = Notification.query.filter_by(user_id=user_id).order_by(Notification.created_at.desc()).all()
    return jsonify([
        {
            'id': n.id,
            'message': n.message,
            'read': n.read,
            'created_at': n.created_at.isoformat()
        } for n in notifications
    ])

@notifications_bp.route('/', methods=['POST'])
@jwt_required()
def create_notification():
    user_id = get_jwt_identity()
    data = request.get_json()
    message = data.get('message')
    if not message:
        return jsonify({'error': 'Message is required'}), 400
    notification = Notification(user_id=user_id, message=message, read=False, created_at=datetime.utcnow())
    db.session.add(notification)
    db.session.commit()
    return jsonify({'message': 'Notification created', 'id': notification.id}), 201

@notifications_bp.route('/<int:notification_id>/read', methods=['PUT'])
@jwt_required()
def mark_notification_read(notification_id):
    user_id = get_jwt_identity()
    notification = Notification.query.filter_by(id=notification_id, user_id=user_id).first()
    if not notification:
        return jsonify({'error': 'Notification not found'}), 404
    notification.read = True
    db.session.commit()
    return jsonify({'message': 'Notification marked as read'}) 