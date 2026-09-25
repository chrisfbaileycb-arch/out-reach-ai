import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  CheckCircle,
  People,
  TrendingUp,
  Email,
  CalendarToday,
  Star,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { BUSINESS_TYPES } from '../utils/businessTypes';

const FEATURES = [
  {
    icon: <People />,
    title: 'Find Local Customers',
    description: 'Connect with people in your neighborhood who are looking for businesses like yours.',
  },
  {
    icon: <Email />,
    title: 'Personalized Outreach',
    description: 'Send targeted messages that resonate with your specific customer base.',
  },
  {
    icon: <CalendarToday />,
    title: 'Automated Follow-ups',
    description: 'Set up sequences that keep customers coming back without manual effort.',
  },
  {
    icon: <TrendingUp />,
    title: 'Track Results',
    description: "See exactly how many customers you're bringing in and what's working best.",
  },
  {
    icon: <Star />,
    title: 'Build Your Reputation',
    description: 'Generate more reviews and build your standing in the community.',
  },
];

const STEPS = [
  {
    title: 'Tell Us About Your Business',
    description:
      "Select your business type and share what makes you special. We'll customize everything to your industry.",
  },
  {
    title: 'Choose Your Outreach Type',
    description: 'Select from proven templates for new customers, loyalty building, or event promotion.',
  },
  {
    title: 'Launch Your Campaign',
    description: 'We handle the technical stuff while you watch new customers come through your door.',
  },
];

const LandingPage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                component="h1"
                variant="h3"
                gutterBottom
                fontWeight="bold"
              >
                Fill Your Business With Local Customers
              </Typography>
              <Typography variant="h6" paragraph>
                The simple outreach tool that brings in more customers while you focus on running your business.
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  component={RouterLink}
                  to="/register"
                  sx={{ mr: 2, px: 4, py: 1.5 }}
                >
                  Get Started Free
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  component={RouterLink}
                  to="/login"
                  sx={{ px: 4, py: 1.5 }}
                >
                  Sign In
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={8}
                sx={{
                  p: 4,
                  borderRadius: 2,
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Typography variant="h5" component="h2" gutterBottom>
                  Perfect for:
                </Typography>
                <List>
                  {BUSINESS_TYPES.map(({ id, name }) => (
                    <ListItem key={id} sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ color: 'white' }}>
                        <CheckCircle />
                      </ListItemIcon>
                      <ListItemText primary={name} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ py: 8, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h3"
            textAlign="center"
            gutterBottom
          >
            How It Works
          </Typography>
          <Typography variant="h6" textAlign="center" color="text.secondary" paragraph>
            Three simple steps to start bringing in more customers
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {STEPS.map((step, index) => (
              <Grid item xs={12} md={4} key={step.title}>
                <Card sx={{ height: '100%', p: 2, textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: 'primary.main',
                      color: 'white',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      fontSize: '2rem',
                      fontWeight: 'bold',
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {step.title}
                  </Typography>
                  <Typography>{step.description}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h3"
            textAlign="center"
            gutterBottom
          >
            Everything You Need to Grow
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {FEATURES.map((feature) => (
              <Grid item xs={12} md={4} key={feature.title}>
                <Card sx={{ height: '100%', p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ color: 'primary.main', mr: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" component="h3">
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 8, bgcolor: 'primary.main', color: 'white' }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Ready to Grow Your Business?
          </Typography>
          <Typography variant="h6" paragraph>
            Join the local businesses using LocalBoost to bring in more customers.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={RouterLink}
            to="/register"
            sx={{ px: 4, py: 1.5 }}
          >
            Start Your Free Trial
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
