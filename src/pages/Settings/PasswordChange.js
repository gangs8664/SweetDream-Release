import React, { useState } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import PasswordForm from "../../components/Settings/PasswordForm";

const PasswordChange = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div>
      <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />
      <div className="d-flex">
        <Sidebar isOpen={isOpen} />
        <div className={`content-area ${isOpen ? 'content-open' : 'content-closed'}`}>
          <Container className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Change Password</h2>
              <Button variant="outline-primary" onClick={() => navigate('/settings')}>
                Back to Settings
              </Button>
            </div>
            <Row>
              <Col md={8}>
                <Card>
                  <Card.Body>
                    <PasswordForm />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default PasswordChange;
