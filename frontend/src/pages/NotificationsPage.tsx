import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { notificationsAPI } from '@/services/api';
import { Button } from '@/components/ui/button';

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await notificationsAPI.getAll();
        setNotifications(data);
      } catch (err) {
        setError('Failed to load notifications.');
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id: number) => {
    try {
      await notificationsAPI.markAsRead(id);
      setNotifications((prev) => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (err) {
      alert('Failed to mark as read');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Notifications</h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : notifications.length === 0 ? (
          <div>No notifications.</div>
        ) : (
          <ul className="space-y-4">
            {notifications.map((n) => (
              <li key={n.id} className={`p-4 rounded shadow-sm ${n.read ? 'bg-gray-200 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}`}>
                <div className="flex justify-between items-center">
                  <span>{n.message}</span>
                  {!n.read && (
                    <Button size="sm" onClick={() => handleMarkAsRead(n.id)}>
                      Mark as read
                    </Button>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1">{new Date(n.created_at).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage; 