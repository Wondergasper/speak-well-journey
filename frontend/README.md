# SpeakWell Journey - Frontend

A modern React TypeScript frontend for the AI-powered speech therapy application, built with shadcn/ui and Tailwind CSS.

## 🚀 Features

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Mode**: Toggle between themes with persistent preferences
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions

### 🔐 Authentication & User Management
- **JWT Authentication**: Secure login/logout with token management
- **Protected Routes**: Automatic redirection for unauthenticated users
- **User Profiles**: Editable user information and preferences
- **Session Management**: Persistent login state with automatic token refresh

### 🎤 Audio Recording & Analysis
- **Real-time Recording**: Built-in microphone support with visual feedback
- **Audio Visualization**: Waveform display during recording
- **File Upload**: Support for various audio formats (WAV, MP3, M4A, FLAC, OGG)
- **Analysis Results**: Detailed stuttering analysis with severity classification

### 📊 Progress Tracking
- **Interactive Charts**: Real-time progress visualization with Chart.js
- **Session History**: Complete record of practice sessions and improvements
- **Goal Setting**: Personalized therapy objectives with progress indicators
- **Statistics Dashboard**: Comprehensive analytics and insights

### 🏋️ Exercise Management
- **Severity-Based Filtering**: Exercises organized by stuttering severity
- **Evidence Levels**: A, B, C classification for exercise effectiveness
- **Interactive Sessions**: Guided exercise sessions with real-time feedback
- **Progress Tracking**: Track completion and improvement for each exercise

### 👥 Community Features
- **User Forums**: Community posts and discussions
- **Shared Experiences**: User stories and support networks
- **Anonymous Sharing**: Option to share progress anonymously

## 🛠️ Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context + React Query for server state
- **Routing**: React Router v6 with protected routes
- **Animations**: Framer Motion for smooth transitions
- **Charts**: Chart.js with React wrapper
- **Audio**: Web Audio API for recording and playback
- **HTTP Client**: Fetch API with custom error handling

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Backend server running (see backend README)

### Setup
```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables
Create a `.env` file in the frontend directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── AudioRecorder.tsx # Audio recording component
│   ├── Navbar.tsx       # Navigation component
│   ├── ProgressChart.tsx # Progress visualization
│   └── SeverityBadge.tsx # Severity indicator
├── pages/               # Application pages
│   ├── DashboardPage.tsx # Main dashboard
│   ├── LoginPage.tsx    # Authentication
│   ├── RecordPage.tsx   # Audio recording
│   ├── ResultsPage.tsx  # Analysis results
│   └── ExercisesPage.tsx # Exercise library
├── contexts/            # React contexts
│   ├── AuthContext.tsx  # Authentication state
│   └── ThemeProvider.tsx # Theme management
├── hooks/               # Custom React hooks
│   ├── use-api.ts       # API integration
│   └── use-mobile.tsx   # Mobile detection
├── services/            # API services
│   └── api.ts           # HTTP client and endpoints
├── lib/                 # Utility functions
│   └── utils.ts         # Common utilities
└── data/                # Static data
    └── exercises.ts     # Exercise definitions
```

## 🎯 Key Components

### AudioRecorder
- Real-time audio recording with visual feedback
- Waveform visualization during recording
- File format validation and error handling
- Automatic upload to backend for analysis

### ProgressChart
- Interactive charts showing fluency improvements
- Multiple chart types (line, bar, radar)
- Responsive design with mobile optimization
- Real-time data updates

### SeverityBadge
- Visual indicators for stuttering severity levels
- Color-coded badges (none, mild, moderate, severe)
- Consistent styling across the application

## 🔧 Development

### Available Scripts
```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format
```

### Code Style
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency
- **Prettier**: Automatic code formatting
- **Husky**: Pre-commit hooks for quality assurance

### Component Guidelines
- Use TypeScript interfaces for all props
- Implement proper error boundaries
- Follow accessibility best practices
- Use React Query for server state management
- Implement loading and error states

## 🧪 Testing

### Unit Tests
```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### E2E Tests
```bash
# Run end-to-end tests
npm run test:e2e

# Run specific test file
npm run test:e2e -- --spec cypress/e2e/login.cy.ts
```

## 🚀 Deployment

### Build for Production
```bash
# Create optimized build
npm run build

# Preview build locally
npm run preview
```

### Environment Configuration
Update environment variables for production:
```env
VITE_API_BASE_URL=https://your-backend-api.com/api
```

### Deployment Platforms
- **Vercel**: Zero-config deployment
- **Netlify**: Drag-and-drop deployment
- **AWS S3 + CloudFront**: Static hosting
- **GitHub Pages**: Free hosting for open source

## 🔒 Security

### Authentication
- JWT tokens stored securely in localStorage
- Automatic token refresh on expiration
- Protected routes with authentication guards
- Secure logout with token cleanup

### Data Protection
- Input validation on all forms
- XSS protection with proper escaping
- CORS configuration for API requests
- Secure file upload validation

## 📱 Mobile Support

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Touch-friendly interface elements
- Optimized audio recording for mobile devices
- Progressive Web App (PWA) capabilities

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎨 Theming

### Customization
- CSS custom properties for easy theming
- Dark/light mode support
- Custom color palette for brand consistency
- Responsive typography scale

### Component Library
- shadcn/ui components for consistency
- Custom component variants
- Accessibility-focused design
- Internationalization ready

## 📚 API Integration

### Service Layer
- Centralized API client in `services/api.ts`
- Automatic error handling and retry logic
- Request/response interceptors
- Type-safe API calls with TypeScript

### Endpoints
- Authentication (login, signup, logout)
- Audio analysis (upload, results, history)
- User management (profile, settings)
- Exercises (list, details, completion)
- Progress tracking (history, statistics)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Add JSDoc comments for complex functions
- Maintain component documentation
- Update tests for new features

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ for the speech therapy community**
