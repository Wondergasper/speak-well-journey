import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mic, ArrowLeft, Mail, Lock, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { authAPI } from '@/services/api';

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await authAPI.login({ email, password });
      toast({
        title: "Login successful!",
        description: "Welcome back to SpeakWell.",
      });
      navigate('/dashboard');
    } catch (error) {
      let message = 'Invalid email or password.';
      if (error && typeof error === 'object' && 'message' in error) {
        message = (error as any).message;
      }
      toast({
        variant: "destructive",
        title: "Login failed",
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-therapy-blue-50 via-therapy-purple-100 to-white">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <Mic className="h-8 w-8 text-therapy-purple-500" />
            <span className="font-bold text-2xl text-therapy-purple-500">SpeakWell</span>
          </Link>
        </div>

        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Link 
                to="/" 
                className="text-gray-500 hover:text-gray-700 flex items-center text-sm"
              >
                <ArrowLeft className="mr-1 h-4 w-4" /> Back
              </Link>
            </div>
            <CardTitle className="text-2xl font-bold mt-3">Welcome back</CardTitle>
            <CardDescription>
              Sign in to continue your speech therapy journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="you@example.com" 
                    className="pl-10" 
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-therapy-purple-500 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Enter your password" 
                    className="pl-10" 
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-therapy-purple-500 hover:bg-therapy-purple-700"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              
              
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-therapy-purple-500 font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
