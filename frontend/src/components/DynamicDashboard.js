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
  Chip,
} from '@mui/material';
import {
  People,
  TrendingUp,
  Event,
  Star,
  Add,
  CalendarToday,
  Assignment,
  LocalOffer,
} from '@mui/icons-material';

const DynamicDashboard = ({ businessType }) => {
  const [stats, setStats] = useState({
    newCustomers: 47,
    repeatCustomers: 156,
    upcomingEvents: 3,
    reviewsThisMonth: 28,
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, action: 'New customer campaign sent', time: '2 hours ago' },
    { id: 2, action: '12 appointments booked from email', time: '5 hours ago' },
    { id: 3, action: 'Seasonal promotion scheduled', time: '1 day ago' },
    { id: 4, action: 'Review request sent to 23 customers', time: '2 days ago' },
  ]);

  const getBusinessSpecificContent = () => {
    switch (businessType) {
      case 'food':
        return {
          statLabels: ['New Diners', 'Regulars', 'Events', 'Reviews'],
          quickActions: [
            'Create New Campaign',
            'Promote Special Menu',
            'Request Reviews',
            'View Analytics',
          ],
          recentActivities: [
            'New customer campaign sent',
            '12 reservations from email campaign',
            'Wine tasting promotion scheduled',
            'New review request sent',
          ],
        };
      case 'personal':
        return {
          statLabels: ['New Clients', 'Return Clients', 'Appointments', 'Reviews'],
          quickActions: [
            'Create New Campaign',
            'Schedule Reminders',
            'Promote New Services',
            'View Analytics',
          ],
          recentActivities: [
            'Appointment reminder campaign sent',
            '15 rebookings from outreach',
            'New service promotion scheduled',
            'Portfolio showcase sent to prospects',
          ],
        };
      case 'home':
        return {
          statLabels: ['New Jobs', 'Repeat Clients', 'Quotes', 'Reviews'],
          quickActions: [
            'Create New Campaign',
            'Seasonal Maintenance',
            'Quote Follow-ups',
            'View Analytics',
          ],
          recentActivities: [
            'Seasonal maintenance reminders sent',
            '8 quotes requested from campaign',
            'Project showcase sent to neighborhood',
            'Completion follow-ups scheduled',
          ],
        };
      case 'retail':
        return {
          statLabels: ['New Shoppers', 'Regulars', 'Promotions', 'Reviews'],
          quickActions: [
            'Create New Campaign',
            'Promote Products',
            'Restock Reminders',
            'View Analytics',
          ],
          recentActivities: [
            'New product announcement sent',
            '23 click-throughs to products',
            'Seasonal sale promotion scheduled',
            'Loyalty program invites sent',
          ],
        };
      case 'health':
        return {
          statLabels: ['New Patients', 'Returning', 'Sessions', 'Reviews'],
          quickActions: [
            'Create New Campaign',
            'Appointment Reminders',
            'Wellness Tips',
            'View Analytics',
          ],
          recentActivities: [
            'Wellness newsletter sent',
            '17 appointments booked',
            'Seasonal health tips scheduled',
            'New patient welcome sequence sent',
          ],
        };
      default:
        return {
          statLabels: ['New Customers', 'Repeat Customers', 'Events', 'Reviews'],
          quickActions: [
            'Create New Campaign',
            'Schedule Promotion',
            'Request Reviews',
            'View Analytics',
          ],
          recentActivities: [
            'New customer campaign sent',
            '12 conversions from campaign',
            'Promotion scheduled',
            'Review request sent',
          ],
        };
    }
  };

  const businessContent = getBusinessSpecificContent();

  const getIconForStat = (index) => {
    switch (index) {
      case 0: return <People color="primary" sx={{ fontSize: 40, mr: 2 }} />;
      case 1: return <TrendingUp color="primary" sx={{ fontSize: 40, mr: 2 }} />;
      case 2: return <Event color="primary" sx={{ fontSize: 40, mr: 2 }} />;
      case 3: return <Star color="primary" sx={{ fontSize: 40, mr: 2 }} />;
      default: return <People color="primary" sx={{ fontSize: 40, mr: 2 }} />;
    }
  };

  const getIconForAction = (index) => {
    switch (index) {
      case 0: return <Add />;
      case 1: return <CalendarToday />;
      case 2: return <LocalOffer />;
      case 3: return <Assignment />;
      default: return <Add />;
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          {businessType === 'food' ? 'Restaurant' :
           businessType === 'personal' ? 'Personal Services' :
           businessType === 'home' ? 'Home Services' :
           businessType === 'retail' ? 'Retail' :
           businessType === 'health' ? 'Health & Wellness' :
           'Business'} Dashboard
        </Typography>
        <Chip label={`Business Type: ${businessType}`} color="primary" variant="outlined" />
      </Box>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        {[0, 1, 2, 3].map((index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  {getIconForStat(index)}
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      {businessContent.statLabels[index]}
                    </Typography>
                    <Typography variant="h5">
                      {Object.values(stats)[index]}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {businessContent.quickActions.map((action, index) => (
              <Button
                key={index}
                variant={index === 0 ? "contained" : "outlined"}
                fullWidth
                startIcon={getIconForAction(index)}
                sx={{ mb: 1 }}
              >
                {action}
              </Button>
            ))}
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
              {businessContent.recentActivities.map((activity, index) => (
                <ListItem key={index} divider={index < businessContent.recentActivities.length - 1}>
                  <ListItemText
                    primary={activity}
                    secondary={recentActivity[index]?.time || 'Recently'}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DynamicDashboard;