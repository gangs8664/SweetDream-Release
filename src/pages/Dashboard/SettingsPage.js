import React from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import { Container, ListGroup, Row, Col, Card } from "react-bootstrap";
import {
  PersonFill,
  ShieldLockFill,
  BellFill,
  MegaphoneFill,
  QuestionCircleFill,
  BoxArrowRight,
  TrashFill
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const navigate = useNavigate();

  const settingsMenu = [
    {
      icon: <PersonFill size={20} />,
      title: "Profile Settings",
      description: "Update your personal information",
      path: "/settings/profile"
    },
    {
      icon: <ShieldLockFill size={20} />,
      title: "Password Change",
      description: "Change your account password",
      path: "/settings/password"
    },
    {
      icon: <BellFill size={20} />,
      title: "Notification Settings",
      description: "Manage your notification preferences",
      path: "/settings/notifications"
    },
    {
      icon: <MegaphoneFill size={20} />,
      title: "Announcements",
      description: "Check latest announcements",
      path: "/settings/announcements"
    },
    {
      icon: <QuestionCircleFill size={20} />,
      title: "Customer Service",
      description: "Get help and support",
      path: "/settings/support"
    },
    {
      icon: <BoxArrowRight size={20} />,
      title: "Logout",
      description: "Sign out of your account",
      path: "/settings/logout",
      warning: true
    },
    {
      icon: <TrashFill size={20} />,
      title: "Delete Account",
      description: "Permanently delete your account",
      path: "/settings/delete",
      danger: true
    }
  ];

  return (
    <DashboardLayout>
      <Container className="p-4">
        <h2 className="mb-4">Settings</h2>
        <Row>
          <Col md={8}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  {settingsMenu.map((item, index) => (
                    <ListGroup.Item
                      key={index}
                      action
                      className={`d-flex align-items-center py-3 ${
                        item.danger ? 'text-danger' : ''
                      } ${
                        item.warning ? 'text-warning' : ''
                      }`}
                      onClick={() => navigate(item.path)}
                    >
                      <span className="me-3">{item.icon}</span>
                      <div>
                        <h6 className="mb-1">{item.title}</h6>
                        <small className={`${
                          item.danger ? 'text-danger' : 
                          item.warning ? 'text-warning' : 'text-muted'
                        }`}>
                          {item.description}
                        </small>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </DashboardLayout>
  );
};

export default SettingsPage;