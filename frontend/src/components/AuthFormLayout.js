import React from 'react';
import { Box, Container, Paper, Typography, Alert, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// Shared frame for the sign-in and sign-up forms
const AuthFormLayout = ({ title, subtitle, error, onSubmit, children, footerText, footerLink, footerTo }) => (
  <Container component="main" maxWidth="sm">
    <Box sx={{ mt: 8, mb: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 3, sm: 4 } }}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 2 }}>
          {subtitle}
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={onSubmit} noValidate>
          {children}
        </Box>
        <Typography variant="body2" align="center">
          {footerText}{' '}
          <Link component={RouterLink} to={footerTo}>
            {footerLink}
          </Link>
        </Typography>
      </Paper>
    </Box>
  </Container>
);

export default AuthFormLayout;
