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
import {
  Restaurant,
  Healing,
  HomeRepairService,
  Storefront,
  ContentCut,
  Pets,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const BusinessTypeSelection = () => {
  const [businessType, setBusinessType] = useState('');
  const navigate = useNavigate();

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
      icon: <ContentCut />,
      description: 'Salons, tattoo parlors, spas, barbershops',
    },
    {
      id: 'home',
      name: 'Home Services',
      icon: <HomeRepairService />,
      description: 'Contractors, remodelers, auto repair, cleaning',
    },
    {
      id: 'retail',
      name: 'Retail',
      icon: <Storefront />,
      description: 'Pet stores, specialty shops, boutiques',
    },
    {
      id: 'health',
      name: 'Health & Wellness',
      icon: <Healing />,
      description: 'Alternative health, fitness, therapy',
    },
    {
      id: 'pets',
      name: 'Pet Services',
      icon: <Pets />,
      description: 'Groomers, trainers, pet stores, veterinarians',
    },
  ];

  const handleNext = () => {
    if (businessType) {
      // Store business type in localStorage for use throughout the app
      localStorage.setItem('businessType', businessType);
      navigate('/dashboard');
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