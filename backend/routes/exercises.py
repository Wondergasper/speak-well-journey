from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Exercise
from app import db
from marshmallow import Schema, fields, ValidationError

class CompleteExerciseSchema(Schema):
    exercise_id = fields.Int(required=True)

exercises_bp = Blueprint('exercises', __name__)

@exercises_bp.route('/', methods=['GET'])
@jwt_required()
def list_exercises():
    exercises = Exercise.query.all()
    return jsonify([
        {'id': e.id, 'title': e.title, 'difficulty': e.difficulty}
        for e in exercises
    ])

@exercises_bp.route('/<int:exercise_id>', methods=['GET'])
@jwt_required()
def get_exercise(exercise_id):
    exercise = Exercise.query.get(exercise_id)
    if not exercise:
        return jsonify({'error': 'Exercise not found'}), 404
    return jsonify({'id': exercise.id, 'title': exercise.title, 'difficulty': exercise.difficulty})

@exercises_bp.route('/complete', methods=['POST'])
@jwt_required()
def complete_exercise():
    try:
        data = CompleteExerciseSchema().load(request.json)
    except ValidationError as err:
        return jsonify({'error': err.messages}), 400
    # For demo, just echo back; extend Progress model for real completion
    return jsonify({'message': 'Exercise marked as complete', 'data': data}) 