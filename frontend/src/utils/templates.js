// templates.js

// Personal Service Templates
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

// Home Service Templates
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

// Retail Templates
export const retailTemplates = [
  {
    name: 'New Product Announcement',
    subject: 'Check out our new [product_category]!',
    body: 'Hi [first_name], we just got in a new selection of [product_category] that we think you\'ll love. Come check them out this week and get [discount]% off your purchase!',
    timing: 'One-time campaign'
  },
  {
    name: 'Restock Reminder',
    subject: 'Time to restock on [product_name]',
    body: 'Hi [first_name], it looks like it\'s been about [time_since_last] since you purchased [product_name]. We just restocked with the latest selection. Reply to this message to reserve yours!',
    timing: 'Based on purchase history'
  },
  {
    name: 'Seasonal Sale',
    subject: '[season] Sale is on now!',
    body: 'Hi [first_name], our [season] sale is happening now with up to [discount]% off on [product_category]. Don\'t miss out - sale ends [end_date]!',
    timing: 'Seasonal promotion'
  }
];

// Food Service Templates
export const foodServiceTemplates = [
  {
    name: 'New Customer Welcome',
    subject: 'A special welcome from [restaurant_name]',
    body: 'Hi [first_name], thanks for your interest in [restaurant_name]! We\'d like to invite you to try us with a special offer: [offer_description]. We look forward to serving you soon!',
    timing: 'One-time campaign'
  },
  {
    name: 'Special Event',
    subject: 'Join us for [event_name]!',
    body: 'Hi [first_name], we\'re hosting a special [event_name] on [date] and would love for you to join us. [event_description]. Reserve your spot: [reservation_link]',
    timing: 'Event promotion'
  },
  {
    name: 'Seasonal Menu',
    subject: 'Our new [season] menu is here!',
    body: 'Hi [first_name], we\'ve just launched our new [season] menu with dishes like [featured_dish_1], [featured_dish_2], and [featured_dish_3]. Come try something new this [season]!',
    timing: 'Seasonal promotion'
  }
];

// Health & Wellness Templates
export const healthTemplates = [
  {
    name: 'Appointment Reminder',
    subject: 'Your appointment is coming up',
    body: 'Hi [first_name], this is a reminder about your appointment on [date] at [time] with [provider_name]. Please arrive [minutes_before] minutes early. If you need to reschedule, call us at [phone_number].',
    timing: '2 days before appointment'
  },
  {
    name: 'Follow-up Check',
    subject: 'How are you feeling after your last session?',
    body: 'Hi [first_name], it\'s been [time_since_last] since your last session. We\'d love to check in on how you\'re feeling and discuss your progress. Would you like to schedule a follow-up?',
    timing: '1 week after session'
  },
  {
    name: 'Seasonal Wellness Tips',
    subject: '[season] wellness tips from [practice_name]',
    body: 'Hi [first_name], [season] brings unique challenges to [wellness_focus]. Here are our top tips for staying healthy this [season]: [tip_1], [tip_2], [tip_3]. Want to learn more? Schedule a session: [booking_link]',
    timing: 'Seasonal campaign'
  }
];

// Pet Service Templates
export const petTemplates = [
  {
    name: 'Grooming Reminder',
    subject: 'Time for [pet_name]\'s grooming appointment',
    body: 'Hi [first_name], it\'s been about [time_since_last] since [pet_name]\'s last grooming. Regular grooming helps keep [pet_name] healthy and comfortable. Book an appointment: [booking_link]',
    timing: 'Based on grooming interval'
  },
  {
    name: 'New Product',
    subject: 'New [product_type] just for [pet_type]!',
    body: 'Hi [first_name], we just got in a new [product_type] that\'s perfect for [pet_type] like [pet_name]. Come check it out and get [discount]% off your first purchase!',
    timing: 'One-time campaign'
  },
  {
    name: 'Seasonal Pet Care',
    subject: '[season] pet care tips',
    body: 'Hi [first_name], [season] brings specific challenges for [pet_type]. Here are our top tips for keeping [pet_name] healthy this [season]: [tip_1], [tip_2], [tip_3]. Need supplies? We\'ve got you covered: [shop_link]',
    timing: 'Seasonal campaign'
  }
];

// Get templates by business type
export const getTemplatesByBusinessType = (businessType) => {
  switch (businessType) {
    case 'personal':
      return personalServiceTemplates;
    case 'home':
      return homeServiceTemplates;
    case 'retail':
      return retailTemplates;
    case 'food':
      return foodServiceTemplates;
    case 'health':
      return healthTemplates;
    case 'pets':
      return petTemplates;
    default:
      return [];
  }
};

export default {
  personalServiceTemplates,
  homeServiceTemplates,
  retailTemplates,
  foodServiceTemplates,
  healthTemplates,
  petTemplates,
  getTemplatesByBusinessType,
};