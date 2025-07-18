
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
import { profileAPI, progressAPI, authAPI, userAPI } from '@/services/api';
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
  severity?: 'none' | 'mild' | 'moderate' | 'severe';
  therapy_goals?: string;
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
    therapy_goals: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  // Mock data for demonstration - replace with actual API calls
  useEffect(() => {
    const fetchProfileAndActivity = async () => {
      try {
        const data = await profileAPI.getProfile();
        setProfile(data);
        setForm({
          name: data.name,
          email: data.email,
          bio: data.bio || '',
          age: data.age?.toString() || '',
          severity: data.severity || '',
          therapy_goals: data.therapy_goals || ''
        });
        // Fetch recent activity (last 5 progress entries)
        const progress = await progressAPI.getHistory();
        setRecentActivity((progress.history || []).slice(-5).reverse());
      } catch (err) {
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfileAndActivity();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const updated = await profileAPI.updateProfile({
        name: form.name,
        email: form.email,
        bio: form.bio,
        age: form.age ? parseInt(form.age) : undefined,
        severity: form.severity as 'none' | 'mild' | 'moderate' | 'severe',
        therapy_goals: form.therapy_goals
      });
      setProfile(updated);
      setEditMode(false);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handlePreferenceChange = async (key: string, value: boolean) => {
    if (profile) {
      const updatedPreferences = {
        ...profile.preferences!,
        [key]: value
      };
      try {
        await profileAPI.updatePreferences(updatedPreferences);
        setProfile({
          ...profile,
          preferences: updatedPreferences
        });
      } catch (err) {
        setError('Failed to update preferences.');
      }
    }
  };

  const handleChangePassword = async () => {
    setPasswordError(null);
    setPasswordSuccess(null);
    if (!passwordForm.current || !passwordForm.new || !passwordForm.confirm) {
      setPasswordError('All fields are required.');
      return;
    }
    if (passwordForm.new !== passwordForm.confirm) {
      setPasswordError('New passwords do not match.');
      return;
    }
    try {
      await authAPI.changePassword(passwordForm.current, passwordForm.new);
      setPasswordSuccess('Password updated successfully!');
      setPasswordForm({ current: '', new: '', confirm: '' });
    } catch (err: any) {
      setPasswordError(err?.data?.error || 'Failed to update password.');
    }
  };
  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) return;
    try {
      await userAPI.deleteAccount();
      authAPI.logout();
      window.location.href = '/signup';
    } catch (err: any) {
      alert(err?.data?.error || 'Failed to delete account.');
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
                      {profile.therapy_goals && (
                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-gray-700 dark:text-gray-300">{profile.therapy_goals}</span>
                        </div>
                      )}
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
                      {recentActivity.length === 0 ? (
                        <div className="text-gray-500">No recent activity.</div>
                      ) : (
                        recentActivity.map((entry, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-600 dark:text-gray-300">
                              Completed exercise (score: {entry.score})
                            </span>
                            <span className="text-gray-400 text-sm ml-auto">
                              {new Date(entry.date).toLocaleString()}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </>
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
                        {passwordError && <div className="text-red-500 bg-red-50 dark:bg-red-900/20 p-2 rounded">{passwordError}</div>}
                        {passwordSuccess && <div className="text-green-600 bg-green-50 dark:bg-green-900/20 p-2 rounded">{passwordSuccess}</div>}
                        <Input type="password" placeholder="Current Password" id="currentPassword" value={passwordForm.current} onChange={e => setPasswordForm(f => ({ ...f, current: e.target.value }))} />
                        <Input type="password" placeholder="New Password" id="newPassword" value={passwordForm.new} onChange={e => setPasswordForm(f => ({ ...f, new: e.target.value }))} />
                        <Input type="password" placeholder="Confirm New Password" id="confirmNewPassword" value={passwordForm.confirm} onChange={e => setPasswordForm(f => ({ ...f, confirm: e.target.value }))} />
                        <Button className="bg-therapy-purple-500 hover:bg-therapy-purple-700" onClick={handleChangePassword}>
                          Update Password
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-semibold mb-3">Account Deletion</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        Permanently delete your account and all associated data
                      </p>
                      <Button variant="destructive" onClick={handleDeleteAccount}>Delete Account</Button>
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
                    <span className="font-semibold">{profile.stats?.totalSessions || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Average Score</span>
                    <span className="font-semibold">{profile.stats?.improvementScore || 0}/100</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Next Goal</span>
                    <span className="font-semibold text-therapy-purple-600">{profile.stats?.currentStreak || 0}-day streak</span>
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
                  {/* This section is no longer needed as achievements are removed */}
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
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="mild">Mild</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="severe">Severe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="therapy_goals">Your Therapy Goals</Label>
                <Textarea
                  id="therapy_goals"
                  name="therapy_goals"
                  value={form.therapy_goals}
                  onChange={handleChange}
                  placeholder="Write down your therapy goals..."
                  rows={3}
                />
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
                      therapy_goals: profile.therapy_goals || ''
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
