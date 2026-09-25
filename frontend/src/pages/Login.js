import React, { useEffect, useState } from 'react';
import { TextField, Button, CircularProgress } from '@mui/material';
import { useAuth } from '../context/auth';
import AuthFormLayout from '../components/AuthFormLayout';

const Login = () => {
  const { login, error, clearErrors } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => clearErrors, [clearErrors]);

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // On success PublicOnlyRoute moves the now signed-in user on
  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await login(formData);
    } catch {
      setSubmitting(false);
    }
  };

  return (
    <AuthFormLayout
      title="Sign In to LocalBoost"
      subtitle="Welcome back! Please sign in to your account."
      error={error}
      onSubmit={onSubmit}
      footerText="Don't have an account?"
      footerLink="Sign up"
      footerTo="/register"
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        type="email"
        autoComplete="email"
        autoFocus
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
        autoComplete="current-password"
        value={formData.password}
        onChange={onChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, py: 1.5 }}
        disabled={submitting}
      >
        {submitting ? <CircularProgress size={24} aria-label="Signing in" /> : 'Sign In'}
      </Button>
    </AuthFormLayout>
  );
};

export default Login;
