import React, { useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  People,
  Star,
  Event,
  Assessment,
  Settings,
  SwapHoriz,
} from '@mui/icons-material';
import { useBusinessType } from '../utils/BusinessTypeContext';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: Dashboard, path: '/dashboard' },
  { label: 'Customer Acquisition', icon: People, path: '/customer-acquisition' },
  { label: 'Loyalty Program', icon: Star, path: '/loyalty' },
  { label: 'Events', icon: Event, path: '/events' },
  { label: 'Analytics', icon: Assessment, path: '/analytics' },
  { label: 'Settings', icon: Settings, path: '/settings' },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { businessType } = useBusinessType();
  const [anchorEl, setAnchorEl] = useState(null);

  const goTo = (path) => {
    setAnchorEl(null);
    navigate(path);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to={businessType ? '/dashboard' : '/'}
          sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
        >
          LocalBoost
        </Typography>

        {/* Inline links on wide screens; the menu covers them on small screens */}
        <Box component="nav" sx={{ display: { xs: 'none', lg: 'flex' } }}>
          {NAV_ITEMS.map(({ label, icon: Icon, path }) => (
            <Button
              key={path}
              component={RouterLink}
              to={path}
              color="inherit"
              startIcon={<Icon />}
              aria-current={pathname === path ? 'page' : undefined}
              sx={{
                mr: 1,
                backgroundColor: pathname === path ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              }}
            >
              {label}
            </Button>
          ))}
        </Box>

        <IconButton
          color="inherit"
          aria-label="Open menu"
          aria-controls={anchorEl ? 'app-menu' : undefined}
          aria-haspopup="true"
          onClick={(event) => setAnchorEl(event.currentTarget)}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="app-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          {NAV_ITEMS.map(({ label, icon: Icon, path }) => (
            <MenuItem
              key={path}
              selected={pathname === path}
              onClick={() => goTo(path)}
              sx={{ display: { lg: 'none' } }}
            >
              <ListItemIcon>
                <Icon fontSize="small" />
              </ListItemIcon>
              <ListItemText>{label}</ListItemText>
            </MenuItem>
          ))}
          <Divider sx={{ display: { lg: 'none' } }} />
          <MenuItem onClick={() => goTo('/')}>
            <ListItemIcon>
              <SwapHoriz fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Change business type"
              secondary={businessType ? `Currently: ${businessType.name}` : undefined}
            />
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
