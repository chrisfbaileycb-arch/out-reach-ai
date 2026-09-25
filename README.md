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

Checks (all run in CI on every push):

- `frontend/`: `npm run lint`, `npm test`, `npm run build`
- `backend/`: `npm test` (uses an in-memory stand-in for the database, so MongoDB isn't needed)

## Layout

```
backend/
├── server.js                 # Express app, Mongo connection, route mounting
├── config/businessTypes.js   # business type ids (must match the frontend registry)
├── middleware/auth.js        # requires a valid Bearer token
├── models/index.js           # Business, Customer, Campaign, User schemas
├── routes/
│   ├── auth.js               # POST /api/auth/register, /login; GET /api/auth (current user)
│   └── business.js, campaign.js, customer.js, analytics.js   # PLACEHOLDERS (501)
└── __tests__/auth.test.js

frontend/src/
├── App.js                    # routes
├── theme.js
├── context/auth.js           # sign in/up/out, session restore
├── components/
│   ├── Navbar.js
│   ├── ProtectedRoute.js     # signed-in layout; sends visitors to /login
│   ├── PublicOnlyRoute.js    # sends signed-in users on from /, /login, /register
│   ├── AuthFormLayout.js     # shared sign-in/sign-up frame
│   ├── DynamicDashboard.js   # dashboard for the chosen business type
│   └── ComingSoon.js         # shared layout for unbuilt pages
├── pages/
│   ├── LandingPage.js             # "/"
│   ├── Login.js, Register.js
│   ├── BusinessTypeSelection.js   # "/onboarding"
│   ├── Dashboard.js               # "/dashboard"; asks for a business type if none is chosen
│   └── CustomerAcquisition.js, LoyaltyProgram.js, EventPromotion.js,
│       Analytics.js, Settings.js  # PLACEHOLDERS (ComingSoon)
└── utils/
    ├── api.js                # axios client: auth header, same-origin URLs
    ├── businessTypes.js      # single source of truth for business types
    ├── BusinessTypeContext.js
    └── templates.js          # outreach message templates per business type
```

Files marked PLACEHOLDER are stubs for features that haven't been built yet. See `CLAUDE.md` for the project's conventions.
