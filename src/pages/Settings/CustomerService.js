import React, { useState } from "react";
import { Container, Card, Button, Row, Col, Form, Accordion } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from '../../components/Footer/Footer';

const CustomerService = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  // FAQ 데이터
  const faqs = [
    {
      question: "비밀번호를 잊어버렸어요.",
      answer: "로그인 페이지에서 '비밀번호 찾기'를 클릭하여 이메일 인증을 통해 비밀번호를 재설정하실 수 있습니다."
    },
    {
      question: "계정 삭제는 어떻게 하나요?",
      answer: "설정 > 계정 삭제 메뉴에서 진행하실 수 있습니다. 단, 삭제 시 모든 데이터가 영구적으로 삭제되니 신중히 결정해주세요."
    },
    {
      question: "알림 설정은 어디서 변경하나요?",
      answer: "설정 > 알림 설정에서 이메일, 푸시 알림 등 각종 알림 설정을 변경하실 수 있습니다."
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // 문의하기 로직 구현
    console.log("문의가 접수되었습니다.");
  };

  return (
    <div>
      <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />
      <div className="d-flex">
        <Sidebar isOpen={isOpen} />
        <div className={`content-area ${isOpen ? 'content-open' : 'content-closed'}`}>
          <Container className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Customer Service</h2>
              <Button variant="outline-primary" onClick={() => navigate('/settings')}>
                Back to Settings
              </Button>
            </div>
            <Row>
              <Col md={8}>
                <Card className="mb-4">
                  <Card.Body>
                    <h5 className="mb-3">자주 묻는 질문 (FAQ)</h5>
                    <Accordion>
                      {faqs.map((faq, index) => (
                        <Accordion.Item key={index} eventKey={index.toString()}>
                          <Accordion.Header>{faq.question}</Accordion.Header>
                          <Accordion.Body>{faq.answer}</Accordion.Body>
                        </Accordion.Item>
                      ))}
                    </Accordion>
                  </Card.Body>
                </Card>

                <Card>
                  <Card.Body>
                    <h5 className="mb-3">문의하기</h5>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>문의 유형</Form.Label>
                        <Form.Select>
                          <option>서비스 이용 문의</option>
                          <option>기술적 문제</option>
                          <option>계정 관련 문의</option>
                          <option>기타 문의</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>제목</Form.Label>
                        <Form.Control type="text" placeholder="문의 제목을 입력해주세요" />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>내용</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          placeholder="문의하실 내용을 자세히 적어주세요"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>파일 첨부</Form.Label>
                        <Form.Control type="file" />
                      </Form.Group>

                      <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">
                          문의하기
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

export default CustomerService;
