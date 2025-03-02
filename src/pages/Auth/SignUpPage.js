import React, { useState } from "react";
import { Form, Button, Container, Card, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import Footer from '../../components/Footer/Footer';

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('회원가입 시도:', { name, id, email, password });
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: "#E8F0F8" }}>
      <Container className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <Card style={{ width: "30rem", padding: "3rem" }} className="shadow-lg text-center">
          <h2 className="mb-3 fw-bold">Sweet Dream</h2>
          <h4 className="text-primary fw-bold">Sign Up</h4>
          <Form onSubmit={handleSignUp}>
            <Form.Group controlId="formBasicName" className="mb-3 text-start">
              <Form.Label className="fw-bold">Your Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicId" className="mb-3 text-start">
              <Form.Label className="fw-bold">ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail" className="mb-3 text-start">
              <Form.Label className="fw-bold">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                />
                <Button variant="outline-secondary" onClick={() => setPasswordVisible(!passwordVisible)}>
                  {passwordVisible ? <EyeSlash /> : <Eye />}
                </Button>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="formBasicConfirmPassword" className="mb-3 text-start">
              <Form.Label className="fw-bold">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 fw-bold" style={{ fontSize: "1.2rem" }}>
              Sign Up
            </Button>
          </Form>
        </Card>
      </Container>
      <Footer />
    </div>
  );
};

export default SignUpPage;
