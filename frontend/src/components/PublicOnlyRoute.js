import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/auth';

// Landing, login and register are for signed-out visitors. This is the one place
// that decides where someone goes once signed in: back to the page that sent them
// to sign in, or the dashboard (which asks new accounts for their business type).
// It redirects even while a stored session is being verified; protected pages
// show a spinner meanwhile instead of flashing the landing page.
const PublicOnlyRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (isAuthenticated) {
    return <Navigate to={location.state?.from?.pathname || '/dashboard'} replace />;
  }
  return <Outlet />;
};

export default PublicOnlyRoute;
