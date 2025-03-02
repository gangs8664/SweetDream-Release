import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  PersonFill,
  BellFill,
  MegaphoneFill,
  QuestionCircleFill,
  BoxArrowRight,
  TrashFill
} from "react-bootstrap-icons";
import "./SettingsSidebar.css";

const SettingsSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const settingsMenu = [
    {
      icon: <PersonFill size={20} />,
      title: "Profile Settings",
      path: "/settings/profile"
    },
    {
      icon: <MegaphoneFill size={20} />,
      title: "Announcements",
      path: "/settings/announcements"
    },
    {
      icon: <BellFill size={20} />,
      title: "Notifications",
      path: "/settings/notifications"
    },
    {
      icon: <QuestionCircleFill size={20} />,
      title: "Customer Service",
      path: "/settings/support"
    },
    {
      icon: <BoxArrowRight size={20} />,
      title: "Logout",
      path: "/settings/logout",
      warning: true
    },
    {
      icon: <TrashFill size={20} />,
      title: "Delete Account",
      path: "/settings/delete",
      danger: true
    }
  ];

  return (
    <div className="settings-sidebar">
      {settingsMenu.map((item, index) => (
        <div
          key={index}
          className={`settings-sidebar-item ${location.pathname === item.path ? 'active' : ''} 
            ${item.warning ? 'warning' : ''} ${item.danger ? 'danger' : ''}`}
          onClick={() => navigate(item.path)}
        >
          <span className="settings-sidebar-icon">{item.icon}</span>
          <span className="settings-sidebar-text">{item.title}</span>
        </div>
      ))}
    </div>
  );
};

export default SettingsSidebar;