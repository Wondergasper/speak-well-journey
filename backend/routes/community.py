from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Post, User
from db import db
from marshmallow import Schema, fields, ValidationError
from datetime import datetime

class CreatePostSchema(Schema):
    content = fields.Str(required=True)

community_bp = Blueprint('community', __name__)

@community_bp.route('/posts', methods=['GET'])
@jwt_required()
def list_posts():
    posts = Post.query.order_by(Post.created_at.desc()).all()
    return jsonify([
        {
            'id': p.id,
            'author': User.query.get(p.author_id).name if p.author_id else None,
            'content': p.content,
            'created_at': p.created_at.isoformat() if p.created_at else None
        }
        for p in posts
    ])

@community_bp.route('/posts', methods=['POST'])
@jwt_required()
def create_post():
    user_id = get_jwt_identity()
    try:
        data = CreatePostSchema().load(request.json)
    except ValidationError as err:
        return jsonify({'error': err.messages}), 400
    post = Post(author_id=user_id, content=data['content'], created_at=datetime.utcnow())
    db.session.add(post)
    db.session.commit()
    return jsonify({'message': 'Post created', 'id': post.id, 'content': post.content, 'created_at': post.created_at.isoformat()}) 
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from models import Post, User

community_bp = Blueprint('community', __name__)

@community_bp.route('/posts', methods=['GET'])
@jwt_required()
def get_posts():
    posts = Post.query.order_by(Post.created_at.desc()).all()
    return jsonify([{
        'id': post.id,
        'content': post.content,
        'author_id': post.author_id,
        'created_at': post.created_at.isoformat() if post.created_at else None
    } for post in posts]), 200

@community_bp.route('/posts', methods=['POST'])
@jwt_required()
def create_post():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    post = Post(
        author_id=user_id,
        content=data.get('content'),
        created_at=db.func.current_timestamp()
    )
    
    db.session.add(post)
    db.session.commit()
    
    return jsonify({'message': 'Post created successfully'}), 201
   # </community_bp>
