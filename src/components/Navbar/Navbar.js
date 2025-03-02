import React from 'react';
import { Navbar as BootstrapNavbar, Container, Button } from 'react-bootstrap';
import { List, BoxArrowRight } from 'react-bootstrap-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = sessionStorage.getItem('userEmail');

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  // 현재 경로가 /admin으로 시작하는지 확인
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <BootstrapNavbar 
      bg="light" 
      expand="lg" 
      fixed="top"
      className="navbar"
    >
      <Container fluid>
        <button 
          className="btn btn-link"
          onClick={toggleSidebar}
        >
          <List size={24} />
        </button>
        <BootstrapNavbar.Brand>
          {isAdminPath ? 'Admin Dashboard' : 'User Dashboard'}
        </BootstrapNavbar.Brand>
        <div className="ms-auto d-flex align-items-center">
          <span className="me-3">{userEmail}</span>
          <Button 
            variant="outline-secondary" 
            size="sm"
            onClick={handleLogout}
          >
            <BoxArrowRight className="me-2" />
            로그아웃
          </Button>
        </div>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;