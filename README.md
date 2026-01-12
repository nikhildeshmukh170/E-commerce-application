# Cartify — E‑commerce Assignment

Concise, reviewer-focused documentation for a full‑stack e‑commerce assignment. This repo demonstrates a maintainable small e‑commerce system (product listing, details, cart, simulated checkout, order creation, admin view) using a React + Vite frontend and an Express + Mongoose backend with MongoDB.

---

**Quick summary**

- Purpose: educational assignment demonstrating full‑stack responsibilities, clean separation between frontend and API, and basic order flow.
- Stack: React (Vite) frontend, Node/Express backend, MongoDB via Mongoose. Tailwind CSS for styling utilities.

---

**Contents**

- `backend/` — Express API, controllers, Mongoose models, `package.json`.
- `frontend/` — Vite React app, components, pages, theme CSS, `package.json`.
- This README — run instructions, security notes, reviewer checklist.

---

**Prerequisites**

- Node.js 16/18+ and npm (or pnpm/yarn)
- MongoDB connection (Atlas or local) and a `MONGO_URI`

---

**Local development — quick start**

1) Backend

```bash
cd backend
npm install
# copy .env.example to .env and set MONGO_URI and optional PORT
# Example .env entries: MONGO_URI=mongodb+srv://user:pass@cluster/mydb
npm run dev
```

2) Frontend

```bash
# Cartify — E‑commerce Assignment

Concise, reviewer-focused documentation for a full‑stack e‑commerce assignment. This repo demonstrates a maintainable small e‑commerce system (product listing, details, cart, simulated checkout, order creation, admin view) using a React + Vite frontend and an Express + Mongoose backend with MongoDB.

---

**Quick summary**

- Purpose: educational assignment demonstrating full‑stack responsibilities, clean separation between frontend and API, and basic order flow.
- Stack: React (Vite) frontend, Node/Express backend, MongoDB via Mongoose. Tailwind CSS for styling utilities.

---

**Contents**

- `backend/` — Express API, controllers, Mongoose models, `package.json`.
- `frontend/` — Vite React app, components, pages, theme CSS, `package.json`.
- This README — run instructions, security notes, reviewer checklist.

---

**Prerequisites**

- Node.js 16/18+ and npm (or pnpm/yarn)
- MongoDB connection (Atlas or local) and a `MONGO_URI`

---

**Local development — quick start**

1) Backend

```bash
cd backend
npm install
# copy .env.example to .env and set MONGO_URI and optional PORT
# Example .env entries: MONGO_URI=mongodb+srv://user:pass@cluster/mydb
npm run dev
```

2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL printed by the frontend (commonly `http://localhost:5173`). The frontend expects the backend API base URL configured in `frontend/src/services/api.js`.

---

**Architecture (diagram)**

```mermaid
flowchart TD
	subgraph Browser
		U[User / Browser]
	end

	subgraph Frontend
		V[Vite Dev Server]
		R[React App (pages & components)]
		A[Public assets (/cartify.svg)]
	end

	subgraph Backend
		B[Express API]
		C[Controllers & Routes]
		M[Models (Mongoose)]
	end

	DB[(MongoDB)]

	U -->|Uses UI| R
	R -->|REST API| B
	B --> C
	C --> M
	M -->|reads/writes| DB
	R -->|loads asset| A
	V --> R
```

---

**Build / Production**

```bash
cd frontend
npm run build
# serve frontend/dist via static host or integrate it with Express

cd ../backend
npm run start
```

---

**Security: critical action required**

This repository currently contains `backend/.env` with a `MONGO_URI` (committed). Treat that secret as leaked. Immediate remediation:

```bash
# remove from git but keep local copy
git rm --cached backend/.env
git commit -m "remove backend .env from repository"

# ensure backend/.env is ignored
echo "backend/.env" >> .gitignore
git add .gitignore
git commit -m "ignore backend .env"
```

- Rotate the MongoDB user/password immediately in your DB provider.
- If the repo was pushed publicly, remove the secret from history using `git filter-repo` or BFG and rotate credentials.

Add a non-secret example file at `backend/.env.example` with variable names only.

---

**Project structure & important files**

- Frontend theme & entry: [frontend/src/styles/theme.css](frontend/src/styles/theme.css), [frontend/src/main.jsx](frontend/src/main.jsx)
- Frontend API helper: [frontend/src/services/api.js](frontend/src/services/api.js)
- Navbar component: [frontend/src/components/Navbar.jsx](frontend/src/components/Navbar.jsx)
- Backend DB config: [backend/config/db.js](backend/config/db.js)
- Backend controllers: [backend/controllers/product.controller.js](backend/controllers/product.controller.js), [backend/controllers/order.controller.js](backend/controllers/order.controller.js)
- Models: [backend/models/Product.js](backend/models/Product.js), [backend/models/Order.js](backend/models/Order.js)

---

**User flow (diagram)**

```mermaid
flowchart LR
	PL[Product Listing] --> PD[Product Detail]
	PD -->|Add to cart| C[Cart]
	C -->|Proceed to checkout| CO[Checkout / Payment]
	CO -->|Place Order| OS[Order Success]
	OS -->|Order created via API| B[Backend]
	B --> DB[(MongoDB)]
	B -->|Notify| ADM[Admin Dashboard]
	ADM -->|Mark processed / view details| B
```

---

**Reviewer walkthrough (manual test plan)**

1. Start backend and frontend as above.
2. Load the app, confirm product listing displays products from the API.
3. Open a product detail, choose a quantity, and add to cart.
4. Open cart and proceed to checkout. The payment flow is simulated; placing the order calls the backend API.
5. Verify an `Order` document was created in MongoDB.
6. Open the admin page (if provided) and verify the new order appears for processing.

---

**API overview (typical endpoints)**

- `GET /api/products` — list products
- `GET /api/products/:id` — product details
- `POST /api/orders` — create order
- `GET /api/orders` — list orders (admin)

Check the backend `routes/` files for exact routes and request/response shapes.

---

**Data model (high level)**

- Product: title, description, price, image, SKU, inventory
- Order: items (product id, qty, price), customer info (name, email, address), total, status, createdAt

---

**Development notes & suggestions**

- Add `backend/.env.example` with required env var names (no secrets).
- Ensure `backend/.gitignore` excludes `.env` and `node_modules`.
- Replace hard-coded colors with theme utilities in `frontend/src/styles/theme.css` for consistent theming.
- Add a basic pre-commit secret scan (or use `git-secrets`) to avoid committing credentials.

---

**Submission checklist**

- [ ] Remove `node_modules` and build artifacts from the repo
- [ ] Remove `backend/.env` from git and rotate credentials
- [ ] Add `backend/.env.example` (no secrets)
- [ ] Confirm README includes run instructions and reviewer checklist (this file)
- [ ] Ensure the UI is readable and styled with theme utilities

---

If you want, I can (pick one):

- create `backend/.env.example` and commit it
- run the frontend build and verify output
- replace remaining hard-coded colors with theme utilities across the frontend

Tell me which next step you want me to take and I will proceed.

