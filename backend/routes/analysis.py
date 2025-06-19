from flask import Blueprint, request, jsonify, current_app
import os
from werkzeug.utils import secure_filename
from ml.model import analyze_audio

analysis_bp = Blueprint('analysis', __name__)

@analysis_bp.route('/upload', methods=['POST'])
def upload_audio():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400
    audio = request.files['audio']
    filename = secure_filename(audio.filename)
    upload_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
    audio.save(upload_path)
    # Call ML model for analysis
    result = analyze_audio(upload_path)
    return jsonify(result) 