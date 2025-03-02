import React, { useState } from "react";
import { Container, Card, Button, Row, Col, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { ExclamationTriangle } from "react-bootstrap-icons";
import Footer from '../../components/Footer/Footer';

const DeleteAccount = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleDeleteAccount = (e) => {
    e.preventDefault();
    if (confirmText !== "DELETE") {
      setShowError(true);
      return;
    }
    // 계정 삭제 로직 구현
    console.log("계정 삭제 처리");
    navigate('/');
  };

  return (
    <div>
      <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />
      <div className="d-flex">
        <Sidebar isOpen={isOpen} />
        <div className={`content-area ${isOpen ? 'content-open' : 'content-closed'}`}>
          <Container className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Delete Account</h2>
              <Button variant="outline-primary" onClick={() => navigate('/settings')}>
                Back to Settings
              </Button>
            </div>
            <Row>
              <Col md={8}>
                <Card>
                  <Card.Body>
                    <div className="text-center mb-4">
                      <ExclamationTriangle className="text-danger mb-3" size={50} />
                      <h4 className="text-danger mb-3">계정 삭제</h4>
                      <p className="text-muted">
                        계정을 삭제하면 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
                      </p>
                    </div>

                    <Alert variant="warning">
                      <ul className="mb-0">
                        <li>모든 개인정보가 삭제됩니다.</li>
                        <li>저장된 모든 데이터가 삭제됩니다.</li>
                        <li>이 작업은 취소할 수 없습니다.</li>
                      </ul>
                    </Alert>

                    <Form onSubmit={handleDeleteAccount}>
                      <Form.Group className="mb-3">
                        <Form.Label>현재 비밀번호</Form.Label>
                        <Form.Control
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>
                          계정을 삭제하려면 "DELETE"를 입력하세요
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={confirmText}
                          onChange={(e) => setConfirmText(e.target.value)}
                          required
                        />
                        {showError && (
                          <Form.Text className="text-danger">
                            "DELETE"를 정확히 입력해주세요.
                          </Form.Text>
                        )}
                      </Form.Group>

                      <div className="d-flex justify-content-center gap-2">
                        <Button 
                          variant="secondary" 
                          onClick={() => navigate('/settings')}
                        >
                          취소
                        </Button>
                        <Button 
                          variant="danger" 
                          type="submit"
                          disabled={!password || confirmText !== "DELETE"}
                        >
                          계정 삭제
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
