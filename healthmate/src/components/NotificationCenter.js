import React, { useState } from 'react';
import '../styles/NotificationCenter.css';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'appointment',
      title: 'Upcoming Appointment',
      message: 'You have an appointment with Dr. Smith tomorrow at 10:00 AM',
      timestamp: '2024-07-10T14:30:00Z',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'medication',
      title: 'Medication Reminder',
      message: 'Time to take your Lisinopril (10mg)',
      timestamp: '2024-07-10T08:00:00Z',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'test_result',
      title: 'Test Results Available',
      message: 'Your blood work results are now available for review',
      timestamp: '2024-07-09T16:45:00Z',
      read: true,
      priority: 'medium'
    },
    {
      id: 4,
      type: 'health_tip',
      title: 'Health Tip',
      message: 'Remember to drink at least 8 glasses of water today',
      timestamp: '2024-07-09T09:00:00Z',
      read: false,
      priority: 'low'
    },
    {
      id: 5,
      type: 'system',
      title: 'Profile Updated',
      message: 'Your health profile has been successfully updated',
      timestamp: '2024-07-08T11:20:00Z',
      read: true,
      priority: 'low'
    },
    {
      id: 6,
      type: 'appointment',
      title: 'Appointment Confirmed',
      message: 'Your appointment with Dr. Johnson has been confirmed for July 20th',
      timestamp: '2024-07-08T10:15:00Z',
      read: true,
      priority: 'medium'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [showSettings, setShowSettings] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    appointments: true,
    medications: true,
    test_results: true,
    health_tips: true,
    system: false
  });

  const notificationTypes = [
    { id: 'all', label: 'All Notifications', count: notifications.length },
    { id: 'appointment', label: 'Appointments', count: notifications.filter(n => n.type === 'appointment').length },
    { id: 'medication', label: 'Medications', count: notifications.filter(n => n.type === 'medication').length },
    { id: 'test_result', label: 'Test Results', count: notifications.filter(n => n.type === 'test_result').length },
    { id: 'health_tip', label: 'Health Tips', count: notifications.filter(n => n.type === 'health_tip').length },
    { id: 'system', label: 'System', count: notifications.filter(n => n.type === 'system').length }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'appointment': return '📅';
      case 'medication': return '💊';
      case 'test_result': return '🩺';
      case 'health_tip': return '💡';
      case 'system': return '⚙️';
      default: return '📢';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4757';
      case 'medium': return '#ffa502';
      case 'low': return '#2ed573';
      default: return '#57606f';
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInHours = Math.floor((now - notificationTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === filter);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const toggleNotificationSetting = (type) => {
    setNotificationSettings(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="notification-center">
      <div className="notification-header">
        <h1>Notification Center</h1>
        <div className="header-actions">
          <div className="unread-count">
            {unreadCount > 0 && (
              <span className="count-badge">{unreadCount} unread</span>
            )}
          </div>
          <button 
            className="settings-btn"
            onClick={() => setShowSettings(!showSettings)}
          >
            ⚙️
          </button>
        </div>
      </div>

      {showSettings && (
        <div className="notification-settings">
          <h3>Notification Settings</h3>
          <div className="settings-grid">
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={notificationSettings.appointments}
                  onChange={() => toggleNotificationSetting('appointments')}
                />
                Appointment Reminders
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={notificationSettings.medications}
                  onChange={() => toggleNotificationSetting('medications')}
                />
                Medication Reminders
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={notificationSettings.test_results}
                  onChange={() => toggleNotificationSetting('test_results')}
                />
                Test Results
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={notificationSettings.health_tips}
                  onChange={() => toggleNotificationSetting('health_tips')}
                />
                Health Tips
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={notificationSettings.system}
                  onChange={() => toggleNotificationSetting('system')}
                />
                System Notifications
              </label>
            </div>
          </div>
        </div>
      )}

      <div className="notification-filters">
        {notificationTypes.map(type => (
          <button
            key={type.id}
            className={`filter-btn ${filter === type.id ? 'active' : ''}`}
            onClick={() => setFilter(type.id)}
          >
            {type.label}
            <span className="filter-count">{type.count}</span>
          </button>
        ))}
      </div>

      <div className="notification-actions">
        <button 
          className="action-btn secondary"
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
        >
          Mark All as Read
        </button>
        <button 
          className="action-btn danger"
          onClick={clearAllNotifications}
          disabled={notifications.length === 0}
        >
          Clear All
        </button>
      </div>

      <div className="notifications-list">
        {filteredNotifications.length === 0 ? (
          <div className="no-notifications">
            <div className="no-notifications-icon">🔔</div>
            <h3>No notifications</h3>
            <p>You're all caught up!</p>
          </div>
        ) : (
          filteredNotifications.map(notification => (
            <div 
              key={notification.id} 
              className={`notification-item ${!notification.read ? 'unread' : ''}`}
            >
              <div className="notification-content">
                <div className="notification-icon">
                  {getTypeIcon(notification.type)}
                </div>
                
                <div className="notification-details">
                  <div className="notification-header-row">
                    <h4 className="notification-title">{notification.title}</h4>
                    <div className="notification-meta">
                      <span 
                        className="priority-indicator"
                        style={{ backgroundColor: getPriorityColor(notification.priority) }}
                      ></span>
                      <span className="notification-time">
                        {getTimeAgo(notification.timestamp)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="notification-message">{notification.message}</p>
                </div>
              </div>
              
              <div className="notification-actions">
                {!notification.read && (
                  <button 
                    className="action-btn small"
                    onClick={() => markAsRead(notification.id)}
                  >
                    Mark as Read
                  </button>
                )}
                <button 
                  className="action-btn small danger"
                  onClick={() => deleteNotification(notification.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="notification-summary">
        <div className="summary-stats">
          <div className="summary-item">
            <span className="summary-label">Total Notifications:</span>
            <span className="summary-value">{notifications.length}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Unread:</span>
            <span className="summary-value">{unreadCount}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">High Priority:</span>
            <span className="summary-value">
              {notifications.filter(n => n.priority === 'high').length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
