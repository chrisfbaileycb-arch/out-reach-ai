import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { BusinessTypeProvider } from './utils/BusinessTypeContext';
import Navbar from './components/Navbar';
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
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<BusinessTypeSelection />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customer-acquisition" element={<CustomerAcquisition />} />
            <Route path="/loyalty" element={<LoyaltyProgram />} />
            <Route path="/events" element={<EventPromotion />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </BusinessTypeProvider>
    </ThemeProvider>
  );
}

export default App;
