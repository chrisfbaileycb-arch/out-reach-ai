import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  People,
  TrendingUp,
  Event,
  Star,
  Add,
  CalendarToday,
  LocalOffer,
  Assessment,
} from '@mui/icons-material';

// Placeholder figures until customer data comes from the backend
const SAMPLE_STAT_VALUES = [47, 156, 3, 28];
const SAMPLE_ACTIVITY_TIMES = ['2 hours ago', '5 hours ago', '1 day ago', '2 days ago'];

const STAT_ICONS = [People, TrendingUp, Event, Star];

const DynamicDashboard = ({ businessType }) => {
  const { name, dashboardTitle, icon: BusinessIcon, statLabels, recentActivity } = businessType;

  // Every type starts with "create" and ends with "analytics"; the middle two are type-specific
  const quickActions = [
    { label: 'Create New Campaign', path: '/customer-acquisition', icon: Add },
    { ...businessType.quickActions[0], icon: CalendarToday },
    { ...businessType.quickActions[1], icon: LocalOffer },
    { label: 'View Analytics', path: '/analytics', icon: Assessment },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <BusinessIcon fontSize="large" color="primary" />
          <Typography variant="h4" component="h1" sx={{ ml: 1 }}>
            {dashboardTitle} Dashboard
          </Typography>
        </Box>
        <Chip label={name} color="primary" variant="outlined" />
      </Box>

      <Grid container spacing={3}>
        {statLabels.map((label, index) => {
          const StatIcon = STAT_ICONS[index];
          return (
            <Grid item xs={12} sm={6} md={3} key={label}>
              <Card>
                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                  <StatIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      {label}
                    </Typography>
                    <Typography variant="h5">{SAMPLE_STAT_VALUES[index]}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Quick Actions
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {quickActions.map(({ label, path, icon: ActionIcon }, index) => (
              <Button
                key={label}
                component={RouterLink}
                to={path}
                variant={index === 0 ? 'contained' : 'outlined'}
                fullWidth
                startIcon={<ActionIcon />}
                sx={{ mb: 1 }}
              >
                {label}
              </Button>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Recent Activity
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              {recentActivity.map((activity, index) => (
                <ListItem key={activity} divider={index < recentActivity.length - 1}>
                  <ListItemText primary={activity} secondary={SAMPLE_ACTIVITY_TIMES[index]} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
        Showing sample data. Real figures will appear once your customer list is connected.
      </Typography>
    </Box>
  );
};

export default DynamicDashboard;
