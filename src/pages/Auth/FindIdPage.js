import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const FindIdPage = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [sentCode, setSentCode] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [maskedId, setMaskedId] = useState("");
  const [timer, setTimer] = useState(300); // 5분 타이머
  const [isExpired, setIsExpired] = useState(false);

  const dummyUsers = [
    { 
      id: "boa12345", 
      email: "sk200444@gmail.com",
      password: "password123"
    },
    { 
      id: "user1", 
      email: "user1@example.com",
      password: "password123"
    },
    { 
      id: "admin", 
      email: "admin@example.com",
      password: "password"
    }
  ];

  const inputRefs = useRef([...Array(6)].map(() => React.createRef()));

  useEffect(() => {
    if (sentCode && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setIsExpired(true);
    }
  }, [sentCode, timer]);

  const handleSendCode = () => {
    setError("");
    const user = dummyUsers.find((u) => u.email === email);
    if (!user) {
      setError("Invalid email. Please check again.");
      return;
    }
    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    setSentCode(generatedCode);
    setTimer(300);
    setIsExpired(false);
    console.log("Generated Code:", generatedCode); // 실제 환경에서는 서버에서 발송
  };

  const handleVerifyCode = () => {
    if (isExpired) {
      setError("The verification time has expired. Please try again.");
      return;
    }
    if (sentCode !== code.join("")) {
      setError("Invalid verification code. Please try again.");
      return;
    }
    setIsVerified(true);
    const user = dummyUsers.find((u) => u.email === email);
    setMaskedId(user.id.slice(0, 3) + "****");
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: "#E8F0F8" }}>
      <Container className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <Card style={{ width: "30rem", padding: "3rem" }} className="shadow-lg text-center">
          <h2 className="mb-3 fw-bold">Mini Project</h2>
          <h4 className="text-primary fw-bold">Find ID</h4>
          {error && <Alert variant="danger">{error}</Alert>}
          {!isVerified ? (
            <>
              <Form.Group controlId="formBasicEmail" className="mb-3 text-start">
                <Form.Label className="fw-bold">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={sentCode !== null}
                />
              </Form.Group>
              {sentCode && (
                <>
                  <p>Please check your email and enter a 6-digit code.</p>
                  <p>{`${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, "0")}`}</p>
                  <div className="d-flex justify-content-center mb-3">
                    {code.map((num, idx) => (
                      <Form.Control
                        key={idx}
                        ref={inputRefs.current[idx]}
                        type="text"
                        maxLength="1"
                        className="text-center mx-1"
                        style={{ width: "3rem", fontSize: "1.5rem" }}
                        value={num}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            const newCode = [...code];
                            newCode[idx] = value;
                            setCode(newCode);
                            
                            // 숫자 입력 시 다음 필드로 이동
                            if (value !== '' && idx < 5) {
                              inputRefs.current[idx + 1].current.focus();
                            }
                          }
                        }}
                        onKeyDown={(e) => {
                          // Backspace로 이전 필드로 이동
                          if (e.key === 'Backspace' && !code[idx] && idx > 0) {
                            inputRefs.current[idx - 1].current.focus();
                          }
                        }}
                        onPaste={(e) => {
                          e.preventDefault();
                          const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
                          if (pastedData.every(char => /^\d$/.test(char))) {
                            const newCode = [...code];
                            pastedData.forEach((digit, i) => {
                              if (i < 6) newCode[i] = digit;
                            });
                            setCode(newCode);
                            // 마지막 필드로 포커스 이동
                            inputRefs.current[5].current.focus();
                          }
                        }}
                      />
                    ))}
                  </div>
                  <Button variant="primary" className="w-100 fw-bold" onClick={handleVerifyCode}>
                    Next
                  </Button>
                </>
              )}
              {!sentCode && <Button variant="primary" className="w-100" onClick={handleSendCode}>Next</Button>}
            </>
          ) : (
            <>
              <h5 className="fw-bold">Your ID is</h5>
              <h3 className="text-primary fw-bold">{maskedId}</h3>
              <p className="text-muted">To protect information, only part of the ID is displayed.</p>
              <Link to="/" className="text-decoration-none">Log in</Link>
            </>
          )}
        </Card>
      </Container>
      <Footer />
    </div>
  );
};

export default FindIdPage;
