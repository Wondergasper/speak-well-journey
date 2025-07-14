
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { settingsAPI } from '@/services/api';
import { Loader2 } from 'lucide-react';

const defaultSettings = {
  notifications: false,
  emailUpdates: false,
  accessibility: false,
  darkMode: false,
  theme: 'light',
};

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<any>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const data = await settingsAPI.getSettings();
        setSettings({ ...defaultSettings, ...data });
      } catch (err: any) {
        toast({
          title: 'Error',
          description: err?.data?.error || 'Failed to load settings.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
    // eslint-disable-next-line
  }, []);

  const handleChange = (key: string, value: any) => {
    setSettings((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await settingsAPI.updateSettings(settings);
      toast({
        title: 'Settings Saved',
        description: 'Your settings have been updated.',
        variant: 'success',
      });
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err?.data?.error || 'Failed to save settings.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <div className="max-w-xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Control your notification settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Push Notifications</span>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={v => handleChange('notifications', v)}
                  id="notifications-switch"
                  aria-label="Toggle push notifications"
                  disabled={loading || saving}
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Email Updates</span>
                <Switch
                  checked={settings.emailUpdates}
                  onCheckedChange={v => handleChange('emailUpdates', v)}
                  id="email-updates-switch"
                  aria-label="Toggle email updates"
                  disabled={loading || saving}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accessibility</CardTitle>
              <CardDescription>Enable enhanced accessibility options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Accessibility Features</span>
                <Switch
                  checked={settings.accessibility}
                  onCheckedChange={v => handleChange('accessibility', v)}
                  id="accessibility-switch"
                  aria-label="Toggle accessibility features"
                  disabled={loading || saving}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>Customize your app experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Dark Mode</span>
                <Switch
                  checked={settings.darkMode}
                  onCheckedChange={v => handleChange('darkMode', v)}
                  id="dark-mode-switch"
                  aria-label="Toggle dark mode"
                  disabled={loading || saving}
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Theme</span>
                <Select
                  value={settings.theme}
                  onValueChange={v => handleChange('theme', v)}
                  disabled={loading || saving}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              disabled={loading || saving}
              className="bg-therapy-purple-500 hover:bg-therapy-purple-700 min-w-[120px]"
              aria-label="Save settings"
            >
              {saving ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  Saving...
                </>
              ) : (
                'Save Settings'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
