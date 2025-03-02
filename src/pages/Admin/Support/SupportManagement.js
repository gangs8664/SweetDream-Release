import React, { useState } from "react";
import { Container, Card, Table, Button, Modal, Form, Badge, Tab, Nav, Row, Col } from "react-bootstrap";
import { Reply, Check2All, QuestionCircle, Plus } from "react-bootstrap-icons";
import Navbar from "../../../components/Navbar/Navbar";
import AdminSidebar from "../../../components/Sidebar/AdminSidebar";

const SupportManagement = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [activeTab, setActiveTab] = useState('inquiries');

  // 임시 문의 데이터
  const [inquiries, setInquiries] = useState([
    {
      id: 1,
      title: "로그인이 안됩니다",
      content: "비밀번호를 여러 번 입력했는데 로그인이 되지 않습니다.",
      user: "한승진",
      category: "Account",
      status: "Pending",
      createdAt: "2024-03-15 14:30",
      priority: "High"
    },
    {
      id: 2,
      title: "알림 설정 문의",
      content: "알림을 끄고 싶은데 방법을 모르겠습니다.",
      user: "권경현",
      category: "Settings",
      status: "Answered",
      createdAt: "2024-03-14 11:20",
      priority: "Medium"
    }
  ]);

  // 임시 FAQ 데이터
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "비밀번호를 잊어버렸어요",
      answer: "로그인 페이지에서 '비밀번호 찾기'를 클릭하여 이메일 인증을 통해 재설정하실 수 있습니다.",
      category: "Account",
      order: 1
    },
    {
      id: 2,
      question: "회원 탈퇴는 어떻게 하나요?",
      answer: "설정 > 계정 관리 > 회원 탈퇴 메뉴에서 진행하실 수 있습니다.",
      category: "Account",
      order: 2
    }
  ]);

  const [faqForm, setFaqForm] = useState({
    question: "",
    answer: "",
    category: "General",
    order: 0
  });

  const categories = ["Account", "Settings", "System", "General", "Other"];
  const priorities = ["High", "Medium", "Low"];

  const handleShowReplyModal = (inquiry) => {
    setSelectedInquiry(inquiry);
    setReplyContent("");
    setShowReplyModal(true);
  };

  const handleReplySubmit = () => {
    // 답변 처리 로직
    const updatedInquiries = inquiries.map(inquiry =>
      inquiry.id === selectedInquiry.id
        ? { ...inquiry, status: "Answered" }
        : inquiry
    );
    setInquiries(updatedInquiries);
    setShowReplyModal(false);
  };

  const handleFaqSubmit = (e) => {
    e.preventDefault();
    const newFaq = {
      id: faqs.length + 1,
      ...faqForm
    };
    setFaqs([...faqs, newFaq]);
    setShowFaqModal(false);
  };

  const getStatusBadge = (status) => {
    const variants = {
      Pending: 'warning',
      Answered: 'success',
      Closed: 'secondary'
    };
    return <Badge bg={variants[status]}>{status}</Badge>;
  };

  const getPriorityBadge = (priority) => {
    const variants = {
      High: 'danger',
      Medium: 'warning',
      Low: 'info'
    };
    return <Badge bg={variants[priority]}>{priority}</Badge>;
  };

  return (
    <div>
      <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />
      <div className="d-flex">
        <AdminSidebar isOpen={isOpen} />
        <div className={`content-area ${isOpen ? 'content-open' : 'content-closed'}`}>
          <Container fluid className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Support Management</h2>
              <Button variant="primary" onClick={() => setShowFaqModal(true)}>
                <Plus className="me-2" />
                Add FAQ
              </Button>
            </div>

            <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
              <Card>
                <Card.Header>
                  <Nav variant="tabs">
                    <Nav.Item>
                      <Nav.Link eventKey="inquiries">Customer Inquiries</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="faq">FAQ Management</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Header>
                <Card.Body>
                  <Tab.Content>
                    <Tab.Pane eventKey="inquiries">
                      <Table responsive hover>
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>User</th>
                            <th>Category</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inquiries.map(inquiry => (
                            <tr key={inquiry.id}>
                              <td>{inquiry.title}</td>
                              <td>{inquiry.user}</td>
                              <td>
                                <Badge bg="info">{inquiry.category}</Badge>
                              </td>
                              <td>{getPriorityBadge(inquiry.priority)}</td>
                              <td>{getStatusBadge(inquiry.status)}</td>
                              <td>{inquiry.createdAt}</td>
                              <td>
                                <Button 
                                  variant="outline-primary" 
                                  size="sm"
                                  onClick={() => handleShowReplyModal(inquiry)}
                                  disabled={inquiry.status === "Answered"}
                                >
                                  <Reply />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Tab.Pane>
                    <Tab.Pane eventKey="faq">
                      <Table responsive hover>
                        <thead>
                          <tr>
                            <th>Order</th>
                            <th>Question</th>
                            <th>Category</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {faqs.map(faq => (
                            <tr key={faq.id}>
                              <td>{faq.order}</td>
                              <td>{faq.question}</td>
                              <td>
                                <Badge bg="info">{faq.category}</Badge>
                              </td>
                              <td>
                                <div className="d-flex gap-2">
                                  <Button 
                                    variant="outline-primary" 
                                    size="sm"
                                    onClick={() => console.log('Edit FAQ')}
                                  >
                                    Edit
                                  </Button>
                                  <Button 
                                    variant="outline-danger" 
                                    size="sm"
                                    onClick={() => console.log('Delete FAQ')}
                                  >
                                    Delete
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

            {/* Reply Modal */}
            <Modal show={showReplyModal} onHide={() => setShowReplyModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Reply to Inquiry</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="mb-4">
                  <h6>Original Inquiry:</h6>
                  <p className="mb-2"><strong>{selectedInquiry?.title}</strong></p>
                  <p className="text-muted">{selectedInquiry?.content}</p>
                </div>
                <Form.Group>
                  <Form.Label>Your Reply</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    required
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowReplyModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleReplySubmit}>
                  <Check2All className="me-2" />
                  Send Reply
                </Button>
              </Modal.Footer>
            </Modal>

            {/* FAQ Modal */}
            <Modal show={showFaqModal} onHide={() => setShowFaqModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Add New FAQ</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleFaqSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Question</Form.Label>
                    <Form.Control
                      type="text"
                      value={faqForm.question}
                      onChange={(e) => setFaqForm({...faqForm, question: e.target.value})}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Answer</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={faqForm.answer}
                      onChange={(e) => setFaqForm({...faqForm, answer: e.target.value})}
                      required
                    />
                  </Form.Group>

                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                          value={faqForm.category}
                          onChange={(e) => setFaqForm({...faqForm, category: e.target.value})}
                        >
                          {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Display Order</Form.Label>
                        <Form.Control
                          type="number"
                          value={faqForm.order}
                          onChange={(e) => setFaqForm({...faqForm, order: parseInt(e.target.value)})}
                          min="0"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-end gap-2">
                    <Button variant="secondary" onClick={() => setShowFaqModal(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                      <QuestionCircle className="me-2" />
                      Add FAQ
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

export default SupportManagement; 