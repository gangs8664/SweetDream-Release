import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const PasswordForm = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    // API 호출 로직 추가
    console.log('Password change submitted:', formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Current Password</Form.Label>
        <Form.Control
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          placeholder="Enter current password"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>New Password</Form.Label>
        <Form.Control
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="Enter new password"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Confirm New Password</Form.Label>
        <Form.Control
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm new password"
          required
        />
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit">
          Change Password
        </Button>
      </div>
    </Form>
  );
};

export default PasswordForm;
