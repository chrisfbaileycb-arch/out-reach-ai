export const personalServiceTemplates = [
  {
    name: 'Appointment Reminder',
    subject: 'Your appointment is coming up',
    body: 'Hi [first_name], just a friendly reminder about your appointment on [date] at [time]. We look forward to seeing you!',
    timing: '2 days before appointment'
  },
  {
    name: 'Rebooking Campaign',
    subject: 'Time for your next appointment?',
    body: 'Hi [first_name], it\'s been [time_since_last] since your last visit. Ready to book your next [service_type]? Reply to this message or book online at [booking_link].',
    timing: 'Based on service interval'
  },
  {
    name: 'New Service Promotion',
    subject: 'Introducing our new [service_name]!',
    body: 'Hi [first_name], we\'re excited to introduce our new [service_name]! As a valued client, you get [discount_percentage]% off your first booking. [booking_link]',
    timing: 'One-time campaign'
  }
];