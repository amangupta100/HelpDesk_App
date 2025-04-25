
import React from 'react';
import { Navigate } from 'react-router-dom';

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return <Navigate to="/login" />;
  return allowedRoles.includes(user.role) ? children : <Navigate to="/dashboard" />;
};

export default RoleBasedRoute;
