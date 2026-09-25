import React from 'react';
import { Navigate } from 'react-router-dom';
import DynamicDashboard from '../components/DynamicDashboard';
import { useBusinessType } from '../utils/BusinessTypeContext';

// The dashboard only makes sense once a business type has been chosen
const Dashboard = () => {
  const { businessType } = useBusinessType();
  if (!businessType) {
    return <Navigate to="/onboarding" replace />;
  }
  return <DynamicDashboard businessType={businessType} />;
};

export default Dashboard;
