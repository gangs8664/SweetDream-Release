import React, { useState } from "react";
import { Container, Card, Button, Row, Col, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

const Announcements = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  // 임시 공지사항 데이터
  const announcements = [
    {
      id: 1,
      title: "시스템 점검 안내",
      date: "2024-03-15",
      content: "시스템 점검으로 인해 3월 20일 새벽 2시부터 4시까지 서비스 이용이 제한됩니다.",
      isNew: true
    },
    {
      id: 2,
      title: "개인정보처리방침 개정 안내",
      date: "2024-03-10",
      content: "개인정보처리방침이 개정되어 안내드립니다. 자세한 내용은 본문을 확인해주세요.",
      isNew: true
    },
    {
      id: 3,
      title: "신규 기능 업데이트",
      date: "2024-03-01",
      content: "새로운 기능이 추가되었습니다. 더 나은 서비스를 위해 노력하겠습니다.",
      isNew: false
    }
  ];

  return (
    <div>
      <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />
      <div className="d-flex">
        <Sidebar isOpen={isOpen} />
        <div className={`content-area ${isOpen ? 'content-open' : 'content-closed'}`}>
          <Container className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Announcements</h2>
              <Button variant="outline-primary" onClick={() => navigate('/settings')}>
                Back to Settings
              </Button>
            </div>
            <Row>
              <Col md={8}>
                <Card>
                  <Card.Body>
                    <ListGroup variant="flush">
                      {announcements.map((announcement) => (
                        <ListGroup.Item key={announcement.id} className="py-3">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h6 className="mb-1">
                                {announcement.title}
                                {announcement.isNew && (
                                  <span className="badge bg-danger ms-2">New</span>
                                )}
                              </h6>
                              <small className="text-muted">{announcement.date}</small>
                            </div>
                          </div>
                          <p className="mt-2 mb-0">{announcement.content}</p>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
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

export default Announcements;
