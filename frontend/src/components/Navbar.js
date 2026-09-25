import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

// PLACEHOLDER: the original Navbar was not included in the upload.
const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/customer-acquisition', label: 'Acquisition' },
  { to: '/loyalty', label: 'Loyalty' },
  { to: '/events', label: 'Events' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/settings', label: 'Settings' },
];

const Navbar = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        OutReach AI
      </Typography>
      <Box>
        {links.map((link) => (
          <Button key={link.to} color="inherit" component={RouterLink} to={link.to}>
            {link.label}
          </Button>
        ))}
      </Box>
    </Toolbar>
  </AppBar>
);

export default Navbar;
