import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { useAuth } from '../context/auth';
import Navbar from './Navbar';

// Layout for signed-in pages: shows the Navbar, or sends visitors to sign in
// and brings them back to the page they asked for afterwards
const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress aria-label="Loading" />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
