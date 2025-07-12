# Stuttering Detection ML Model Integration Documentation

## Overview
This Flask backend provides a complete API for stuttering detection using a fine-tuned Wav2Vec2 model. The system can analyze audio files and provide detailed stuttering analysis with severity classification, recommendations, and exercise suggestions.

## Required Files Structure

```
backend/
├── ml/
│   ├── model.py                    # Main ML model integration
│   ├── predict_single_audio.py     # Audio prediction utilities
│   ├── utils.py                    # Audio preprocessing utilities
│   └── stuttering_model/           # Your trained model files
│       ├── pytorch_model.bin       # Trained model weights
│       ├── preprocessor_config.json # Preprocessor configuration
│       ├── tokenizer_config.json   # Tokenizer configuration
│       ├── special_tokens_map.json # Special tokens mapping
│       └── vocab.json              # Vocabulary file
├── routes/
│   └── analysis.py                 # API endpoints for audio analysis
└── app.py                          # Main Flask application
```

## Key Components

### 1. Model Integration (`ml/model.py`)

**StutteringAnalyzer Class:**
- **Purpose**: Main class for loading and using the trained Wav2Vec2 model
- **Initialization**: Automatically loads model and processor from `stuttering_model/` directory
- **Fallback**: Uses placeholder analysis if trained model is not available

**Key Methods:**
- `analyze_audio_file(audio_path)`: Analyzes audio file using trained model
- `analyze_audio_features(features)`: Analyzes pre-extracted audio features
- `_predict_with_model(audio_path)`: Core prediction using Wav2Vec2 model

**Model Loading Logic:**
```python
# Checks for required files
required_files = ['pytorch_model.bin', 'preprocessor_config.json', 'tokenizer_config.json']
# Loads Wav2Vec2Processor and Wav2Vec2ForSequenceClassification
# Falls back to placeholder if files missing
```

### 2. Audio Processing (`ml/predict_single_audio.py`)

**Function: `predict_single_audio(audio_path, model, processor)`**
- **Input**: Audio file path, loaded model, and processor
- **Processing**: 
  - Loads audio with torchaudio
  - Resamples to 16kHz if needed
  - Converts to mono if stereo
  - Processes with Wav2Vec2Processor
  - Runs model inference
- **Output**: (prediction, probability) tuple

### 3. API Endpoints (`routes/analysis.py`)

#### `/api/analysis/upload` (POST)
**Purpose**: Upload and analyze audio file
**Input**: Audio file in multipart form data
**Process**:
1. Validates file type (wav, mp3, m4a, flac, ogg)
2. Creates temporary file
3. Calls `analyze_audio_file()`
4. Saves results to database
5. Returns analysis results with recommendations

**Response**:
```json
{
  "message": "Audio analysis completed successfully",
  "analysis_id": 123,
  "results": {
    "severity": "mild",
    "score": 75,
    "confidence": 0.85,
    "details": {...},
    "recommendations": [...],
    "exercises": [...]
  }
}
```

#### `/api/analysis/results/<id>` (GET)
**Purpose**: Retrieve specific analysis results
**Input**: Analysis ID
**Output**: Complete analysis data

#### `/api/analysis/history` (GET)
**Purpose**: Get user's analysis history
**Output**: List of recent analyses with basic info

#### `/api/analysis/analyze-features` (POST)
**Purpose**: Analyze pre-extracted audio features
**Input**: JSON with audio features
**Output**: Analysis results (fallback method)

#### `/api/analysis/stats` (GET)
**Purpose**: Get user's analysis statistics
**Output**: Total analyses, average score, severity distribution, trends

## Model Integration Logic

### 1. Model Loading Process
```python
# On startup, StutteringAnalyzer tries to load:
1. Check if required files exist in stuttering_model/
2. Load Wav2Vec2Processor from preprocessor_config.json
3. Load Wav2Vec2ForSequenceClassification from pytorch_model.bin (auto-detects config)
4. Move model to appropriate device (CPU/GPU)
5. Set model to evaluation mode
```

### 2. Audio Analysis Pipeline
```python
# For audio file analysis:
1. Load audio file with torchaudio
2. Resample to 16kHz (Wav2Vec2 requirement)
3. Convert to mono if stereo
4. Process with Wav2Vec2Processor
5. Run model inference
6. Apply softmax to get class probabilities
7. Determine stuttering probability and severity
8. Generate detailed analysis and recommendations
```

### 3. Fallback Analysis
```python
# When trained model is not available:
1. Use feature-based analysis
2. Calculate stuttering probability from audio features
3. Generate severity classification
4. Provide recommendations and exercises
```

## Dependencies

### Required Python Packages
```bash
pip install flask flask-jwt-extended
pip install torch torchaudio
pip install transformers
pip install librosa soundfile numpy
pip install werkzeug
```

### Model Files Required
- `pytorch_model.bin`: Trained model weights
- `preprocessor_config.json`: Audio preprocessing configuration
- `tokenizer_config.json`: Tokenizer configuration
- `special_tokens_map.json`: Special tokens mapping
- `vocab.json`: Vocabulary file

## Deployment Instructions

### 1. Model Setup
```bash
# Place your trained model files in:
backend/ml/stuttering_model/
```

### 2. Environment Setup
```bash
# Install dependencies
pip install -r requirements.txt

# Set environment variables
export FLASK_APP=app.py
export FLASK_ENV=development
```

### 3. Database Setup
```bash
# Initialize database
python init_db.py

# Run migrations if needed
python migrate_remove_difficulty.py
python update_database.py
```

### 4. Start Server
```bash
# Development
python app.py

# Production (with Gunicorn)
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## API Usage Examples

### Upload Audio for Analysis
```bash
curl -X POST http://localhost:5000/api/analysis/upload \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "audio=@speech_sample.wav"
```

### Get Analysis Results
```bash
curl -X GET http://localhost:5000/api/analysis/results/123 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Analyze Audio Features
```bash
curl -X POST http://localhost:5000/api/analysis/analyze-features \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "audio_features": {
      "speech_rate": 1.8,
      "pause_frequency": 8,
      "repetition_patterns": ["st-st-stairs"],
      "prolongation_patterns": ["...table"],
      "block_patterns": ["ssssunday"]
    }
  }'
```

## Error Handling

### Model Loading Errors
- **Missing Files**: Falls back to placeholder analysis
- **Corrupted Files**: Logs error and uses fallback
- **Memory Issues**: Handles GPU/CPU device selection

### Audio Processing Errors
- **Invalid File Format**: Returns 400 error with allowed formats
- **File Too Large**: Implement file size limits
- **Processing Failures**: Returns 500 error with details

### API Errors
- **Authentication**: JWT token validation
- **File Validation**: Format and size checks
- **Database Errors**: Proper error handling and rollback

## Performance Considerations

### Model Optimization
- **Device Selection**: Automatic CPU/GPU detection
- **Batch Processing**: Support for multiple audio files
- **Memory Management**: Proper cleanup of temporary files

### API Optimization
- **File Size Limits**: Configurable upload limits
- **Response Caching**: Cache analysis results
- **Rate Limiting**: Implement API rate limits

## Security Considerations

### File Upload Security
- **File Type Validation**: Strict format checking
- **Path Traversal**: Secure file handling
- **Temporary Files**: Proper cleanup

### API Security
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Sanitize all inputs
- **Error Information**: Don't expose sensitive details

## Monitoring and Logging

### Logging Configuration
```python
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
```

### Key Metrics to Monitor
- Model loading success rate
- Audio processing time
- API response times
- Error rates by endpoint
- File upload success rate

## Troubleshooting

### Common Issues

1. **Model Not Loading**
   - Check file paths and permissions
   - Verify all required files are present
   - Check model file integrity

2. **Audio Processing Errors**
   - Verify audio file format
   - Check file size limits
   - Ensure proper audio encoding

3. **API Errors**
   - Check JWT token validity
   - Verify request format
   - Check database connectivity

### Debug Mode
```python
# Enable debug logging
logging.basicConfig(level=logging.DEBUG)
```

This documentation provides a complete guide for integrating your trained Wav2Vec2 model with the Flask backend. The system is designed to be robust, scalable, and production-ready. 