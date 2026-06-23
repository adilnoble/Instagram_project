import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Dashboard } from '../pages/Dashboard';
import { Users } from '../pages/Users';
import { Profiles } from '../pages/Profiles';
import { Posts } from '../pages/Posts';
import { Reels } from '../pages/Reels';
import { Stories } from '../pages/Stories';
import { Notifications } from '../pages/Notifications';
import { Settings } from '../pages/Settings';
import { AppLayout } from '../layouts/AppLayout';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Private routes inside AppLayout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/posts" replace />} />
        <Route path="posts" element={<Posts />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="profiles" element={<Profiles />} />
        <Route path="profiles/:id" element={<Profiles />} />
        <Route path="reels" element={<Reels />} />
        <Route path="stories" element={<Stories />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/posts" replace />} />
    </Routes>
  );
};
export default AppRoutes;
