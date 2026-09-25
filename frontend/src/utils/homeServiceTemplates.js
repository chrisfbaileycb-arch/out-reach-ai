export const homeServiceTemplates = [
  {
    name: 'Seasonal Maintenance',
    subject: 'Time for [season] [service_type] maintenance',
    body: 'Hi [first_name], [season] is here and it\'s the perfect time to schedule your [service_type] maintenance. We\'re offering [discount] for the next [time_period]. Book now: [booking_link]',
    timing: 'Seasonal'
  },
  {
    name: 'Quote Follow-up',
    subject: 'Following up on your [service_type] quote',
    body: 'Hi [first_name], just wanted to follow up on the quote we sent for your [service_type] project. Do you have any questions I can answer? Reply to this message or call us at [phone_number].',
    timing: '3 days after quote sent'
  },
  {
    name: 'Neighborhood Special',
    subject: 'Special offer for [neighborhood] residents',
    body: 'Hi [first_name], we\'re currently working on a project in your neighborhood and would like to offer [discount] on [service_type] for [neighborhood] residents this month. Limited availability - [booking_link]',
    timing: 'Geographic targeting'
  }
];