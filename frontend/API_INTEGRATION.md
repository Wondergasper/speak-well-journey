# API Integration Documentation

## Overview

The frontend now has a complete API service layer that connects to all backend endpoints. This replaces the mock data with real API calls and provides proper authentication, error handling, and data management.

## Architecture

### 1. API Service Layer (`src/services/api.ts`)

**Features:**
- TypeScript interfaces for all API requests/responses
- Centralized error handling with custom `APIError` class
- Automatic JWT token management
- File upload support for audio analysis
- Environment-based configuration

**Key Components:**
- `authAPI` - Authentication endpoints (login, signup, password reset)
- `analysisAPI` - Audio upload and analysis
- `exercisesAPI` - Exercise management
- `progressAPI` - Progress tracking
- `communityAPI` - Community features
- `profileAPI` - User profile management
- `settingsAPI` - User settings

### 2. React Query Hooks (`src/hooks/use-api.ts`)

**Features:**
- Automatic caching and background updates
- Optimistic updates for better UX
- Error handling and retry logic
- Loading states management
- Query invalidation for data consistency

**Available Hooks:**
- `useLogin()`, `useSignup()`, `useForgotPassword()` - Authentication
- `useAudioAnalysis()` - Audio upload and analysis
- `useExercises()`, `useExercise()`, `useCompleteExercise()` - Exercises
- `useProgress()`, `useAddProgressEntry()` - Progress tracking
- `useCommunityPosts()`, `useCreatePost()` - Community features
- `useProfile()`, `useUpdateProfile()` - Profile management
- `useSettings()`, `useUpdateSettings()` - Settings management

### 3. Authentication Context (`src/contexts/AuthContext.tsx`)

**Features:**
- Global authentication state management
- Automatic token storage and retrieval
- Session expiration handling
- Navigation integration
- Toast notifications for auth events

### 4. Protected Routes (`src/components/ProtectedRoute.tsx`)

**Features:**
- Route protection based on authentication status
- Loading states during auth checks
- Automatic redirect to login for unauthenticated users
- Preserves intended destination after login

## Environment Configuration

Create a `.env` file in the frontend directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api

# Development Settings
VITE_APP_NAME=SpeakWell
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG_MODE=true
```

## Usage Examples

### Authentication

```typescript
import { useAuth } from '@/contexts/AuthContext';

const MyComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  const handleLogin = async () => {
    try {
      await login({ email: 'user@example.com', password: 'password' });
      // User will be automatically redirected to dashboard
    } catch (error) {
      // Error handling is done in AuthContext
    }
  };
};
```

### Audio Analysis

```typescript
import { useAudioAnalysis } from '@/hooks/use-api';

const RecordPage = () => {
  const audioAnalysisMutation = useAudioAnalysis();
  
  const handleRecordingComplete = async (audioBlob: Blob) => {
    try {
      const result = await audioAnalysisMutation.mutateAsync(audioBlob);
      // Handle successful analysis
    } catch (error) {
      // Handle error
    }
  };
};
```

### Data Fetching

```typescript
import { useExercises, useProgress } from '@/hooks/use-api';

const DashboardPage = () => {
  const { data: exercises, isLoading: exercisesLoading } = useExercises();
  const { data: progress, isLoading: progressLoading } = useProgress();
  
  if (exercisesLoading || progressLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      {/* Render data */}
    </div>
  );
};
```

## Error Handling

The API layer provides comprehensive error handling:

```typescript
import { APIError } from '@/services/api';

try {
  await api.auth.login(credentials);
} catch (error) {
  if (error instanceof APIError) {
    console.log('Status:', error.status);
    console.log('Message:', error.message);
    console.log('Data:', error.data);
  }
}
```

## Authentication Flow

1. **Login**: User submits credentials → API call → JWT token stored → User redirected to dashboard
2. **Protected Routes**: Check authentication → Show loading → Redirect to login if not authenticated
3. **API Calls**: Automatic token inclusion in headers
4. **Session Expiry**: Automatic redirect to login with toast notification
5. **Logout**: Clear tokens → Clear cache → Redirect to home

## Data Flow

1. **React Query**: Manages server state with caching and background updates
2. **API Service**: Handles HTTP requests and response parsing
3. **Context**: Provides global state and authentication
4. **Components**: Use hooks to access data and trigger mutations

## Backend Integration Status

| Feature | Backend | Frontend | Integration | Status |
|---------|---------|----------|-------------|--------|
| Authentication | ✅ | ✅ | ✅ | Complete |
| Audio Analysis | ✅ | ✅ | ✅ | Complete |
| Exercises | ✅ | ✅ | ✅ | Complete |
| Progress Tracking | ✅ | ✅ | ✅ | Complete |
| Community | ✅ | ✅ | ✅ | Complete |
| Profile | ⚠️ | ✅ | ⚠️ | Partial |
| Settings | ⚠️ | ✅ | ⚠️ | Partial |

## Next Steps

1. **Complete Backend Endpoints**: Implement missing profile and settings endpoints
2. **Add Real-time Features**: WebSocket integration for live updates
3. **Enhance Error Handling**: More specific error messages and recovery
4. **Add Offline Support**: Service worker for offline functionality
5. **Performance Optimization**: Implement pagination and infinite scrolling

## Testing

To test the integration:

1. Start the backend server: `cd backend && python app.py`
2. Start the frontend: `cd frontend && npm run dev`
3. Create an account and test all features
4. Check browser network tab for API calls
5. Verify authentication flow and protected routes

## Troubleshooting

**Common Issues:**

1. **CORS Errors**: Ensure backend has CORS configured properly
2. **Authentication Failures**: Check JWT token format and expiration
3. **File Upload Issues**: Verify multipart/form-data handling
4. **Network Errors**: Check API base URL configuration

**Debug Mode:**
Set `VITE_ENABLE_DEBUG_MODE=true` to see detailed API logs in console. 