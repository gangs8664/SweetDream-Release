import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import './DashboardLayout.css';

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="main-container">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        <Sidebar isOpen={isSidebarOpen} />
        <div className={`content-area ${!isSidebarOpen ? 'content-closed' : ''}`}>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout; 