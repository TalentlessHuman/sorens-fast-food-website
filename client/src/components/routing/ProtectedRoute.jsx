import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // For now, we'll check for a token in localStorage.
  // We will improve this with Context API later.
  const token = localStorage.getItem('token');

  if (!token) {
    // If no token, redirect to the admin login page
    return <Navigate to="/admin" />;
  }

  // If there is a token, render the child component (the dashboard)
  return children;
};

export default ProtectedRoute;