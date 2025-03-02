import React, { useState } from "react";
import { Container, Card, Table, Button, Modal, Form, Badge, Nav, Tab, Row, Col } from "react-bootstrap";
import { PencilSquare, Trash, Plus, Send, Clock } from "react-bootstrap-icons";
import Navbar from "../../../components/Navbar/Navbar";
import AdminSidebar from "../../../components/Sidebar/AdminSidebar";

const NotificationManagement = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('sent');

  // 임시 알림 데이터
  const [notifications, setNotifications] = useState({
    sent: [
      {
        id: 1,
        title: "시스템 점검 알림",
        content: "시스템 점검이 예정되어 있습니다.",
        type: "System",
        recipients: "All Users",
        sentAt: "2024-03-15 14:30",
        readCount: 156,
        totalCount: 200
      },
      {
        id: 2,
        title: "새로운 기능 안내",
        content: "새로운 기능이 추가되었습니다.",
        type: "Update",
        recipients: "Active Users",
        sentAt: "2024-03-14 11:20",
        readCount: 89,
        totalCount: 150
      }
    ],
    scheduled: [
      {
        id: 3,
        title: "정기 점검 안내",
        content: "정기 점검이 진행될 예정입니다.",
        type: "System",
        recipients: "All Users",
        scheduledFor: "2024-03-20 02:00"
      }
    ]
  });

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "General",
    recipients: "All Users",
    scheduleDate: "",
    scheduleTime: ""
  });

  const notificationTypes = ["General", "System", "Update", "Event", "Alert"];
  const recipientTypes = ["All Users", "Active Users", "Inactive Users", "New Users"];

  const handleShowModal = () => {
    setFormData({
      title: "",
      content: "",
      type: "General",
      recipients: "All Users",
      scheduleDate: "",
      scheduleTime: ""
    });
    setShowModal(true);
  };

  const handleSubmit = (e, isScheduled = false) => {
    e.preventDefault();
    const newNotification = {
      id: Date.now(),
      title: formData.title,
      content: formData.content,
      type: formData.type,
      recipients: formData.recipients
    };

    if (isScheduled) {
      const scheduledNotification = {
        ...newNotification,
        scheduledFor: `${formData.scheduleDate} ${formData.scheduleTime}`
      };
      setNotifications(prev => ({
        ...prev,
        scheduled: [...prev.scheduled, scheduledNotification]
      }));
    } else {
      const sentNotification = {
        ...newNotification,
        sentAt: new Date().toLocaleString(),
        readCount: 0,
        totalCount: 200 // 임시 총 수신자 수
      };
      setNotifications(prev => ({
        ...prev,
        sent: [sentNotification, ...prev.sent]
      }));
    }
    setShowModal(false);
  };

  const handleDeleteNotification = (id, type) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      setNotifications(prev => ({
        ...prev,
        [type]: prev[type].filter(notification => notification.id !== id)
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
              <h2>Notification Management</h2>
              <Button variant="primary" onClick={handleShowModal}>
                <Plus className="me-2" />
                New Notification
              </Button>
            </div>

            <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
              <Card>
                <Card.Header>
                  <Nav variant="tabs">
                    <Nav.Item>
                      <Nav.Link eventKey="sent">Sent Notifications</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="scheduled">Scheduled Notifications</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Header>
                <Card.Body>
                  <Tab.Content>
                    <Tab.Pane eventKey="sent">
                      <Table responsive hover>
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Recipients</th>
                            <th>Sent At</th>
                            <th>Read Rate</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {notifications.sent.map(notification => (
                            <tr key={notification.id}>
                              <td>{notification.title}</td>
                              <td>
                                <Badge bg="info">{notification.type}</Badge>
                              </td>
                              <td>{notification.recipients}</td>
                              <td>{notification.sentAt}</td>
                              <td>
                                {notification.readCount}/{notification.totalCount}
                                ({Math.round((notification.readCount/notification.totalCount)*100)}%)
                              </td>
                              <td>
                                <Button 
                                  variant="outline-danger" 
                                  size="sm"
                                  onClick={() => handleDeleteNotification(notification.id, 'sent')}
                                >
                                  <Trash />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Tab.Pane>
                    <Tab.Pane eventKey="scheduled">
                      <Table responsive hover>
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Recipients</th>
                            <th>Scheduled For</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {notifications.scheduled.map(notification => (
                            <tr key={notification.id}>
                              <td>{notification.title}</td>
                              <td>
                                <Badge bg="info">{notification.type}</Badge>
                              </td>
                              <td>{notification.recipients}</td>
                              <td>{notification.scheduledFor}</td>
                              <td>
                                <div className="d-flex gap-2">
                                  <Button 
                                    variant="outline-primary" 
                                    size="sm"
                                    onClick={() => console.log('Edit scheduled notification')}
                                  >
                                    <PencilSquare />
                                  </Button>
                                  <Button 
                                    variant="outline-danger" 
                                    size="sm"
                                    onClick={() => handleDeleteNotification(notification.id, 'scheduled')}
                                  >
                                    <Trash />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Tab.Pane>
                  </Tab.Content>
                </Card.Body>
              </Card>
            </Tab.Container>

            {/* Create Notification Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>Create New Notification</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Type</Form.Label>
                    <Form.Select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                    >
                      {notificationTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Recipients</Form.Label>
                    <Form.Select
                      value={formData.recipients}
                      onChange={(e) => setFormData({...formData, recipients: e.target.value})}
                    >
                      {recipientTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={formData.content}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                      required
                    />
                  </Form.Group>

                  <Row className="mb-3">
                    <Col>
                      <Form.Group>
                        <Form.Label>Schedule Date (Optional)</Form.Label>
                        <Form.Control
                          type="date"
                          value={formData.scheduleDate}
                          onChange={(e) => setFormData({...formData, scheduleDate: e.target.value})}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Schedule Time</Form.Label>
                        <Form.Control
                          type="time"
                          value={formData.scheduleTime}
                          onChange={(e) => setFormData({...formData, scheduleTime: e.target.value})}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-end gap-2">
                    <Button 
                      variant="secondary" 
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </Button>
                    {formData.scheduleDate && formData.scheduleTime ? (
                      <Button 
                        variant="primary"
                        onClick={(e) => handleSubmit(e, true)}
                      >
                        <Clock className="me-2" />
                        Schedule
                      </Button>
                    ) : (
                      <Button 
                        variant="primary"
                        onClick={(e) => handleSubmit(e, false)}
                      >
                        <Send className="me-2" />
                        Send Now
                      </Button>
                    )}
                  </div>
                </Form>
              </Modal.Body>
            </Modal>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default NotificationManagement; 