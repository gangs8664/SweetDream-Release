import React, { useState } from "react";
import { Container, Card, Table, Button, Modal, Form, Badge } from "react-bootstrap";
import { PencilSquare, Trash, Plus, Eye } from "react-bootstrap-icons";
import Navbar from "../../../components/Navbar/Navbar";
import AdminSidebar from "../../../components/Sidebar/AdminSidebar";

const AnnouncementManagement = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  // 임시 공지사항 데이터
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "시스템 점검 안내",
      content: "2024년 3월 20일 새벽 2시부터 4시까지 시스템 점검이 있을 예정입니다.",
      category: "System",
      status: "Published",
      important: true,
      createdAt: "2024-03-15",
      views: 245
    },
    {
      id: 2,
      title: "새로운 기능 업데이트",
      content: "사용자 인터페이스가 개선되었습니다. 자세한 내용은 본문을 확인해주세요.",
      category: "Update",
      status: "Published",
      important: false,
      createdAt: "2024-03-14",
      views: 189
    },
    {
      id: 3,
      title: "임시 저장된 공지사항",
      content: "아직 발행되지 않은 공지사항입니다.",
      category: "General",
      status: "Draft",
      important: false,
      createdAt: "2024-03-13",
      views: 0
    }
  ]);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "General",
    important: false
  });

  const categories = ["General", "System", "Update", "Event", "Notice"];

  const handleShowModal = (mode, announcement = null) => {
    setModalMode(mode);
    setSelectedAnnouncement(announcement);
    setShowModal(true);
  };

  const handleSubmit = (e, status = 'Published') => {
    e.preventDefault();
    if (modalMode === 'add') {
      const newAnnouncement = {
        id: announcements.length + 1,
        ...formData,
        status: status,
        createdAt: new Date().toISOString().split('T')[0],
        views: 0
      };
      setAnnouncements([newAnnouncement, ...announcements]);
    } else {
      const updatedAnnouncements = announcements.map(announcement =>
        announcement.id === selectedAnnouncement.id
          ? { ...announcement, ...formData, status: status }
          : announcement
      );
      setAnnouncements(updatedAnnouncements);
    }
    setShowModal(false);
  };

  const handleDeleteAnnouncement = (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements(announcements.filter(announcement => announcement.id !== id));
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      Published: 'success',
      Draft: 'warning'
    };
    return <Badge bg={variants[status]}>{status}</Badge>;
  };

  return (
    <div>
      <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />
      <div className="d-flex">
        <AdminSidebar isOpen={isOpen} />
        <div className={`content-area ${isOpen ? 'content-open' : 'content-closed'}`}>
          <Container fluid className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Announcement Management</h2>
              <Button variant="primary" onClick={() => handleShowModal('add')}>
                <Plus className="me-2" />
                New Announcement
              </Button>
            </div>

            <Card>
              <Card.Body>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Important</th>
                      <th>Created At</th>
                      <th>Views</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {announcements.map(announcement => (
                      <tr key={announcement.id}>
                        <td>{announcement.title}</td>
                        <td>
                          <Badge bg="info">{announcement.category}</Badge>
                        </td>
                        <td>{getStatusBadge(announcement.status)}</td>
                        <td>
                          {announcement.important && (
                            <Badge bg="danger">Important</Badge>
                          )}
                        </td>
                        <td>{announcement.createdAt}</td>
                        <td>{announcement.views}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button 
                              variant="outline-info" 
                              size="sm"
                              onClick={() => console.log('View announcement')}
                            >
                              <Eye />
                            </Button>
                            <Button 
                              variant="outline-primary" 
                              size="sm"
                              onClick={() => handleShowModal('edit', announcement)}
                            >
                              <PencilSquare />
                            </Button>
                            <Button 
                              variant="outline-danger" 
                              size="sm"
                              onClick={() => handleDeleteAnnouncement(announcement.id)}
                            >
                              <Trash />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

            {/* Add/Edit Announcement Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>
                  {modalMode === 'add' ? 'New Announcement' : 'Edit Announcement'}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={(e) => handleSubmit(e, 'Published')}>
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
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      value={formData.content}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Mark as Important"
                      checked={formData.important}
                      onChange={(e) => setFormData({...formData, important: e.target.checked})}
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-end gap-2">
                    <Button 
                      variant="secondary" 
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      variant="outline-primary"
                      onClick={(e) => handleSubmit(e, 'Draft')}
                    >
                      Save as Draft
                    </Button>
                    <Button 
                      type="submit" 
                      variant="primary"
                    >
                      Publish
                    </Button>
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

export default AnnouncementManagement; 