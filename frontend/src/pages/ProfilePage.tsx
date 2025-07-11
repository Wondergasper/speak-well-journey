
import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { profileAPI } from '@/services/api';
import { Button } from '@/components/ui/button';

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<{ name: string; email: string } | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileAPI.getProfile();
        setProfile(data);
        setForm({ name: data.name, email: data.email });
      } catch (err) {
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const updated = await profileAPI.updateProfile(form);
      setProfile(updated);
      setEditMode(false);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            to="/dashboard" 
            className="text-gray-500 hover:text-therapy-purple-500 flex items-center"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
          </Link>
          
          <h1 className="text-3xl font-bold mt-4">Profile Settings</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Manage your account and preferences
          </p>
        </div>

        <div className="max-w-2xl">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            {error && <div className="text-red-500 mb-2">{error}</div>}
            {success && <div className="text-green-600 mb-2">{success}</div>}
            {!editMode ? (
              <>
                <div className="mb-4">
                  <div className="font-semibold">Name:</div>
                  <div>{profile?.name}</div>
                </div>
                <div className="mb-4">
                  <div className="font-semibold">Email:</div>
                  <div>{profile?.email}</div>
                </div>
                <Button onClick={() => setEditMode(true)} className="bg-therapy-purple-500 hover:bg-therapy-purple-700">Edit Profile</Button>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <label className="font-semibold block mb-1">Name</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full p-2 rounded border" />
                </div>
                <div className="mb-4">
                  <label className="font-semibold block mb-1">Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full p-2 rounded border" />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSave} disabled={saving} className="bg-therapy-purple-500 hover:bg-therapy-purple-700">{saving ? 'Saving...' : 'Save'}</Button>
                  <Button variant="outline" onClick={() => { setEditMode(false); setForm({ name: profile?.name || '', email: profile?.email || '' }); }}>Cancel</Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
