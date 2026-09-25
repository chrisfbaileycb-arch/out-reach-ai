import React, { useState } from 'react';
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
} from '@mui/material';
import {
  People,
  TrendingUp,
  Event,
  Star,
  Add,
} from '@mui/icons-material';

const Dashboard = () => {
  const [stats, setStats] = useState({
    newCustomers: 47,
    repeatCustomers: 156,
    upcomingEvents: 3,
    reviewsThisMonth: 28,
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, action: 'New customer campaign sent', time: '2 hours ago' },
    { id: 2, action: '12 reservations from email campaign', time: '5 hours ago' },
    { id: 3, action: 'Birthday promotion scheduled', time: '1 day ago' },
    { id: 4, action: 'New review request sent', time: '2 days ago' },
  ]);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Restaurant Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <People color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    New Customers
                  </Typography>
                  <Typography variant="h5">
                    {stats.newCustomers}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <TrendingUp color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Repeat Customers
                  </Typography>
                  <Typography variant="h5">
                    {stats.repeatCustomers}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Event color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Upcoming Events
                  </Typography>
                  <Typography variant="h5">
                    {stats.upcomingEvents}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Star color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Reviews This Month
                  </Typography>
                  <Typography variant="h5">
                    {stats.reviewsThisMonth}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<Add />}
              sx={{ mb: 1 }}
            >
              Create New Campaign
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{ mb: 1 }}
            >
              Schedule Event Promotion
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{ mb: 1 }}
            >
              Send Review Requests
            </Button>
            <Button
              variant="outlined"
              fullWidth
            >
              View Analytics
            </Button>
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              {recentActivity.map((activity, index) => (
                <ListItem key={activity.id} divider={index < recentActivity.length - 1}>
                  <ListItemText primary={activity.action} secondary={activity.time} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
