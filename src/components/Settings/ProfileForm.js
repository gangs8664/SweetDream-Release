import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: ''
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
    // API 호출 로직 추가
    console.log('Form submitted:', formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Bio</Form.Label>
        <Form.Control
          as="textarea"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={3}
          placeholder="Tell us about yourself"
        />
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </div>
    </Form>
  );
};

export default ProfileForm;
