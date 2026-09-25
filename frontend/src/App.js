import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import CustomerAcquisition from './pages/CustomerAcquisition';
import LoyaltyProgram from './pages/LoyaltyProgram';
import EventPromotion from './pages/EventPromotion';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import BusinessTypeSelection from './pages/BusinessTypeSelection';

const theme = createTheme({
  palette: {
    primary: {
      main: '#e63946', // Business red
    },
    secondary: {
      main: '#f1faee', // Cream
    },
    background: {
      default: '#f8f9fa',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<BusinessTypeSelection />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customer-acquisition" element={<CustomerAcquisition />} />
          <Route path="/loyalty" element={<LoyaltyProgram />} />
          <Route path="/events" element={<EventPromotion />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;