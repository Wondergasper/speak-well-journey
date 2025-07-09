import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  authAPI, 
  analysisAPI, 
  exercisesAPI, 
  progressAPI, 
  communityAPI, 
  profileAPI, 
  settingsAPI,
  type LoginCredentials,
  type SignupData,
  type AnalysisResult,
  type Exercise,
  type CommunityPost,
  type CreatePostData,
  type User,
  APIError
} from '@/services/api';

// Query Keys
export const queryKeys = {
  user: ['user'] as const,
  exercises: ['exercises'] as const,
  exercise: (id: number) => ['exercise', id] as const,
  progress: ['progress'] as const,
  communityPosts: ['community', 'posts'] as const,
  profile: ['profile'] as const,
  settings: ['settings'] as const,
};

// Authentication Hooks
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      // Update user data in cache
      queryClient.setQueryData(queryKeys.user, data.user);
    },
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: authAPI.signup,
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: string) => authAPI.forgotPassword(email),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ token, newPassword }: { token: string; newPassword: string }) =>
      authAPI.resetPassword(token, newPassword),
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return () => {
    authAPI.logout();
    // Clear all cached data
    queryClient.clear();
  };
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: queryKeys.user,
    queryFn: () => {
      const user = authAPI.getCurrentUser();
      if (!user) {
        throw new APIError('User not authenticated', 401);
      }
      return user;
    },
    enabled: authAPI.isAuthenticated(),
  });
};

// Analysis Hooks
export const useAudioAnalysis = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: analysisAPI.uploadAudio,
    onSuccess: (data) => {
      // Invalidate progress data to refresh charts
      queryClient.invalidateQueries({ queryKey: queryKeys.progress });
    },
  });
};

// Exercises Hooks
export const useExercises = () => {
  return useQuery({
    queryKey: queryKeys.exercises,
    queryFn: exercisesAPI.getAll,
  });
};

export const useExercise = (id: number) => {
  return useQuery({
    queryKey: queryKeys.exercise(id),
    queryFn: () => exercisesAPI.getById(id),
    enabled: !!id,
  });
};

export const useCompleteExercise = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: exercisesAPI.complete,
    onSuccess: () => {
      // Invalidate progress data to refresh charts
      queryClient.invalidateQueries({ queryKey: queryKeys.progress });
    },
  });
};

// Progress Hooks
export const useProgress = () => {
  return useQuery({
    queryKey: queryKeys.progress,
    queryFn: progressAPI.getHistory,
  });
};

export const useAddProgressEntry = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: progressAPI.addEntry,
    onSuccess: () => {
      // Invalidate progress data to refresh charts
      queryClient.invalidateQueries({ queryKey: queryKeys.progress });
    },
  });
};

// Community Hooks
export const useCommunityPosts = () => {
  return useQuery({
    queryKey: queryKeys.communityPosts,
    queryFn: communityAPI.getPosts,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: communityAPI.createPost,
    onSuccess: () => {
      // Invalidate posts to refresh the list
      queryClient.invalidateQueries({ queryKey: queryKeys.communityPosts });
    },
  });
};

// Profile Hooks
export const useProfile = () => {
  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: profileAPI.getProfile,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: profileAPI.updateProfile,
    onSuccess: (updatedUser) => {
      // Update both profile and user data
      queryClient.setQueryData(queryKeys.profile, updatedUser);
      queryClient.setQueryData(queryKeys.user, updatedUser);
    },
  });
};

// Settings Hooks
export const useSettings = () => {
  return useQuery({
    queryKey: queryKeys.settings,
    queryFn: settingsAPI.getSettings,
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: settingsAPI.updateSettings,
    onSuccess: () => {
      // Invalidate settings to refresh
      queryClient.invalidateQueries({ queryKey: queryKeys.settings });
    },
  });
};

// Utility hook for authentication state
export const useAuth = () => {
  const { data: user, isLoading, error } = useCurrentUser();
  
  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
    logout: useLogout(),
  };
};

// Export all hooks
export const apiHooks = {
  // Auth
  useLogin,
  useSignup,
  useForgotPassword,
  useResetPassword,
  useLogout,
  useCurrentUser,
  useAuth,
  
  // Analysis
  useAudioAnalysis,
  
  // Exercises
  useExercises,
  useExercise,
  useCompleteExercise,
  
  // Progress
  useProgress,
  useAddProgressEntry,
  
  // Community
  useCommunityPosts,
  useCreatePost,
  
  // Profile
  useProfile,
  useUpdateProfile,
  
  // Settings
  useSettings,
  useUpdateSettings,
};

export default apiHooks; 