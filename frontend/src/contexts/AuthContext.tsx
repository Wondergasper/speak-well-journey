import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth as useAuthHook, useLogin, useSignup, useForgotPassword, useResetPassword } from '@/hooks/use-api';
import { User, LoginCredentials, SignupData, APIError } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get authentication state from React Query
  const { user, isAuthenticated, isLoading, error } = useAuthHook();
  
  // Mutations
  const loginMutation = useLogin();
  const signupMutation = useSignup();
  const forgotPasswordMutation = useForgotPassword();
  const resetPasswordMutation = useResetPassword();

  // Handle authentication errors
  useEffect(() => {
    if (error && error instanceof APIError && error.status === 401) {
      // Token expired or invalid, redirect to login
      navigate('/login');
      toast({
        variant: "destructive",
        title: "Session Expired",
        description: "Please log in again to continue.",
      });
    }
  }, [error, navigate, toast]);

  const login = async (credentials: LoginCredentials) => {
    try {
      await loginMutation.mutateAsync(credentials);
      toast({
        title: "Login successful!",
        description: "Welcome back to SpeakWell.",
      });
      navigate('/dashboard');
    } catch (error) {
      const message = error instanceof APIError 
        ? error.message 
        : 'Login failed. Please try again.';
      
      toast({
        variant: "destructive",
        title: "Login failed",
        description: message,
      });
      throw error;
    }
  };

  const signup = async (userData: SignupData) => {
    try {
      await signupMutation.mutateAsync(userData);
      toast({
        title: "Account created!",
        description: "Please log in with your new account.",
      });
      navigate('/login');
    } catch (error) {
      const message = error instanceof APIError 
        ? error.message 
        : 'Signup failed. Please try again.';
      
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: message,
      });
      throw error;
    }
  };

  const logout = () => {
    // Clear authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    
    navigate('/');
  };

  const forgotPassword = async (email: string) => {
    try {
      const result = await forgotPasswordMutation.mutateAsync(email);
      toast({
        title: "Reset email sent",
        description: result.reset_token 
          ? `Reset token: ${result.reset_token}` // For demo purposes
          : "Please check your email for reset instructions.",
      });
    } catch (error) {
      const message = error instanceof APIError 
        ? error.message 
        : 'Failed to send reset email. Please try again.';
      
      toast({
        variant: "destructive",
        title: "Reset failed",
        description: message,
      });
      throw error;
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      await resetPasswordMutation.mutateAsync({ token, newPassword });
      toast({
        title: "Password reset successful",
        description: "You can now log in with your new password.",
      });
      navigate('/login');
    } catch (error) {
      const message = error instanceof APIError 
        ? error.message 
        : 'Password reset failed. Please try again.';
      
      toast({
        variant: "destructive",
        title: "Reset failed",
        description: message,
      });
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 