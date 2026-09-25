import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Button,
  Radio,
  RadioGroup,
  Alert,
  CircularProgress,
} from '@mui/material';
import { BUSINESS_TYPES } from '../utils/businessTypes';
import { useBusinessType } from '../utils/useBusinessType';
import { getErrorMessage } from '../utils/api';

const BusinessTypeSelection = () => {
  const navigate = useNavigate();
  const { businessType: current, selectBusinessType } = useBusinessType();
  const [selectedId, setSelectedId] = useState(current?.id ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleContinue = async () => {
    setSaving(true);
    setError('');
    try {
      await selectBusinessType(selectedId);
      navigate('/dashboard');
    } catch (err) {
      setError(getErrorMessage(err, 'Could not save your business type. Please try again.'));
      setSaving(false);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1100, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        What type of business do you run?
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        We&apos;ll customize your outreach experience based on your industry.
      </Typography>

      <RadioGroup
        name="business-type"
        value={selectedId}
        onChange={(event) => setSelectedId(event.target.value)}
        sx={{ mb: 3 }}
      >
        <Grid container spacing={2}>
          {BUSINESS_TYPES.map(({ id, name, description, icon: Icon }) => {
            const selected = selectedId === id;
            return (
              <Grid item xs={12} sm={6} md={4} key={id}>
                <Card
                  variant="outlined"
                  sx={{
                    height: '100%',
                    borderWidth: 2,
                    borderColor: selected ? 'primary.main' : 'divider',
                  }}
                >
                  <CardActionArea
                    onClick={() => setSelectedId(id)}
                    sx={{ height: '100%' }}
                    tabIndex={-1}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Icon color={selected ? 'primary' : 'action'} />
                        <Typography variant="h6" component="h2" sx={{ ml: 1, flexGrow: 1 }}>
                          {name}
                        </Typography>
                        <Radio value={id} inputProps={{ 'aria-label': name }} />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </RadioGroup>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleContinue}
          disabled={!selectedId || saving}
          sx={{ minWidth: 140 }}
        >
          {saving ? <CircularProgress size={24} aria-label="Saving" /> : 'Continue'}
        </Button>
      </Box>
    </Box>
  );
};

export default BusinessTypeSelection;
