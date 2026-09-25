import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { BusinessTypeProvider } from './utils/BusinessTypeContext';
import { AuthProvider } from './context/auth';
import ProtectedRoute from './components/ProtectedRoute';
import PublicOnlyRoute from './components/PublicOnlyRoute';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import BusinessTypeSelection from './pages/BusinessTypeSelection';
import Dashboard from './pages/Dashboard';
import CustomerAcquisition from './pages/CustomerAcquisition';
import LoyaltyProgram from './pages/LoyaltyProgram';
import EventPromotion from './pages/EventPromotion';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BusinessTypeProvider>
        <AuthProvider>
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
              <Route element={<PublicOnlyRoute />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route path="/onboarding" element={<BusinessTypeSelection />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/customer-acquisition" element={<CustomerAcquisition />} />
                <Route path="/loyalty" element={<LoyaltyProgram />} />
                <Route path="/events" element={<EventPromotion />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </AuthProvider>
      </BusinessTypeProvider>
    </ThemeProvider>
  );
}

export default App;
