
import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Calendar, 
  Target, 
  Trophy, 
  Settings, 
  Shield, 
  Bell, 
  Edit3, 
  Camera,
  Save,
  X,
  CheckCircle,
  Star,
  TrendingUp,
  Activity,
  Award,
  BookOpen,
  Clock,
  Heart,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { profileAPI } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProfileData {
  name: string;
  email: string;
  joinDate?: string;
  avatar?: string;
  bio?: string;
  age?: number;
  severity?: string;
  goals?: string[];
  preferences?: {
    notifications: boolean;
    emailUpdates: boolean;
    darkMode: boolean;
    accessibility: boolean;
  };
  stats?: {
    totalSessions: number;
    totalMinutes: number;
    currentStreak: number;
    longestStreak: number;
    exercisesCompleted: number;
    improvementScore: number;
  };
  achievements?: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    unlocked: boolean;
    date?: string;
  }>;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [form, setForm] = useState({
    name: '',
    email: '',
    bio: '',
    age: '',
    severity: '',
    goals: [] as string[]
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Mock data for demonstration - replace with actual API calls
  const mockProfile: ProfileData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: '2024-01-15',
    avatar: '',
    bio: 'Dedicated to improving my speech fluency through consistent practice and therapy.',
    age: 28,
    severity: 'moderate',
    goals: ['Reduce stuttering frequency', 'Improve confidence in public speaking', 'Master breathing techniques'],
    preferences: {
      notifications: true,
      emailUpdates: false,
      darkMode: true,
      accessibility: true
    },
    stats: {
      totalSessions: 47,
      totalMinutes: 1240,
      currentStreak: 12,
      longestStreak: 21,
      exercisesCompleted: 156,
      improvementScore: 78
    },
    achievements: [
      {
        id: '1',
        title: 'First Steps',
        description: 'Completed your first speech therapy session',
        icon: '🎯',
        unlocked: true,
        date: '2024-01-16'
      },
      {
        id: '2',
        title: 'Week Warrior',
        description: 'Maintained a 7-day practice streak',
        icon: '🔥',
        unlocked: true,
        date: '2024-01-23'
      },
      {
        id: '3',
        title: 'Breathing Master',
        description: 'Completed 50 breathing exercises',
        icon: '🫁',
        unlocked: true,
        date: '2024-02-01'
      },
      {
        id: '4',
        title: 'Confidence Builder',
        description: 'Achieved 80% improvement score',
        icon: '⭐',
        unlocked: false
      },
      {
        id: '5',
        title: 'Consistency King',
        description: 'Maintained a 30-day practice streak',
        icon: '👑',
        unlocked: false
      }
    ]
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Replace with actual API call
        // const data = await profileAPI.getProfile();
        const data = mockProfile;
        setProfile(data);
        setForm({
          name: data.name,
          email: data.email,
          bio: data.bio || '',
          age: data.age?.toString() || '',
          severity: data.severity || '',
          goals: data.goals || []
        });
      } catch (err) {
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      // Replace with actual API call
      // const updated = await profileAPI.updateProfile(form);
      const updated = { ...profile, ...form };
      setProfile(updated);
      setEditMode(false);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handlePreferenceChange = (key: string, value: boolean) => {
    if (profile) {
      setProfile({
        ...profile,
        preferences: {
          ...profile.preferences!,
          [key]: value
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-therapy-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      
      {/* Cover Image */}
      <div className="relative h-48 bg-gradient-to-r from-therapy-purple-500 to-blue-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 py-8 relative z-10">
          <Link 
            to="/dashboard" 
            className="text-white/80 hover:text-white flex items-center mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-20">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-white dark:border-gray-700 shadow-lg">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-therapy-purple-500 to-blue-600 text-white">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{profile.name}</h1>
                  <p className="text-gray-600 dark:text-gray-300 flex items-center mt-1">
                    <Mail className="h-4 w-4 mr-2" />
                    {profile.email}
                  </p>
                  {profile.joinDate && (
                    <p className="text-gray-500 dark:text-gray-400 flex items-center mt-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      Member since {new Date(profile.joinDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={() => setEditMode(true)} 
                    className="bg-therapy-purple-500 hover:bg-therapy-purple-700"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </div>

              {profile.bio && (
                <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl">
                  {profile.bio}
                </p>
              )}

              {profile.severity && (
                <div className="mt-4">
                  <Badge variant="secondary" className="bg-therapy-purple-100 text-therapy-purple-800 dark:bg-therapy-purple-900 dark:text-therapy-purple-200">
                    {profile.severity.charAt(0).toUpperCase() + profile.severity.slice(1)} Severity
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: User },
            { id: 'achievements', label: 'Achievements', icon: Trophy },
            { id: 'progress', label: 'Progress', icon: TrendingUp },
            { id: 'settings', label: 'Settings', icon: Settings },
            { id: 'security', label: 'Security', icon: Shield }
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              onClick={() => setActiveTab(tab.id)}
              className={activeTab === tab.id ? "bg-therapy-purple-500 hover:bg-therapy-purple-700" : ""}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {activeTab === 'overview' && (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100">Total Sessions</p>
                          <p className="text-3xl font-bold">{profile.stats?.totalSessions || 0}</p>
                        </div>
                        <Activity className="h-8 w-8 text-blue-200" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100">Current Streak</p>
                          <p className="text-3xl font-bold">{profile.stats?.currentStreak || 0} days</p>
                        </div>
                        <Zap className="h-8 w-8 text-green-200" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100">Improvement</p>
                          <p className="text-3xl font-bold">{profile.stats?.improvementScore || 0}%</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-purple-200" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Goals Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="h-5 w-5 mr-2" />
                      Your Goals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {profile.goals?.map((goal, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-gray-700 dark:text-gray-300">{goal}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600 dark:text-gray-300">Completed breathing exercise session</span>
                        <span className="text-gray-400 text-sm ml-auto">2 hours ago</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-600 dark:text-gray-300">Achieved new personal best in fluency</span>
                        <span className="text-gray-400 text-sm ml-auto">1 day ago</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                        <span className="text-gray-600 dark:text-gray-300">Started 7-day challenge</span>
                        <span className="text-gray-400 text-sm ml-auto">3 days ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {activeTab === 'achievements' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="h-5 w-5 mr-2" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profile.achievements?.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`p-4 rounded-lg border-2 ${
                          achievement.unlocked
                            ? 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800'
                            : 'border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`text-2xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className={`font-semibold ${
                              achievement.unlocked ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                            }`}>
                              {achievement.title}
                            </h3>
                            <p className={`text-sm ${
                              achievement.unlocked ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'
                            }`}>
                              {achievement.description}
                            </p>
                            {achievement.unlocked && achievement.date && (
                              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                                Unlocked {new Date(achievement.date).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'progress' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Progress Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Fluency Improvement</span>
                          <span className="text-sm text-gray-500">{profile.stats?.improvementScore || 0}%</span>
                        </div>
                        <Progress value={profile.stats?.improvementScore || 0} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Practice Consistency</span>
                          <span className="text-sm text-gray-500">{profile.stats?.currentStreak || 0} days</span>
                        </div>
                        <Progress value={(profile.stats?.currentStreak || 0) / 30 * 100} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Exercise Completion</span>
                          <span className="text-sm text-gray-500">{profile.stats?.exercisesCompleted || 0} exercises</span>
                        </div>
                        <Progress value={Math.min((profile.stats?.exercisesCompleted || 0) / 200 * 100, 100)} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-2xl font-bold text-therapy-purple-600">{profile.stats?.totalMinutes || 0}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Total Minutes</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-2xl font-bold text-therapy-purple-600">{profile.stats?.longestStreak || 0}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Longest Streak</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'settings' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notifications">Push Notifications</Label>
                        <p className="text-sm text-gray-500">Receive reminders for practice sessions</p>
                      </div>
                      <Switch
                        id="notifications"
                        checked={profile.preferences?.notifications}
                        onCheckedChange={(checked) => handlePreferenceChange('notifications', checked)}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailUpdates">Email Updates</Label>
                        <p className="text-sm text-gray-500">Receive weekly progress reports</p>
                      </div>
                      <Switch
                        id="emailUpdates"
                        checked={profile.preferences?.emailUpdates}
                        onCheckedChange={(checked) => handlePreferenceChange('emailUpdates', checked)}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="accessibility">Accessibility Features</Label>
                        <p className="text-sm text-gray-500">Enable enhanced accessibility options</p>
                      </div>
                      <Switch
                        id="accessibility"
                        checked={profile.preferences?.accessibility}
                        onCheckedChange={(checked) => handlePreferenceChange('accessibility', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'security' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">Change Password</h3>
                      <div className="space-y-3">
                        <Input type="password" placeholder="Current Password" />
                        <Input type="password" placeholder="New Password" />
                        <Input type="password" placeholder="Confirm New Password" />
                        <Button className="bg-therapy-purple-500 hover:bg-therapy-purple-700">
                          Update Password
                        </Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-semibold mb-3">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        Add an extra layer of security to your account
                      </p>
                      <Button variant="outline">Enable 2FA</Button>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-semibold mb-3">Account Deletion</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        Permanently delete your account and all associated data
                      </p>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Sessions This Week</span>
                    <span className="font-semibold">5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Average Score</span>
                    <span className="font-semibold">8.2/10</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Next Goal</span>
                    <span className="font-semibold text-therapy-purple-600">30-day streak</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {profile.achievements?.filter(a => a.unlocked).slice(0, 3).map((achievement) => (
                    <div key={achievement.id} className="flex items-center gap-3 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="text-lg">{achievement.icon}</span>
                      <div>
                        <p className="font-medium text-sm">{achievement.title}</p>
                        <p className="text-xs text-gray-500">{achievement.date && new Date(achievement.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button asChild className="w-full justify-start" variant="outline">
                    <Link to="/record">
                      <Activity className="h-4 w-4 mr-2" />
                      Start Session
                    </Link>
                  </Button>
                  <Button asChild className="w-full justify-start" variant="outline">
                    <Link to="/exercises">
                      <BookOpen className="h-4 w-4 mr-2" />
                      View Exercises
                    </Link>
                  </Button>
                  <Button asChild className="w-full justify-start" variant="outline">
                    <Link to="/progress">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      View Progress
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {editMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Edit Profile</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setEditMode(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {error && <div className="text-red-500 mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">{error}</div>}
            {success && <div className="text-green-600 mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">{success}</div>}

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="Age"
                  />
                </div>

                <div>
                  <Label htmlFor="severity">Severity Level</Label>
                  <Select value={form.severity} onValueChange={(value) => setForm({...form, severity: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mild">Mild</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="severe">Severe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-therapy-purple-500 hover:bg-therapy-purple-700 flex-1"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditMode(false);
                    setForm({
                      name: profile.name,
                      email: profile.email,
                      bio: profile.bio || '',
                      age: profile.age?.toString() || '',
                      severity: profile.severity || '',
                      goals: profile.goals || []
                    });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
