import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute - Guards routes based on authentication and role
 * @param {object} props
 * @param {React.ReactNode} props.children - The component to render if authorized
 * @param {string} [props.requiredRole] - Optional role required ('customer' or 'admin')
 */
const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('userType');

  // Not logged in
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  // Role check
  if (requiredRole && userType !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
