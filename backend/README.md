# SpeakWell Journey - Backend API

A comprehensive Flask backend for the AI-powered speech therapy application, featuring Wav2Vec2 model integration, secure authentication, and evidence-based exercise management.

## 🌟 Features

### 🤖 AI-Powered Speech Analysis
- **Wav2Vec2 Model Integration**: Fine-tuned neural network for stuttering detection
- **Real-time Audio Processing**: Advanced audio preprocessing and feature extraction
- **Severity Classification**: Automatic categorization (none, mild, moderate, severe)
- **Fallback System**: Graceful degradation when ML model unavailable
- **Confidence Scoring**: Reliability metrics for analysis results

### 🔐 Security & Authentication
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Werkzeug security with bcrypt
- **CORS Protection**: Proper cross-origin request handling
- **Input Validation**: Marshmallow schema validation
- **Rate Limiting**: Protection against abuse

### 📊 Data Management
- **SQLite Database**: Lightweight, file-based database
- **SQLAlchemy ORM**: Type-safe database operations
- **User Profiles**: Comprehensive user data management
- **Progress Tracking**: Detailed session and exercise history
- **Analytics**: Statistical analysis and reporting

### 🏋️ Evidence-Based Exercises
- **Severity-Based Organization**: Exercises tailored to stuttering levels
- **Evidence Levels**: A, B, C classification for effectiveness
- **Target Skills**: Specific speech skills addressed
- **Progress Indicators**: Clear metrics for improvement
- **Prerequisites**: Exercise dependency management

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- pip package manager
- Git

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd speak-well-journey-1/backend

# Install dependencies
pip install -r requirements.txt

# Create test user
python create_test_user.py

# Start the server
python start_server.py
```

### Environment Setup
Create a `.env` file in the backend directory:
```env
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-here
DATABASE_URL=sqlite:///speech_therapy.db
FLASK_ENV=development
```

## 🏗️ Architecture

### Core Components
```
backend/
├── app.py                 # Flask application factory
├── config.py              # Configuration management
├── models.py              # Database models
├── db.py                  # Database initialization
├── requirements.txt       # Python dependencies
├── ml/                    # Machine learning models
│   ├── model.py           # Wav2Vec2 integration
│   ├── predict_single_audio.py # Audio prediction
│   ├── utils.py           # Audio processing utilities
│   └── stuttering_model/  # Trained model files
├── routes/                # API route handlers
│   ├── auth.py            # Authentication endpoints
│   ├── analysis.py        # Audio analysis endpoints
│   ├── exercises.py       # Exercise management
│   ├── profile.py         # User profile management
│   ├── progress.py        # Progress tracking
│   ├── community.py       # Community features
│   ├── settings.py        # User settings
│   ├── analytics.py       # Analytics and reporting
│   └── notifications.py   # Notification system
├── uploads/               # Temporary file storage
└── instance/              # Database files
```

## 📚 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/signup` | Register new user |
| `POST` | `/api/auth/login` | User login |
| `POST` | `/api/auth/forgot-password` | Request password reset |
| `POST` | `/api/auth/reset-password` | Reset password with token |
| `POST` | `/api/auth/refresh` | Refresh JWT token |

### Audio Analysis
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/analysis/upload` | Upload audio for analysis |
| `GET` | `/api/analysis/results/<id>` | Get analysis results |
| `GET` | `/api/analysis/history` | Get analysis history |
| `POST` | `/api/analysis/analyze-features` | Analyze audio features |
| `GET` | `/api/analysis/stats` | Get user statistics |

### Exercises
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/exercises` | List all exercises |
| `GET` | `/api/exercises/<id>` | Get exercise details |
| `GET` | `/api/exercises/recommended` | Get recommended exercises |
| `POST` | `/api/exercises/<id>/start` | Start exercise session |
| `POST` | `/api/exercises/<id>/complete` | Complete exercise |

### User Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/profile` | Get user profile |
| `PUT` | `/api/profile` | Update user profile |
| `PUT` | `/api/profile/password` | Update password |
| `GET` | `/api/profile/statistics` | Get user statistics |

### Progress Tracking
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/progress` | Get progress history |
| `POST` | `/api/progress` | Add progress entry |

### Community
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/community/posts` | List community posts |
| `POST` | `/api/community/posts` | Create new post |

## 🤖 ML Model Integration

### Wav2Vec2 Model Setup
1. **Model Files**: Place trained model in `ml/stuttering_model/`
   - `pytorch_model.bin` (360MB trained model)
   - `preprocessor_config.json`
   - `tokenizer_config.json`
   - `special_tokens_map.json`
   - `vocab.json`

2. **Model Loading**: Automatic detection and loading
   ```python
   from ml.model import StutteringAnalyzer
   
   # Initialize analyzer
   analyzer = StutteringAnalyzer()
   
   # Analyze audio file
   result = analyzer.analyze_audio_file("audio.wav")
   ```

### Audio Processing Pipeline
1. **File Upload**: Support for WAV, MP3, M4A, FLAC, OGG
2. **Preprocessing**: Resampling to 16kHz, mono conversion
3. **Feature Extraction**: MFCC, spectral features, prosodic features
4. **Model Inference**: Wav2Vec2 prediction with confidence scoring
5. **Result Generation**: Severity classification and recommendations

### Fallback Analysis
When ML model is unavailable:
- Feature-based analysis using audio characteristics
- Statistical pattern recognition
- Confidence-based severity estimation
- Exercise recommendations based on severity

## 🔧 Configuration

### Database Setup
```python
# Initialize database
python init_database.py

# Create tables
from app import app, db
with app.app_context():
    db.create_all()
```

### CORS Configuration
```python
# Configure CORS for frontend
CORS(app, 
     supports_credentials=True, 
     origins="*",  # Configure for production
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
     allow_headers=["Content-Type", "Authorization"])
```

### JWT Configuration
```python
# JWT settings
JWT_SECRET_KEY = "your-secret-key"
JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=12)
JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)
```

## 🧪 Testing

### Test Scripts
```bash
# Test server startup
python test_server.py

# Test authentication
python test_auth_endpoint.py

# Test profile endpoint
python test_profile_endpoint.py

# Test ML model
python setup_model.py check
```

### API Testing Examples
```bash
# Create test user
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com", "password": "password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'

# Get profile (with JWT token)
curl -X GET http://localhost:5000/api/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🔒 Security Features

### Authentication
- JWT tokens with configurable expiration
- Password hashing with Werkzeug security
- Automatic token refresh mechanism
- Session management and cleanup

### Data Protection
- Input validation with Marshmallow schemas
- SQL injection prevention with SQLAlchemy
- XSS protection with proper escaping
- CORS configuration for cross-origin requests

### File Upload Security
- File type validation
- File size limits (16MB max)
- Secure temporary file handling
- Automatic cleanup of uploaded files

## 📊 Database Models

### User Model
```python
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    severity = db.Column(db.String(20), default='mild')
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
```

### Exercise Model
```python
class Exercise(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    severity = db.Column(db.String(32), default='mild')
    evidence_level = db.Column(db.String(20), default='B')
    target_skills = db.Column(db.Text)
    prerequisites = db.Column(db.Text)
    progress_indicators = db.Column(db.Text)
```

### Analysis Result Model
```python
class AnalysisResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    severity = db.Column(db.String(20), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    confidence = db.Column(db.Float, default=0.0)
    analysis_data = db.Column(db.JSON)
```

## 🚀 Deployment

### Production Setup
1. **Environment Variables**
   ```env
   FLASK_ENV=production
   DATABASE_URL=postgresql://user:pass@host:port/db
   SECRET_KEY=your-production-secret
   JWT_SECRET_KEY=your-production-jwt-secret
   ```

2. **Database Migration**
   ```bash
   # For PostgreSQL
   pip install psycopg2-binary
   # Update DATABASE_URL in config.py
   ```

3. **WSGI Server**
   ```bash
   # Install Gunicorn
   pip install gunicorn
   
   # Start production server
   gunicorn -w 4 -b 0.0.0.0:5000 app:app
   ```

### Docker Deployment
```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 5000

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
```

## 🔍 Monitoring & Logging

### Logging Configuration
```python
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
```

### Key Metrics
- API response times
- Model inference performance
- Database query performance
- Error rates by endpoint
- User authentication success rates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

### Development Guidelines
- Follow PEP 8 style guidelines
- Add type hints for all functions
- Write comprehensive docstrings
- Include error handling for all endpoints
- Add tests for new features

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Wav2Vec2**: Facebook's speech recognition model
- **Flask**: Web framework for Python
- **SQLAlchemy**: Database toolkit and ORM
- **Transformers**: Hugging Face's NLP library

---

**Built with ❤️ for the speech therapy community** 