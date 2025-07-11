import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mic, ArrowLeft, Mail, Lock, User, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { authAPI } from '@/services/api';

const SignupPage: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await authAPI.signup({ name, email, password });
      toast({
        title: 'Account created successfully!',
        description: 'Welcome to SpeakWell. Get ready for your speech assessment.',
      });
      navigate('/onboarding');
    } catch (error) {
      let message = 'Please check your information and try again.';
      if (error && typeof error === 'object' && 'message' in error) {
        message = (error as any).message;
      }
      toast({
        variant: 'destructive',
        title: 'Registration failed',
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-therapy-purple-100 via-white to-therapy-peach-100">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <Mic className="h-8 w-8 text-therapy-purple-500" />
            <span className="font-bold text-3xl text-therapy-purple-600">SpeakWell</span>
          </Link>
        </div>

        <Card className="w-full shadow-xl rounded-2xl border border-gray-100">
          <CardHeader className="text-center">
            <Link
              to="/"
              className="text-gray-500 hover:text-gray-700 flex items-center text-sm mb-2"
            >
              <ArrowLeft className="mr-1 h-4 w-4" /> Back
            </Link>
            <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
            <CardDescription className="text-sm text-gray-500 mt-2">
              Begin your journey to better speech today
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="pl-10"
                    required
                    minLength={8}
                  />
                </div>
                <p className="text-xs text-gray-500">Password must be at least 8 characters</p>
              </div>

              <Button
                type="submit"
                className="w-full bg-therapy-purple-500 hover:bg-therapy-purple-700 text-white rounded-md text-sm font-medium transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Creating account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-therapy-purple-600 font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
