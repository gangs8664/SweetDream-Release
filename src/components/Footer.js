import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light py-4 mt-auto">
      <Container>
        <div className="d-flex flex-wrap justify-content-between align-items-center">
          <div className="col-md-4 d-flex align-items-center">
            <span className="text-muted">© 2024 SweetDream. All rights reserved.</span>
          </div>
          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
              <a className="text-muted" href="/terms">이용약관</a>
            </li>
            <li className="ms-3">
              <a className="text-muted" href="/privacy">개인정보처리방침</a>
            </li>
            <li className="ms-3">
              <a className="text-muted" href="/contact">문의하기</a>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
};

export default Footer; 