import React, { useState } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { BoxArrowRight } from "react-bootstrap-icons";
import Footer from '../../components/Footer/Footer';

const LogoutConfirm = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    // 로그아웃 로직 구현
    // 예: localStorage.removeItem('token');
    console.log("로그아웃 처리");
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
              <h2>Logout</h2>
              <Button variant="outline-primary" onClick={() => navigate('/settings')}>
                Back to Settings
              </Button>
            </div>
            <Row>
              <Col md={8}>
                <Card className="text-center">
                  <Card.Body className="py-5">
                    <BoxArrowRight className="text-primary mb-3" size={50} />
                    <h4 className="mb-3">로그아웃 하시겠습니까?</h4>
                    <p className="text-muted mb-4">
                      로그아웃 하시면 다시 로그인이 필요합니다.
                    </p>
                    <div className="d-flex justify-content-center gap-2">
                      <Button 
                        variant="secondary" 
                        onClick={() => navigate('/settings')}
                      >
                        취소
                      </Button>
                      <Button 
                        variant="primary" 
                        onClick={handleLogout}
                      >
                        로그아웃
                      </Button>
                    </div>
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

export default LogoutConfirm;
