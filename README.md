# Cartify — E-commerce Assignment

> Simple full-stack e-commerce assignment built with a Node/Express backend and a React + Vite frontend. This repository is prepared for evaluation/submission — focused, minimal, and free of extraneous files or sensitive data.

## Project overview

- Backend: Node.js + Express API that connects to MongoDB for product and order management.
- Frontend: React (Vite) single-page app that displays products, product details, cart, and a simple admin page.
- Purpose: assignment/demo — emphasis on readable code, working features, and a consistent UI theme derived from the `cartify.svg` logo.

## Repo structure

- `backend/` — server code, controllers, models, routes and `package.json`.
- `frontend/` — React app (Vite) with components, pages, styles and `package.json`.

Top-level files of interest:

- [frontend/src/styles/theme.css](frontend/src/styles/theme.css) — site-wide theme using colors from `frontend/public/cartify.svg`.
- [frontend/src/components/Navbar.jsx](frontend/src/components/Navbar.jsx) — updated to use theme variables and `brand-header`.
- [frontend/src/main.jsx](frontend/src/main.jsx) — imports the theme css globally.
- `backend/.env.example` — (if present) example environment variables; do not commit real secret `.env`.

## Prerequisites

- Node.js (LTS 16/18+ recommended)
- npm or pnpm

## Setup & run (development)

1. Clone the repository and open the project root.

2. Backend: install and run

```bash
cd backend
npm install
# create a local .env (copy from .env.example) and set MONGO_URI and other secrets locally
npm run dev   # or `node server.js` / `npm start` depending on package.json
```

3. Frontend: install and run

```bash
cd frontend
npm install
npm run dev
```

The frontend dev server (Vite) will hot-reload on changes. The app expects the backend API to be running on the configured port (see backend `.env`).

## Build (production)

Frontend:

```bash
cd frontend
npm run build
# build output: frontend/dist
```

Backend (example simple start):

```bash
cd backend
npm run start
```

## Environment variables

- Do NOT commit `.env` with real secrets. Use an `.env.example` in the `backend/` showing required keys, for example:

```
MONGO_URI=your_mongo_connection_string_here
JWT_SECRET=your_jwt_secret_here
PORT=5000
```

If a real `.env` was committed earlier, rotate those credentials immediately and remove the file from git history if needed.

## Theming and styling notes (assignment-specific)

- The app now uses a small theme CSS derived from the `frontend/public/cartify.svg` palette. See:
  - [frontend/src/styles/theme.css](frontend/src/styles/theme.css)
  - [frontend/src/components/Navbar.jsx](frontend/src/components/Navbar.jsx)
  - [frontend/src/main.jsx](frontend/src/main.jsx)

- Theme utilities included: `.bg-brand`, `.text-brand`, `.btn-brand`, `.badge-brand`, `.primary-action` for consistent styling.

## Quick checklist for assignment submission

- [ ] No `node_modules`, build artifacts, or other large folders committed.
- [ ] `.env` with real credentials removed. Add `.env.example` instead.
- [ ] Code is organized and only assignment-relevant files exist.
- [ ] Basic README (this file) explains how to run the project.
- [ ] UI theme applied (logo colors) and site uses theme variables where possible.

## Known changes I made for the assignment

- Extracted color palette from `frontend/public/cartify.svg` and added theme variables in [frontend/src/styles/theme.css](frontend/src/styles/theme.css).
- Imported the theme in [frontend/src/main.jsx](frontend/src/main.jsx).
- Updated the header to use the theme in [frontend/src/components/Navbar.jsx](frontend/src/components/Navbar.jsx).

## Notes / grading hints for the reviewer

- Start the backend first (MongoDB required). If you don't have a MongoDB URI, mock product data can be used by stubbing services in `frontend/src/services/api.js` for demonstration.
- The UI is intentionally minimal and uses Tailwind utility classes plus a small theme file to meet the assignment style requirement.

## Troubleshooting

- If the frontend cannot fetch data, confirm the backend is running and `MONGO_URI` is valid.
- If ports conflict, change `PORT` in `backend/.env` and update the frontend API base URL in `frontend/src/services/api.js`.

## Next (optional) improvements

- Replace remaining hard-coded colors with theme utilities for full consistency.
- Add basic tests and linting scripts in both `backend/` and `frontend/`.
- Add a small script to scan for accidental secrets before commit (suggested tool: git-secrets or the simple scanner script included in `/tools`).

---

If you want, I can also:

- Audit the frontend for remaining color uses and convert them to theme utilities.
- Add a simple `frontend/README.md` with dev UX notes.

Good luck with your submission — tell me if you want the README adjusted for a specific grader or rubric.
