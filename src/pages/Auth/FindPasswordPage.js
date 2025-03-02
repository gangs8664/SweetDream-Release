import React, { useState, useEffect } from "react";
import { Form, Button, Container, Card, Alert, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import Footer from "../../components/Footer/Footer";

const FindPasswordPage = () => {
  const [step, setStep] = useState(1);
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [sentCode, setSentCode] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(300);
  const [isExpired, setIsExpired] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const dummyUsers = [{ id: "boa12345", email: "sk200444@gmail.com" }];

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

  const handleNextStep = () => {
    setError("");
    if (step === 1) {
      const user = dummyUsers.find((u) => u.id === id);
      if (!user) {
        setError("Invalid ID. Please check again.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      const user = dummyUsers.find((u) => u.id === id && u.email === email);
      if (!user) {
        setError("Invalid email for this ID. Please check again.");
        return;
      }
      const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
      setSentCode(generatedCode);
      setTimer(300);
      setIsExpired(false);
      setCode(["", "", "", "", "", ""]);
      console.log("Generated Code:", generatedCode);
      setStep(3);
    }
  };

  const handleCodeChange = (index, value) => {
    if (isNaN(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value !== "" && index < 5) {
      document.getElementById(`code-${index + 1}`).focus();
    }
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
    setStep(4);
  };

  const handlePasswordReset = () => {
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }
    setStep(5);
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: "#E8F0F8" }}>
      <Container className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <Card style={{ width: "30rem", padding: "3rem" }} className="shadow-lg text-center">
          <h2 className="mb-3 fw-bold">Mini Project</h2>
          <h4 className="text-primary fw-bold">Find Password</h4>
          {error && <Alert variant="danger">{error}</Alert>}
          {step === 1 && (
            <>
              <Form.Group className="mb-3 text-start">
                <Form.Label className="fw-bold">ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your ID"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" className="w-100" onClick={handleNextStep}>Next</Button>
            </>
          )}
          {step === 2 && (
            <>
              <Form.Group className="mb-3 text-start">
                <Form.Label className="fw-bold">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" className="w-100" onClick={handleNextStep}>Next</Button>
            </>
          )}
          {step === 3 && (
            <>
              <p>Please check your email and enter a 6-digit code.</p>
              <p>{`${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, "0")}`}</p>
              <div className="d-flex justify-content-center mb-3">
                {code.map((num, idx) => (
                  <Form.Control
                    key={idx}
                    id={`code-${idx}`}
                    type="text"
                    maxLength="1"
                    className="text-center mx-1"
                    style={{ width: "3rem", fontSize: "1.5rem" }}
                    value={num}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleCodeChange(idx, value);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !code[idx] && idx > 0) {
                        document.getElementById(`code-${idx - 1}`).focus();
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
                        document.getElementById('code-5').focus();
                      }
                    }}
                  />
                ))}
              </div>
              <Button variant="primary" className="w-100 fw-bold" onClick={handleVerifyCode}>
                Verify
              </Button>
            </>
          )}
          {step === 4 && (
            <>
              <Form.Group className="mb-3 text-start">
                <Form.Label className="fw-bold">New Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? <EyeSlash /> : <Eye />}
                  </Button>
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3 text-start">
                <Form.Label className="fw-bold">Confirm Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={confirmPasswordVisible ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                  >
                    {confirmPasswordVisible ? <EyeSlash /> : <Eye />}
                  </Button>
                </InputGroup>
              </Form.Group>
              <Button variant="primary" className="w-100 fw-bold" onClick={handlePasswordReset}>
                Reset Password
              </Button>
            </>
          )}
          {step === 5 && (
            <>
              <h5 className="fw-bold text-success">Password reset successful!</h5>
              <Link to="/" className="text-decoration-none">Sign In</Link>
            </>
          )}
        </Card>
      </Container>
      <Footer />
    </div>
  );
};

export default FindPasswordPage;