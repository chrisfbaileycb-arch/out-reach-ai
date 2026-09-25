# OutReach AI

Marketing outreach platform for small local businesses (food, personal services, home services, retail, health & wellness).

## Frontend

React 18 + MUI 5 + React Router 6, built with Vite.

```bash
cd frontend
npm install
npm run dev     # local dev server
npm run build   # production build
```

### Layout

```
frontend/src/
├── App.js                         # theme + routes
├── components/
│   ├── BusinessTypeSelection.js   # onboarding: pick business type
│   ├── DynamicDashboard.js        # dashboard that adapts to business type
│   └── Navbar.js                  # PLACEHOLDER
├── pages/
│   ├── Dashboard.js               # restaurant dashboard (route "/")
│   └── CustomerAcquisition.js, LoyaltyProgram.js, EventPromotion.js,
│       Analytics.js, Settings.js  # PLACEHOLDERS
└── utils/
    ├── homeServiceTemplates.js
    └── personalServiceTemplates.js
```

Files marked PLACEHOLDER are minimal stubs standing in for originals that haven't been added yet.

`BusinessTypeSelection` and `DynamicDashboard` are not yet wired into `App.js`.

The planned `backend/` (Express: controllers, models, routes, middleware, config) and `database/schema.sql` aren't in the repo yet.
