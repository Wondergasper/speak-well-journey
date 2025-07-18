// API Base Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Types for API requests and responses
export interface User {
  id: number;
  name: string;
  email: string;
  severity?: 'none' | 'mild' | 'moderate' | 'severe';
  age?: number;
  bio?: string;
  therapy_goals?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface AnalysisResult {
  severity: 'none' | 'mild' | 'moderate' | 'severe';
  score: number;
  details: {
    repetitions: { count: number; examples: string[] };
    blocks: { count: number; examples: string[] };
    prolongations: { count: number; examples: string[] };
  };
  recommendations: string[];
  exercises: Exercise[];
}

export interface Exercise {
  id: number;
  title: string;
  severity: 'none' | 'mild' | 'moderate' | 'severe';
  description?: string;
  instructions?: string;
  duration_minutes?: number;
  category?: string;
  evidence_level?: 'A' | 'B' | 'C';
  target_skills?: string;
  prerequisites?: string;
  progress_indicators?: string;
}

export interface ProgressEntry {
  date: string;
  score: number;
  fluency_rating?: number;
  confidence_rating?: number;
}

export interface CommunityPost {
  id: number;
  author: string;
  content: string;
  created_at: string;
}

export interface CreatePostData {
  content: string;
}

// API Error handling
export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// Utility function for API calls
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Get token from localStorage
  const token = localStorage.getItem('authToken');
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new APIError(
        errorData.error || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData
      );
    }

    // Handle empty responses
    if (response.status === 204) {
      return {} as T;
    }

    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(
      error instanceof Error ? error.message : 'Network error',
      0
    );
  }
}

// Authentication API
export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiCall<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    // Store token in localStorage
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    return response;
  },

  signup: async (userData: SignupData): Promise<{ message: string }> => {
    return await apiCall<{ message: string }>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  forgotPassword: async (email: string): Promise<{ message: string; reset_token?: string }> => {
    return await apiCall<{ message: string; reset_token?: string }>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  resetPassword: async (token: string, newPassword: string): Promise<{ message: string }> => {
    return await apiCall<{ message: string }>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, new_password: newPassword }),
    });
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('authToken');
  },

  changePassword: async (current_password: string, new_password: string): Promise<any> => {
    return await apiCall('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ current_password, new_password }),
    });
  },
};

// Analysis API
export const analysisAPI = {
  uploadAudio: async (audioBlob: Blob): Promise<{ message: string; analysis_id: number }> => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.wav');

    const url = `${API_BASE_URL}/analysis/upload`;
    const token = localStorage.getItem('authToken');
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new APIError(
        errorData.error || `Upload failed: ${response.statusText}`,
        response.status,
        errorData
      );
    }

    return await response.json();
  },

  getResults: async (analysisId: number): Promise<AnalysisResult> => {
    return await apiCall<AnalysisResult>(`/analysis/results/${analysisId}`);
  },

  getHistory: async (): Promise<{ results: any[] }> => {
    return await apiCall<{ results: any[] }>('/analysis/history');
  },
};

// Exercises API
export const exercisesAPI = {
  getAll: async (filters?: {
    severity?: string;
    category?: string;
  }): Promise<Exercise[]> => {
    const params = new URLSearchParams();
    if (filters?.severity) params.append('severity', filters.severity);
    if (filters?.category) params.append('category', filters.category);
    
    const queryString = params.toString();
    const endpoint = queryString ? `/exercises?${queryString}` : '/exercises';
    return await apiCall<Exercise[]>(endpoint);
  },

  getById: async (id: number): Promise<Exercise> => {
    return await apiCall<Exercise>(`/exercises/${id}`);
  },

  getRecommended: async (severity?: string): Promise<Exercise[]> => {
    const params = new URLSearchParams();
    if (severity) params.append('severity', severity);
    
    const queryString = params.toString();
    const endpoint = queryString ? `/exercises/recommended?${queryString}` : '/exercises/recommended';
    return await apiCall<Exercise[]>(endpoint);
  },

  startExercise: async (exerciseId: number): Promise<{ message: string; exercise: any; user_id: number }> => {
    return await apiCall<{ message: string; exercise: any; user_id: number }>(`/exercises/${exerciseId}/start`, {
      method: 'POST',
    });
  },

  completeExercise: async (
    exerciseId: number, 
    data: {
      score?: number;
      duration?: number;
      fluency_rating?: number;
      confidence_rating?: number;
      notes?: string;
    }
  ): Promise<{ message: string; progress_id: number; exercise: any }> => {
    return await apiCall<{ message: string; progress_id: number; exercise: any }>(`/exercises/${exerciseId}/complete`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Progress API
export const progressAPI = {
  getHistory: async (): Promise<{ history: ProgressEntry[] }> => {
    return await apiCall<{ history: ProgressEntry[] }>('/progress');
  },

  // Add new progress entry (if backend supports it)
  addEntry: async (score: number): Promise<{ message: string }> => {
    return await apiCall<{ message: string }>('/progress', {
      method: 'POST',
      body: JSON.stringify({ score, date: new Date().toISOString() }),
    });
  },
};

// Community API
export const communityAPI = {
  getPosts: async (): Promise<CommunityPost[]> => {
    return await apiCall<CommunityPost[]>('/community/posts');
  },

  createPost: async (postData: CreatePostData): Promise<CommunityPost> => {
    return await apiCall<CommunityPost>('/community/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  },
};

// Profile API (assuming these endpoints exist)
export const profileAPI = {
  getProfile: async (): Promise<User> => {
    return await apiCall<User>('/profile');
  },

  updateProfile: async (userData: Partial<User>): Promise<User> => {
    return await apiCall<User>('/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  getPreferences: async (): Promise<any> => {
    return await apiCall('/profile/preferences', { method: 'GET' });
  },
  updatePreferences: async (prefs: any): Promise<any> => {
    return await apiCall('/profile/preferences', {
      method: 'PUT',
      body: JSON.stringify(prefs),
    });
  },
};

// Settings API (assuming these endpoints exist)
export const settingsAPI = {
  getSettings: async (): Promise<any> => {
    return await apiCall<any>('/settings');
  },

  updateSettings: async (settings: any): Promise<any> => {
    return await apiCall<any>('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  },
};

// Notifications API
export const notificationsAPI = {
  getAll: async (): Promise<any[]> => {
    return await apiCall<any[]>('/notifications');
  },
  create: async (message: string): Promise<any> => {
    return await apiCall<any>('/notifications', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  },
  markAsRead: async (id: number): Promise<any> => {
    return await apiCall<any>(`/notifications/${id}/read`, {
      method: 'PUT',
    });
  },
};

// Onboarding API
export const onboardingAPI = {
  save: async (data: any) => {
    return await apiCall('/onboarding', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

export const userAPI = {
  deleteAccount: async (): Promise<any> => {
    return await apiCall('/user/account', { method: 'DELETE' });
  },
};

// Analytics API
export const analyticsAPI = {
  getDashboard: async (): Promise<any> => {
    return await apiCall<any>('/analytics/dashboard');
  },
};

// Export all APIs
export const api = {
  auth: authAPI,
  analysis: analysisAPI,
  exercises: exercisesAPI,
  progress: progressAPI,
  community: communityAPI,
  profile: profileAPI,
  settings: settingsAPI,
  notifications: notificationsAPI,
  onboarding: onboardingAPI,
  user: userAPI,
  analytics: analyticsAPI,
};

export default api; 