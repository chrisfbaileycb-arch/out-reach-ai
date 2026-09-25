# LocalBoost

Marketing outreach platform for small local businesses: food & dining, personal services, home services, retail, health & wellness, and pet services.

## Quick start

```bash
# Backend (Express + MongoDB), port 5000
cd backend
cp .env.example .env        # then set JWT_SECRET (the server refuses to start without it)
npm install
npm run dev

# Frontend (React + MUI, built with Vite), port 5173; /api is proxied to the backend
cd frontend
npm install
npm start
```

For production, run `npm run build` in `frontend/` and start the backend with `NODE_ENV=production`; it serves `frontend/build`.

Run the backend tests with `npm test` in `backend/`. They use an in-memory stand-in for the database, so MongoDB isn't needed.

## Layout

```
backend/
├── server.js                 # Express app, Mongo connection, route mounting
├── models/index.js           # Business, Customer, Campaign, User schemas
├── routes/
│   ├── auth.js               # POST /api/auth/register, /api/auth/login
│   └── business.js, campaign.js, customer.js, analytics.js   # PLACEHOLDERS (501)
└── __tests__/auth.test.js

frontend/src/
├── App.js                    # theme + routes
├── components/
│   ├── Navbar.js
│   └── DynamicDashboard.js   # dashboard content adapts to the chosen business type
├── pages/
│   ├── BusinessTypeSelection.js   # "/" onboarding, stores type in localStorage
│   ├── Dashboard.js               # "/dashboard" -> DynamicDashboard
│   └── CustomerAcquisition.js, LoyaltyProgram.js, EventPromotion.js,
│       Analytics.js, Settings.js  # PLACEHOLDERS
└── utils/templates.js        # outreach message templates per business type
```

Files marked PLACEHOLDER are stubs for features that haven't been built yet.
