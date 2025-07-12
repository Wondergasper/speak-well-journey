# SpeakWell Journey - AI-Powered Speech Therapy App

A comprehensive speech therapy application that uses AI to analyze stuttering patterns and provide personalized exercises and progress tracking.

## 🌟 Features

### 🤖 AI-Powered Analysis
- **Wav2Vec2 Model Integration**: Advanced audio analysis using fine-tuned neural networks
- **Real-time Stuttering Detection**: Instant analysis of speech patterns
- **Severity Classification**: Automatic categorization (none, mild, moderate, severe)
- **Personalized Recommendations**: AI-generated exercise suggestions

### 📊 Progress Tracking
- **Comprehensive Analytics**: Track fluency improvements over time
- **Visual Progress Charts**: Interactive graphs showing speech development
- **Session History**: Complete record of practice sessions
- **Goal Setting**: Personalized therapy objectives

### 🏋️ Evidence-Based Exercises
- **Severity-Based Organization**: Exercises tailored to stuttering severity
- **Evidence Levels**: A, B, C classification for exercise effectiveness
- **Target Skills**: Specific speech skills each exercise addresses
- **Progress Indicators**: Clear metrics for measuring improvement

### 👤 User Management
- **Secure Authentication**: JWT-based user authentication
- **Personalized Profiles**: Customizable user settings and goals
- **Privacy Protection**: Secure data handling and storage
- **Multi-user Support**: Individual progress tracking

### 🎯 Interactive Features
- **Audio Recording**: Built-in microphone support for practice
- **Real-time Feedback**: Immediate analysis results
- **Exercise Library**: Comprehensive collection of speech exercises
- **Community Support**: User forums and shared experiences

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **Modern UI**: Built with shadcn/ui and Tailwind CSS
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Updates**: Live progress tracking and notifications
- **Accessibility**: WCAG compliant design

### Backend (Flask + Python)
- **RESTful API**: Clean, documented API endpoints
- **AI Integration**: Wav2Vec2 model for speech analysis
- **Database**: SQLite with SQLAlchemy ORM
- **Security**: JWT authentication and input validation

### ML Pipeline
- **Audio Processing**: Advanced audio preprocessing and feature extraction
- **Model Inference**: Real-time stuttering detection
- **Fallback System**: Graceful degradation when model unavailable
- **Continuous Learning**: Model improvement capabilities

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd speak-well-journey-1
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Create test user
python create_test_user.py

# Start the server
python start_server.py
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:8080 (or the port shown in terminal)
- **Backend API**: http://localhost:5000
- **Test Login**: 
  - Email: `test@example.com`
  - Password: `password123`

## 📁 Project Structure

```
speak-well-journey-1/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── contexts/       # React contexts (Auth, Theme)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API service layer
│   │   └── lib/            # Utility functions
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── backend/                 # Flask Python backend
│   ├── ml/                 # Machine learning models
│   │   ├── model.py        # Wav2Vec2 integration
│   │   ├── utils.py        # Audio processing utilities
│   │   └── stuttering_model/ # Trained model files
│   ├── routes/             # API route handlers
│   ├── models.py           # Database models
│   ├── app.py              # Flask application
│   └── requirements.txt    # Python dependencies
└── README.md               # This file
```

## 🔧 Configuration

### Environment Variables
Create `.env` files in both frontend and backend directories:

**Frontend (.env)**
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

**Backend (.env)**
```env
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-here
DATABASE_URL=sqlite:///speech_therapy.db
```

### ML Model Setup
1. Place your trained Wav2Vec2 model files in `backend/ml/stuttering_model/`
2. Required files:
   - `pytorch_model.bin`
   - `preprocessor_config.json`
   - `tokenizer_config.json`
   - `special_tokens_map.json`
   - `vocab.json`

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset

### Analysis Endpoints
- `POST /api/analysis/upload` - Upload audio for analysis
- `GET /api/analysis/results/<id>` - Get analysis results
- `GET /api/analysis/history` - Get analysis history
- `GET /api/analysis/stats` - Get user statistics

### Exercise Endpoints
- `GET /api/exercises` - Get all exercises
- `GET /api/exercises/<id>` - Get specific exercise
- `POST /api/exercises/<id>/start` - Start exercise session
- `POST /api/exercises/<id>/complete` - Complete exercise

### Profile Endpoints
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile
- `GET /api/progress` - Get progress data

## 🧪 Testing

### Backend Tests
```bash
cd backend

# Test server startup
python test_server.py

# Test auth endpoint
python test_auth_endpoint.py

# Test profile endpoint
python test_profile_endpoint.py
```

### Frontend Tests
```bash
cd frontend

# Run unit tests
npm test

# Run e2e tests
npm run test:e2e
```

## 🚀 Deployment

### Production Setup
1. **Backend**: Deploy to cloud platform (Heroku, AWS, etc.)
2. **Frontend**: Build and deploy to CDN
3. **Database**: Use production database (PostgreSQL, MySQL)
4. **ML Model**: Deploy model to cloud ML service

### Environment Variables for Production
```env
FLASK_ENV=production
DATABASE_URL=postgresql://user:pass@host:port/db
SECRET_KEY=your-production-secret
JWT_SECRET_KEY=your-production-jwt-secret
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Wav2Vec2 Model**: Based on Facebook's Wav2Vec2 architecture
- **Evidence-Based Exercises**: Developed with speech therapy professionals
- **UI Components**: Built with shadcn/ui and Tailwind CSS
- **Audio Processing**: Enhanced with librosa and torchaudio

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation in `/docs` folder

---

**FINAL YEAR PROJECT** 
**OPEYEMI OBAFEMI**
**GASPER SAMUEL**
**ODILE EMMANUEL**
**GOODENESS**