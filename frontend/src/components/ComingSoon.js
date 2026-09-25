import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

// Shared layout for pages whose features haven't been built yet
const ComingSoon = ({ title, description }) => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" component="h1" gutterBottom>
      {title}
    </Typography>
    <Paper sx={{ p: 3 }}>
      <Typography color="text.secondary">{description}</Typography>
      <Typography variant="overline" color="primary" sx={{ display: 'block', mt: 2 }}>
        Coming soon
      </Typography>
    </Paper>
  </Box>
);

export default ComingSoon;
