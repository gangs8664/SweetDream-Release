import { Navigate } from 'react-router-dom';
import DashboardLayout from '../components/Layout/DashboardLayout';

// Auth Pages
import SignInPage from '../pages/Auth/SignInPage';
import SignUpPage from '../pages/Auth/SignUpPage';
import FindIdPage from '../pages/Auth/FindIdPage';
import FindPasswordPage from '../pages/Auth/FindPasswordPage';

// Dashboard Pages
import MainPage from '../pages/Dashboard/MainPage';
import Function1 from '../pages/Dashboard/Function1';
import Function2 from '../pages/Dashboard/Function2';
import Function3 from '../pages/Dashboard/Function3';
import Function4 from '../pages/Dashboard/Function4';

// Settings Pages
import SettingsPage from '../pages/Dashboard/SettingsPage';
import ProfileSettings from '../pages/Settings/ProfileSettings';
import PasswordChange from '../pages/Settings/PasswordChange';
import NotificationSettings from '../pages/Settings/NotificationSettings';
import Announcements from '../pages/Settings/Announcements';
import CustomerService from '../pages/Settings/CustomerService';
import LogoutConfirm from '../pages/Settings/LogoutConfirm';
import DeleteAccount from '../pages/Settings/DeleteAccount';

// Admin Pages
import AdminDashboard from '../pages/Admin/Dashboard';
import MemberList from '../pages/Admin/Members/List';
import MemberEdit from '../pages/Admin/Members/Edit';
import RoleManagement from '../pages/Admin/Roles/RoleManagement';
import AnnouncementManagement from '../pages/Admin/Announcements/AnnouncementManagement';
import NotificationManagement from '../pages/Admin/Notifications/NotificationManagement';
import SupportManagement from '../pages/Admin/Support/SupportManagement';
import LogAnalysis from '../pages/Admin/Logs/LogAnalysis';

// 더미 데이터만 남기기
export const dummyUsers = {
  user: {
    userId: "testuser123",
    password: "Password123!",
    role: "USER"
  },
  admin: {
    userId: "admin123",
    password: "Admin123!",
    role: "ADMIN"
  }
};

// 라우트 상수
export const ROUTES = {
  SIGN_IN: '/auth/signin',
  SIGN_UP: '/auth/signup',
  FIND_ID: '/auth/findid',
  FIND_PASSWORD: '/auth/findpassword',
  DASHBOARD: '/',
  SETTINGS: '/settings',
  PROFILE: '/settings/profile',
  ADMIN: '/admin'
};

export const publicRoutes = [
  {
    path: ROUTES.SIGN_IN,
    element: <SignInPage />
  },
  {
    path: ROUTES.SIGN_UP,
    element: <SignUpPage />
  },
  {
    path: ROUTES.FIND_ID,
    element: <FindIdPage />
  },
  {
    path: ROUTES.FIND_PASSWORD,
    element: <FindPasswordPage />
  }
];

export const privateRoutes = [
  {
    path: ROUTES.DASHBOARD,
    element: <DashboardLayout />,
    children: [
      {
        path: '',
        element: <AdminDashboard />
      }
      // 다른 관리자 라우트들은 일단 주석 처리
      // {
      //   path: 'members',
      //   element: <MemberList />
      // },
      // {
      //   path: 'members/:id/edit',
      //   element: <MemberEdit />
      // },
      // ...
    ]
  },
  {
    path: ROUTES.SETTINGS,
    element: <DashboardLayout />,
    children: [
      {
        path: '',
        element: <SettingsPage />
      },
      {
        path: 'profile',
        element: <ProfileSettings />
      },
      {
        path: 'password',
        element: <PasswordChange />
      },
      {
        path: 'notifications',
        element: <NotificationSettings />
      },
      {
        path: 'announcements',
        element: <Announcements />
      },
      {
        path: 'customer-service',
        element: <CustomerService />
      },
      {
        path: 'logout',
        element: <LogoutConfirm />
      },
      {
        path: 'delete-account',
        element: <DeleteAccount />
      }
    ]
  }
]; 