import React from "react";
import { ListGroup, Image } from "react-bootstrap";
import { 
  House, 
  Person, 
  Bell, 
  Megaphone, 
  QuestionCircle, 
  BoxArrowRight, 
  Trash,
  Gear,
  PersonFill,
  ShieldLockFill,
  BellFill,
  MegaphoneFill,
  QuestionCircleFill,
  TrashFill
} from "react-bootstrap-icons";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isOpen, isSettingsPage }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const mainMenu = [
    {
      path: "/dashboard",
      icon: <House />,
      text: "Main Page"
    },
    {
      path: "/function1",
      icon: <Gear />,
      text: "Function 1"
    },
    {
      path: "/function2",
      icon: <Gear />,
      text: "Function 2"
    },
    {
      path: "/function3",
      icon: <Gear />,
      text: "Function 3"
    },
    {
      path: "/function4",
      icon: <Gear />,
      text: "Function 4"
    },
    {
      path: "/settings",
      icon: <Gear />,
      text: "Settings"
    }
  ];

  const settingsMenu = [
    {
      icon: <PersonFill />,
      title: "Profile Settings",
      path: "/settings/profile"
    },
    {
      icon: <ShieldLockFill />,
      title: "Password Change",
      path: "/settings/password"
    },
    {
      icon: <BellFill />,
      title: "Notification Settings",
      path: "/settings/notifications"
    },
    {
      icon: <MegaphoneFill />,
      title: "Announcements",
      path: "/settings/announcements"
    },
    {
      icon: <QuestionCircleFill />,
      title: "Customer Service",
      path: "/settings/support"
    },
    {
      icon: <BoxArrowRight />,
      title: "Logout",
      path: "/settings/logout",
      warning: true
    },
    {
      icon: <TrashFill />,
      title: "Delete Account",
      path: "/settings/delete",
      danger: true
    }
  ];

  const menuItems = isSettingsPage ? settingsMenu : mainMenu;

  return (
    <div className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <div className="sidebar-header">
        <div className="d-flex align-items-center">
          <Image 
            src="/dku-logo.png"
            alt="DKU Logo"
            height="40"
            className="me-2"
          />
          <div className={`project-title ${!isOpen ? 'd-none' : ''}`}>
            <h5 className="mb-0">SweetDream</h5>
            <small className="text-muted">Boanlab Project</small>
          </div>
        </div>
      </div>

      <ListGroup variant="flush">
        {menuItems.map((item, index) => (
          <ListGroup.Item
            key={index}
            action
            onClick={() => navigate(item.path)}
            className={`sidebar-item ${location.pathname === item.path ? 'active' : ''} ${item.warning ? 'warning' : item.danger ? 'danger' : ''}`}
          >
            <div className="sidebar-content">
              {item.icon}
              <span className="ms-2">{item.text || item.title}</span>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Sidebar;