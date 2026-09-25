import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import { Restaurant, Build, ShoppingBag, Spa, LocalFlorist } from '@mui/icons-material';

const BusinessTypeSelection = ({ onNext }) => {
  const [businessType, setBusinessType] = useState('');

  const businessTypes = [
    {
      id: 'food',
      name: 'Food & Dining',
      icon: <Restaurant />,
      description: 'Restaurants, cafes, bakeries, bars',
    },
    {
      id: 'personal',
      name: 'Personal Services',
      icon: <Spa />,
      description: 'Salons, tattoo parlors, spas, barbershops',
    },
    {
      id: 'home',
      name: 'Home Services',
      icon: <Build />,
      description: 'Contractors, remodelers, auto repair, cleaning',
    },
    {
      id: 'retail',
      name: 'Retail',
      icon: <ShoppingBag />,
      description: 'Pet stores, specialty shops, boutiques',
    },
    {
      id: 'health',
      name: 'Health & Wellness',
      icon: <LocalFlorist />,
      description: 'Alternative health, fitness, therapy',
    },
  ];

  const handleNext = () => {
    if (businessType) {
      onNext(businessType);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        What type of business do you run?
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        We'll customize your outreach experience based on your industry
      </Typography>

      <RadioGroup
        value={businessType}
        onChange={(e) => setBusinessType(e.target.value)}
        sx={{ mb: 3 }}
      >
        <Grid container spacing={2}>
          {businessTypes.map((type) => (
            <Grid item xs={12} sm={6} md={4} key={type.id}>
              <Card
                sx={{
                  cursor: 'pointer',
                  position: 'relative',
                  border: businessType === type.id ? '2px solid' : '1px solid',
                  borderColor: businessType === type.id ? 'primary.main' : 'grey.300',
                  '&:hover': {
                    boxShadow: 3,
                  },
                }}
                onClick={() => setBusinessType(type.id)}
              >
                <CardContent>
                  <FormControlLabel
                    value={type.id}
                    control={<Radio />}
                    label=""
                    sx={{ position: 'absolute', right: 10, top: 10 }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {type.icon}
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      {type.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {type.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </RadioGroup>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleNext}
          disabled={!businessType}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default BusinessTypeSelection;