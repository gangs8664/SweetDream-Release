import React from "react";
import { ListGroup } from "react-bootstrap";
import { 
  Speedometer2,
  People,
  Megaphone,
  Bell,
  QuestionCircle,
  GraphUp,
  BoxArrowRight,
  PersonGear
} from "react-bootstrap-icons";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

const AdminSidebar = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const adminMenu = [
    {
      path: "/admin/",
      icon: <Speedometer2 />,
      text: "Dashboard"
    },
    {
      path: "/admin/members",
      icon: <People />,
      text: "Member Management"
    },
    {
      path: "/admin/roles",
      icon: <PersonGear />,
      text: "Role Management"
    },
    {
      path: "/admin/announcements",
      icon: <Megaphone />,
      text: "Announcements"
    },
    {
      path: "/admin/notifications",
      icon: <Bell />,
      text: "Notification Management"
    },
    {
      path: "/admin/support",
      icon: <QuestionCircle />,
      text: "Customer Service"
    },
    {
      path: "/admin/logs",
      icon: <GraphUp />,
      text: "Log Analysis"
    },
    {
      path: "/admin/logout",
      icon: <BoxArrowRight />,
      text: "Log Out",
      className: "text-warning mt-auto"
    }
  ];

  return (
    <div className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <ListGroup variant="flush">
        {adminMenu.map((item, index) => (
          <ListGroup.Item
            key={index}
            action
            onClick={() => navigate(item.path)}
            className={`sidebar-item ${location.pathname === item.path ? 'active' : ''} ${item.className || ''}`}
          >
            <div className="sidebar-content">
              {item.icon}
              <span className="ms-2">{item.text}</span>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default AdminSidebar; 