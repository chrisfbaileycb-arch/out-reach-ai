import {
  Restaurant,
  ContentCut,
  HomeRepairService,
  Storefront,
  Healing,
  Pets,
} from '@mui/icons-material';
import { TEMPLATES_BY_TYPE } from './templates';

// Single source of truth for every business type the app supports.
// To add a type: add an entry here, a template set in templates.js, and the id in
// backend/config/businessTypes.js. businessTypes.test.js fails until all three agree.
export const BUSINESS_TYPES = [
  {
    id: 'food',
    name: 'Food & Dining',
    dashboardTitle: 'Restaurant',
    description: 'Restaurants, cafes, bakeries, bars',
    icon: Restaurant,
    statLabels: ['New Diners', 'Regulars', 'Events', 'Reviews'],
    quickActions: [
      { label: 'Promote Special Menu', path: '/events' },
      { label: 'Request Reviews', path: '/loyalty' },
    ],
    recentActivity: [
      'New customer campaign sent',
      '12 reservations from email campaign',
      'Wine tasting promotion scheduled',
      'New review request sent',
    ],
  },
  {
    id: 'personal',
    name: 'Personal Services',
    dashboardTitle: 'Personal Services',
    description: 'Salons, tattoo parlors, spas, barbershops',
    icon: ContentCut,
    statLabels: ['New Clients', 'Return Clients', 'Appointments', 'Reviews'],
    quickActions: [
      { label: 'Schedule Reminders', path: '/loyalty' },
      { label: 'Promote New Services', path: '/events' },
    ],
    recentActivity: [
      'Appointment reminder campaign sent',
      '15 rebookings from outreach',
      'New service promotion scheduled',
      'Portfolio showcase sent to prospects',
    ],
  },
  {
    id: 'home',
    name: 'Home Services',
    dashboardTitle: 'Home Services',
    description: 'Contractors, remodelers, auto repair, cleaning',
    icon: HomeRepairService,
    statLabels: ['New Jobs', 'Repeat Clients', 'Quotes', 'Reviews'],
    quickActions: [
      { label: 'Seasonal Maintenance', path: '/events' },
      { label: 'Quote Follow-ups', path: '/customer-acquisition' },
    ],
    recentActivity: [
      'Seasonal maintenance reminders sent',
      '8 quotes requested from campaign',
      'Project showcase sent to neighborhood',
      'Completion follow-ups scheduled',
    ],
  },
  {
    id: 'retail',
    name: 'Retail',
    dashboardTitle: 'Retail',
    description: 'Specialty shops, boutiques, gift stores',
    icon: Storefront,
    statLabels: ['New Shoppers', 'Regulars', 'Promotions', 'Reviews'],
    quickActions: [
      { label: 'Promote Products', path: '/events' },
      { label: 'Restock Reminders', path: '/loyalty' },
    ],
    recentActivity: [
      'New product announcement sent',
      '23 click-throughs to products',
      'Seasonal sale promotion scheduled',
      'Loyalty program invites sent',
    ],
  },
  {
    id: 'health',
    name: 'Health & Wellness',
    dashboardTitle: 'Health & Wellness',
    description: 'Alternative health, fitness, therapy',
    icon: Healing,
    statLabels: ['New Patients', 'Returning', 'Sessions', 'Reviews'],
    quickActions: [
      { label: 'Appointment Reminders', path: '/loyalty' },
      { label: 'Wellness Tips', path: '/events' },
    ],
    recentActivity: [
      'Wellness newsletter sent',
      '17 appointments booked',
      'Seasonal health tips scheduled',
      'New patient welcome sequence sent',
    ],
  },
  {
    id: 'pets',
    name: 'Pet Services',
    dashboardTitle: 'Pet Services',
    description: 'Groomers, trainers, pet stores, veterinarians',
    icon: Pets,
    statLabels: ['New Clients', 'Regulars', 'Appointments', 'Reviews'],
    quickActions: [
      { label: 'Grooming Reminders', path: '/loyalty' },
      { label: 'Product Promotions', path: '/events' },
    ],
    recentActivity: [
      'Grooming reminder campaign sent',
      '12 appointments booked',
      'New pet food promotion scheduled',
      'Pet photo contest announced',
    ],
  },
].map((type) => ({ ...type, templates: TEMPLATES_BY_TYPE[type.id] }));

export const getBusinessType = (id) => BUSINESS_TYPES.find((type) => type.id === id);

// Persisted in localStorage until accounts are wired to the backend.
// Storage can throw (private mode, blocked site data), so fail soft: the
// selection still holds for the session via BusinessTypeContext.
const STORAGE_KEY = 'businessType';

export const loadBusinessTypeId = () => {
  try {
    return getBusinessType(localStorage.getItem(STORAGE_KEY))?.id ?? null;
  } catch {
    return null;
  }
};

export const saveBusinessTypeId = (id) => {
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    // Not persisted; still held in memory for this session
  }
};
