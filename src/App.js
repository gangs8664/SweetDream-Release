import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/global.css';

// Auth Pages
import SignInPage from './pages/Auth/SignInPage';
import SignUpPage from './pages/Auth/SignUpPage';
import FindIdPage from './pages/Auth/FindIdPage';
import FindPasswordPage from './pages/Auth/FindPasswordPage';

// User Pages
import MainPage from './pages/Dashboard/MainPage';
import SettingsPage from './pages/Dashboard/SettingsPage';
import Function1 from './pages/Dashboard/Function1';
import Function2 from './pages/Dashboard/Function2';
import Function3 from './pages/Dashboard/Function3';
import Function4 from './pages/Dashboard/Function4';

// Settings Pages
import ProfileSettings from './pages/Settings/ProfileSettings';
import PasswordChange from './pages/Settings/PasswordChange';
import NotificationSettings from './pages/Settings/NotificationSettings';
import Announcements from './pages/Settings/Announcements';
import CustomerService from './pages/Settings/CustomerService';
import LogoutConfirm from './pages/Settings/LogoutConfirm';
import DeleteAccount from './pages/Settings/DeleteAccount';

// Admin Pages
import AdminDashboard from './pages/Admin/Dashboard';
import MemberList from './pages/Admin/Members/List';
import MemberEdit from './pages/Admin/Members/Edit';
import RoleManagement from './pages/Admin/Roles/RoleManagement';
import AnnouncementManagement from './pages/Admin/Announcements/AnnouncementManagement';
import NotificationManagement from './pages/Admin/Notifications/NotificationManagement';
import SupportManagement from './pages/Admin/Support/SupportManagement';
import LogAnalysis from './pages/Admin/Logs/LogAnalysis';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/auth/signin" element={<SignInPage />} />
        <Route path="/auth/signup" element={<SignUpPage />} />
        <Route path="/auth/findid" element={<FindIdPage />} />
        <Route path="/auth/findpassword" element={<FindPasswordPage />} />

        {/* User Routes */}
        <Route path="/dashboard" element={<MainPage />} />
        <Route path="/dashboard/function1" element={<Function1 />} />
        <Route path="/dashboard/function2" element={<Function2 />} />
        <Route path="/dashboard/function3" element={<Function3 />} />
        <Route path="/dashboard/function4" element={<Function4 />} />

        {/* Settings Routes */}
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/settings/profile" element={<ProfileSettings />} />
        <Route path="/settings/password" element={<PasswordChange />} />
        <Route path="/settings/notifications" element={<NotificationSettings />} />
        <Route path="/settings/announcements" element={<Announcements />} />
        <Route path="/settings/support" element={<CustomerService />} />
        <Route path="/settings/logout" element={<LogoutConfirm />} />
        <Route path="/settings/delete" element={<DeleteAccount />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/members" element={<MemberList />} />
        <Route path="/admin/members/:id/edit" element={<MemberEdit />} />
        <Route path="/admin/roles" element={<RoleManagement />} />
        <Route path="/admin/announcements" element={<AnnouncementManagement />} />
        <Route path="/admin/notifications" element={<NotificationManagement />} />
        <Route path="/admin/support" element={<SupportManagement />} />
        <Route path="/admin/logs" element={<LogAnalysis />} />

        {/* Default Route */}
        <Route path="/" element={<SignInPage />} />
      </Routes>
    </Router>
  );
}

export default App;
