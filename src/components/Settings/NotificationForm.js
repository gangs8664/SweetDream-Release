import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const NotificationForm = () => {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    newsUpdates: false,
    serviceAlerts: true,
    securityAlerts: true
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API 호출 로직 추가
    console.log('Notification settings saved:', notifications);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-4">
        <Form.Check
          type="switch"
          id="emailNotifications"
          name="emailNotifications"
          label="Email Notifications"
          checked={notifications.emailNotifications}
          onChange={handleChange}
        />
        <Form.Text className="text-muted">
          Receive notifications via email
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Check
          type="switch"
          id="pushNotifications"
          name="pushNotifications"
          label="Push Notifications"
          checked={notifications.pushNotifications}
          onChange={handleChange}
        />
        <Form.Text className="text-muted">
          Receive push notifications on your device
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Check
          type="switch"
          id="newsUpdates"
          name="newsUpdates"
          label="News Updates"
          checked={notifications.newsUpdates}
          onChange={handleChange}
        />
        <Form.Text className="text-muted">
          Receive updates about new features and announcements
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Check
          type="switch"
          id="serviceAlerts"
          name="serviceAlerts"
          label="Service Alerts"
          checked={notifications.serviceAlerts}
          onChange={handleChange}
        />
        <Form.Text className="text-muted">
          Receive alerts about service status
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Check
          type="switch"
          id="securityAlerts"
          name="securityAlerts"
          label="Security Alerts"
          checked={notifications.securityAlerts}
          onChange={handleChange}
        />
        <Form.Text className="text-muted">
          Receive alerts about security updates
        </Form.Text>
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit">
          Save Preferences
        </Button>
      </div>
    </Form>
  );
};

export default NotificationForm; 