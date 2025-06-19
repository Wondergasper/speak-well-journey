# Speak Well Journey Backend

This is the Flask backend for the Speak Well Journey app, providing secure audio analysis, user authentication, and user data management with SQLite and JWT.

## Features
- Audio upload and ML-powered analysis
- Secure user authentication (JWT, password hashing)
- Password reset with secure token
- User profile and settings (JWT-protected)
- Exercises, progress tracking, and community posts (all JWT-protected)
- CORS enabled for frontend integration
- Input validation and error handling

## Setup

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Create folders for uploads and results:**
   ```bash
   mkdir uploads results
   ```

3. **Create the database:**
   ```python
   from app import create_app, db
   app = create_app()
   with app.app_context():
       db.create_all()
   ```

4. **Run the server:**
   ```bash
   python app.py
   ```

## API Endpoints

### Authentication
- `POST /api/auth/signup` — Register a new user (name, email, password)
- `POST /api/auth/login` — Login, returns JWT token
- `POST /api/auth/forgot-password` — Request password reset (returns token for demo)
- `POST /api/auth/reset-password` — Reset password with token

### User Profile & Settings (JWT required)
- `GET /api/profile/` — Get current user's profile
- `PUT /api/profile/` — Update user's profile
- `GET /api/settings/` — Get user's settings
- `PUT /api/settings/` — Update user's settings

### Audio Analysis
- `POST /api/analysis/upload` — Upload an audio file for analysis (multipart/form-data, key: `audio`).

### Exercises (JWT required)
- `GET /api/exercises/` — List all exercises
- `GET /api/exercises/<id>` — Get details for a specific exercise
- `POST /api/exercises/complete` — Mark an exercise as completed

### Progress (JWT required)
- `GET /api/progress/` — Get user's progress data

### Community (JWT required)
- `GET /api/community/posts` — List community posts
- `POST /api/community/posts` — Create a new post

## Security Notes
- All user-specific endpoints require a valid JWT in the `Authorization: Bearer <token>` header.
- Passwords are securely hashed using Werkzeug.
- Password reset uses a short-lived JWT token (send via email in production).
- Input validation and error handling are implemented throughout.

## Project Structure
```
backend/
  app.py
  requirements.txt
  config.py
  models.py
  /ml/
    model.py
    utils.py
  /routes/
    analysis.py
    auth.py
    profile.py
    settings.py
    exercises.py
    progress.py
    community.py
  /uploads/
  /results/
```

## Example Usage

**Signup:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H 'Content-Type: application/json' \
  -d '{"name": "John", "email": "john@example.com", "password": "secret"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email": "john@example.com", "password": "secret"}'
```

**Get Profile (JWT required):**
```bash
curl -X GET http://localhost:5000/api/profile/ \
  -H 'Authorization: Bearer <your_token>'
```

---

For more, see the code and comments in each route file. 