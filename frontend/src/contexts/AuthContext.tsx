import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '@/services/api';
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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const userStr = localStorage.getItem('user');
      
      if (token && userStr) {
        try {
          const userData = JSON.parse(userStr);
          setUser(userData);
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      const response = await authAPI.login(credentials);
      setUser(response.user);
      
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
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: SignupData) => {
    try {
      setIsLoading(true);
      await authAPI.signup(userData);
      
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
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    
    navigate('/');
  };

  const forgotPassword = async (email: string) => {
    try {
      setIsLoading(true);
      const result = await authAPI.forgotPassword(email);
      
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
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      setIsLoading(true);
      await authAPI.resetPassword(token, newPassword);
      
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
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
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