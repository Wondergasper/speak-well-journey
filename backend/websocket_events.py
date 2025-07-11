
from flask_socketio import SocketIO, emit, join_room, leave_room
from flask_jwt_extended import decode_token
from models import User, Progress, AnalysisResult
from db import db
import json
from datetime import datetime, timedelta

socketio = SocketIO(cors_allowed_origins="*")

# Store active users and their rooms
active_users = {}

@socketio.on('connect')
def handle_connect(auth):
    try:
        if auth and 'token' in auth:
            token_data = decode_token(auth['token'])
            user_id = token_data['sub']
            user = User.query.get(user_id)
            
            if user:
                join_room(f"user_{user_id}")
                active_users[user_id] = {
                    'name': user.name,
                    'connected_at': datetime.now()
                }
                emit('connected', {'message': f'Welcome {user.name}!'})
                
                # Send real-time stats update
                send_real_time_stats(user_id)
        else:
            emit('error', {'message': 'Authentication required'})
    except Exception as e:
        emit('error', {'message': 'Invalid token'})

@socketio.on('disconnect')
def handle_disconnect():
    # Clean up user from active users when they disconnect
    for user_id, data in list(active_users.items()):
        if user_id in active_users:
            leave_room(f"user_{user_id}")
            del active_users[user_id]
            break

@socketio.on('start_session')
def handle_start_session(data):
    try:
        token_data = decode_token(data['token'])
        user_id = token_data['sub']
        
        # Emit session started event
        emit('session_started', {
            'timestamp': datetime.now().isoformat(),
            'session_type': data.get('session_type', 'recording')
        }, room=f"user_{user_id}")
        
    except Exception as e:
        emit('error', {'message': 'Failed to start session'})

@socketio.on('progress_update')
def handle_progress_update(data):
    try:
        token_data = decode_token(data['token'])
        user_id = token_data['sub']
        
        # Broadcast progress update to user's room
        emit('progress_updated', {
            'progress': data['progress'],
            'timestamp': datetime.now().isoformat()
        }, room=f"user_{user_id}")
        
    except Exception as e:
        emit('error', {'message': 'Failed to update progress'})

def send_real_time_stats(user_id):
    """Send real-time statistics to user"""
    try:
        # Get recent progress data
        recent_progress = Progress.query.filter_by(user_id=user_id)\
            .filter(Progress.created_at >= datetime.now() - timedelta(days=30))\
            .order_by(Progress.created_at.desc()).limit(10).all()
        
        # Get recent analysis results
        recent_analyses = AnalysisResult.query.filter_by(user_id=user_id)\
            .filter(AnalysisResult.created_at >= datetime.now() - timedelta(days=7))\
            .order_by(AnalysisResult.created_at.desc()).all()
        
        stats = {
            'recent_sessions': len(recent_progress),
            'weekly_analyses': len(recent_analyses),
            'average_score': sum(p.score for p in recent_progress) / len(recent_progress) if recent_progress else 0,
            'improvement_trend': calculate_improvement_trend(recent_progress),
            'last_session': recent_progress[0].created_at.isoformat() if recent_progress else None
        }
        
        socketio.emit('stats_update', stats, room=f"user_{user_id}")
        
    except Exception as e:
        print(f"Error sending real-time stats: {e}")

def calculate_improvement_trend(progress_data):
    """Calculate improvement trend from progress data"""
    if len(progress_data) < 2:
        return 0
    
    scores = [p.score for p in progress_data[:5]]  # Last 5 sessions
    if len(scores) < 2:
        return 0
    
    # Simple trend calculation
    recent_avg = sum(scores[:2]) / 2
    older_avg = sum(scores[-2:]) / 2
    
    return ((recent_avg - older_avg) / older_avg * 100) if older_avg > 0 else 0

def notify_achievement(user_id, achievement_type, details):
    """Send achievement notification to user"""
    socketio.emit('achievement_unlocked', {
        'type': achievement_type,
        'details': details,
        'timestamp': datetime.now().isoformat()
    }, room=f"user_{user_id}")
