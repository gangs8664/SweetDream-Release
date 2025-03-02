import React, { useState } from "react";
import { Form, Button, Container, Card, Alert, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import Footer from "../../components/Footer/Footer";

const SignInPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  // 더미 계정 - routes/index.js의 dummyUsers와 동일하게 맞춤
  const DUMMY_ACCOUNTS = {
    admin: { 
      userId: "admin123",
      password: "Admin123!",
      role: "ADMIN"
    },
    user: {
      userId: "testuser123",
      password: "Password123!",
      role: "USER"
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    
    // 관리자 로그인
    if (userId === DUMMY_ACCOUNTS.admin.userId && password === DUMMY_ACCOUNTS.admin.password) {
      console.log('관리자 로그인 성공');
      navigate('/admin');  // 관리자 대시보드로 이동
      return;
    }
    
    // 일반 사용자 로그인
    if (userId === DUMMY_ACCOUNTS.user.userId && password === DUMMY_ACCOUNTS.user.password) {
      console.log('사용자 로그인 성공');
      navigate('/dashboard');  // 사용자 대시보드로 이동
      return;
    }

    alert('아이디 또는 비밀번호가 일치하지 않습니다.');
  };

  return (
    <Container fluid className="d-flex flex-column justify-content-center align-items-center vh-100" style={{ backgroundColor: "#E8F0F8" }}>
      <Card style={{ width: "30rem", padding: "3rem" }} className="shadow-lg text-center">
        <h2 className="mb-3 fw-bold">Sweet Dream</h2>
        <h4 className="text-primary fw-bold">Sign In</h4>
        <Form onSubmit={handleSignIn}>
          <Form.Group controlId="formBasicUsername" className="mb-3 text-start">
            <Form.Label className="fw-bold">ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mb-3 text-start">
            <Form.Label className="fw-bold">Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                variant="outline-secondary"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <EyeSlash /> : <Eye />}
              </Button>
            </InputGroup>
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
              Sign In
            </Button>
          </div>

          <div className="text-center mt-3">
            <Link to="/auth/findid" className="text-decoration-none me-2">
              Forgot ID?
            </Link>
            <Link to="/auth/findpassword" className="text-decoration-none">
              Forgot Password?
            </Link>
          </div>
          <div className="text-center mt-3">
            <span className="text-muted">Don't have an account? </span>
            <Link to="/auth/signup" className="text-decoration-none">
              Sign Up
            </Link>
          </div>
        </Form>
      </Card>
      <Footer />
    </Container>
  );
};

export default SignInPage;
