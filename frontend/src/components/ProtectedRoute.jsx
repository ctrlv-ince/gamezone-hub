import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getToken } from '../utils/auth';

const ProtectedRoute = () => {
  const token = getToken();

  if (!token) {
    toast.error('You must be logged in to access this page.');
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;