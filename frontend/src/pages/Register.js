import React, { useEffect, useState } from 'react';
import { Grid, TextField, Button, CircularProgress } from '@mui/material';
import { useAuth } from '../context/auth';
import AuthFormLayout from '../components/AuthFormLayout';

const MIN_PASSWORD_LENGTH = 8; // matches backend/routes/auth.js

const Register = () => {
  const { register, error, clearErrors } = useAuth();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => clearErrors, [clearErrors]);

  const passwordTooShort = formData.password.length > 0 && formData.password.length < MIN_PASSWORD_LENGTH;

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    // On success PublicOnlyRoute moves the new user on to pick a business type
    try {
      await register(formData);
    } catch {
      setSubmitting(false);
    }
  };

  return (
    <AuthFormLayout
      title="Create Your Account"
      subtitle="Start bringing in more local customers."
      error={error}
      onSubmit={onSubmit}
      footerText="Already have an account?"
      footerLink="Sign in"
      footerTo="/login"
    >
      <Grid container spacing={2} sx={{ mt: 0 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="given-name"
            autoFocus
            value={formData.firstName}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            value={formData.lastName}
            onChange={onChange}
          />
        </Grid>
      </Grid>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        type="email"
        autoComplete="email"
        value={formData.email}
        onChange={onChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="new-password"
        value={formData.password}
        onChange={onChange}
        error={passwordTooShort}
        helperText={`At least ${MIN_PASSWORD_LENGTH} characters`}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, py: 1.5 }}
        disabled={submitting}
      >
        {submitting ? <CircularProgress size={24} aria-label="Creating account" /> : 'Create Account'}
      </Button>
    </AuthFormLayout>
  );
};

export default Register;
