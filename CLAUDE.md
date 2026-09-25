# LocalBoost

Outreach platform for small local businesses. React 18 + MUI 5 frontend (Vite), Express + Mongoose backend.

## Commands

| | Frontend (`frontend/`) | Backend (`backend/`) |
|---|---|---|
| Dev | `npm start` (port 5173, proxies `/api`) | `npm run dev` (port 5000, needs `.env`) |
| Test | `npm test` (Vitest) | `npm test` (Jest, no MongoDB needed) |
| Lint | `npm run lint` | – |
| Build | `npm run build` → `frontend/build` | – |

Run the relevant tests and lint before committing. CI (`.github/workflows/ci.yml`) runs all of them.

## Rules

- **Business types have one source of truth:** `frontend/src/utils/businessTypes.js`. Never add a `switch (businessType)` anywhere; read the registry instead. A new type needs an entry there, a template set in `utils/templates.js` and its id in `backend/config/businessTypes.js`. `businessTypes.test.js` fails until all three agree.
- **Read the selected type with `useBusinessType()`**, not `localStorage` directly.
- **Don't add dead UI.** Every button must go somewhere or do something. Unbuilt features use `components/ComingSoon.js`, and unbuilt API routes return 501.
- **Label placeholder data as sample data** in the UI. Never present made-up numbers as real.
- **Auth:** the server refuses to start without `JWT_SECRET`, and that must stay true. Never add a fallback secret. Only return users through `toPublicUser()` in `routes/auth.js`.
- **Match the existing style:** functional components, MUI `sx` for styling, 2-space indentation, single quotes. Frontend `.js` files contain JSX (Vite is configured for that).

## Not built yet

- Business, campaign, customer and analytics APIs (placeholder 501 routes).
- The Customer Acquisition, Loyalty, Events, Analytics and Settings pages (`ComingSoon`).
- Login/register UI. The frontend doesn't call the backend yet.
- The business type is stored in the browser only; it should move onto the `Business` record once auth is wired up.
