import React, { useState } from "react";
import { Container, Card, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import AdminSidebar from "../../../components/Sidebar/AdminSidebar";

const MemberEdit = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  // 임시 회원 데이터로 폼 초기값 설정
  const [formData, setFormData] = useState({
    name: "한승진",
    email: "32204837@dankook.ac.kr",
    role: "User",
    status: "Active",
    phoneNumber: "010-1234-5678",
    address: "경기도 용인시 수지구",
    notifications: {
      email: true,
      push: false
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // API 호출 로직 구현
    console.log('Updated member data:', formData);
    setShowSuccess(true);
    setTimeout(() => {
      navigate(`/admin/members/${id}`);
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [name]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div>
      <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />
      <div className="d-flex">
        <AdminSidebar isOpen={isOpen} />
        <div className={`content-area ${isOpen ? 'content-open' : 'content-closed'}`}>
          <Container fluid className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Edit Member</h2>
              <Button variant="secondary" onClick={() => navigate(`/admin/members/${id}`)}>
                Back to Details
              </Button>
            </div>

            {showSuccess && (
              <Alert variant="success" className="mb-4">
                Member information has been successfully updated!
              </Alert>
            )}

            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Role</Form.Label>
                        <Form.Select
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                        >
                          <option value="User">User</option>
                          <option value="Admin">Admin</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label>Notification Settings</Form.Label>
                    <div>
                      <Form.Check
                        type="checkbox"
                        label="Email Notifications"
                        name="email"
                        checked={formData.notifications.email}
                        onChange={handleChange}
                        className="mb-2"
                      />
                      <Form.Check
                        type="checkbox"
                        label="Push Notifications"
                        name="push"
                        checked={formData.notifications.push}
                        onChange={handleChange}
                      />
                    </div>
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button type="submit" variant="primary">
                      Save Changes
                    </Button>
                    <Button 
                      variant="outline-secondary"
                      onClick={() => navigate(`/admin/members/${id}`)}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default MemberEdit; 