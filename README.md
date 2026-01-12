# Cartify. — E‑commerce Assignment

Live demo: 
- [Main site](https://cartify-e-commerce-application.vercel.app/) 
- [Admin dashboard](https://cartify-e-commerce-application.vercel.app/admin)

This repository is a concise, reviewer-focused full‑stack e‑commerce assignment demonstrating a maintainable product → cart → checkout → order flow. It uses a Vite + React frontend and an Express + Mongoose backend with MongoDB.

---

## About this submission

- **What I built:** a small full‑stack e‑commerce application called *Cartify* that supports product discovery, product detail pages, a client-side cart, a simulated checkout that creates orders in the backend, and a simple admin dashboard for viewing orders and managing products.
- **How it works:** the React frontend requests data from the Express API (`/api/products`, `/api/orders`); the backend uses Mongoose to persist `Product` and `Order` documents in MongoDB. Checkout is simulated — the frontend posts cart items to `POST /api/orders`, which stores an `Order` document.
- **Tech stack used:** React + Vite, Tailwind CSS, Node.js, Express, MongoDB (Mongoose), Axios. Dev tools: Vite, nodemon.
- **Assumptions made:** payment is simulated (no payment gateway), no authentication/authorization (admin pages are not protected), initial product data is seeded or added through the admin UI, and the environment provides a reachable MongoDB URI.
- **Submission / Author info:**
  - Name: Deshmukh Nikhil Dipak
  - Enrollment / ID: E22CSEU1099
  - Batch: B37
  - University / Organization: Bennett University
  - Role: Full Stack Developer Intern


**How this README is organized**

- **Quick setup**: run the app locally (frontend + backend)
- **Architecture & User flow**: clear Mermaid diagrams
- **Security**: immediate remediation for committed secrets
- **API & Data models**: routes and model summaries
- **Screenshots & Presentation**: placeholders, storage, and tips
- **Reviewer checklist**: concrete items for grading

---

**Quick setup — Development**

1) Backend

```bash
cd backend
npm install
# create backend/.env locally (copy from .env.example) and set MONGO_URI
npm run dev
```

2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the Vite dev URL printed by the frontend (commonly `http://localhost:5173`). The frontend reads `VITE_API_BASE_URL` (see [frontend/.env](frontend/.env#L1)) and the API helper in [frontend/src/services/api.js](frontend/src/services/api.js#L1).

---

## Architecture (diagram)

```mermaid
flowchart TD
  U[User / Browser]

  subgraph Frontend
    V[Vite Dev Server]
    R["React App - pages and components"]
  end

  subgraph Backend
    B[Express API]
    C["Controllers and Routes"]
    M[Mongoose Models]
  end

  DB[(MongoDB)]

  U --> R
  R -->|REST API| B
  B --> C
  C --> M
  M --> DB
  R -->|Assets| V

```

---

## User flow (diagram)

```mermaid
flowchart TD
  PL[Product Listing] --> PD[Product Detail]
  PD -->|Add to cart| C[Cart]
  C -->|Proceed to checkout| CO["Checkout - simulated"]
  CO -->|Place order| OS[Order Success]
  OS -->|Create order API| B[Backend]
  B --> DB[(MongoDB)]
  DB --> ADM[Admin Dashboard]
  ADM -->|Update order status| B

```

---

## API overview (implemented routes)

- `GET /api/products` — list products (`backend/src/routes/product.routes.js`)
- `GET /api/products/:id` — product detail
- `POST /api/products` — create product
- `DELETE /api/products/:id` — delete product
- `POST /api/orders` — create order (`backend/src/routes/order.routes.js`)
- `GET /api/orders` — list orders (admin)

See controller files for request/response shapes: [backend/src/controllers/product.controller.js](backend/src/controllers/product.controller.js#L1), [backend/src/controllers/order.controller.js](backend/src/controllers/order.controller.js#L1).

---

## Data models (current)

- Product: `name`, `description`, `price`, `image`, `stock` — [backend/src/models/Product.js](backend/src/models/Product.js#L1)
- Order: `products` [{ `productId`, `quantity` }], `totalAmount` — [backend/src/models/Order.js](backend/src/models/Order.js#L1)

---

## Screenshots & Presentation (placeholders)

# Home Page
<img width="1902" height="928" alt="image" src="https://github.com/user-attachments/assets/ca2e5a1e-30f3-4601-a210-b8480f8b58b6" />
<img width="1869" height="932" alt="image" src="https://github.com/user-attachments/assets/99657cae-a2a1-477a-af09-b4f4fcb23733" />

##

# Product Details
<img width="1900" height="930" alt="image" src="https://github.com/user-attachments/assets/df18d652-6c14-439a-8601-d5bb904e3f48" />

##

# Cart
<img width="1901" height="928" alt="image" src="https://github.com/user-attachments/assets/ed126966-897f-4f18-a330-f6396c12ce29" />

# Place Order
<img width="1901" height="928" alt="image" src="https://github.com/user-attachments/assets/464eb627-b879-4ac0-ac90-802d90c32bf8" />

##

# Admin Dashboard
<img width="1899" height="926" alt="image" src="https://github.com/user-attachments/assets/39f0f005-3236-4d18-b688-2dbda89bb974" />

- Orders
<img width="1898" height="928" alt="image" src="https://github.com/user-attachments/assets/59b784d2-2030-4e54-a21a-4f1f6612c560" />

- Products
<img width="1893" height="907" alt="image" src="https://github.com/user-attachments/assets/ca58fcdd-cda4-4261-883e-dfd91f70b905" />
<img width="1900" height="927" alt="image" src="https://github.com/user-attachments/assets/24393bde-7b32-46eb-af7f-6459f1f050b8" />

- Add Products
<img width="1918" height="932" alt="image" src="https://github.com/user-attachments/assets/bc4fbdae-e9fb-4724-b7c7-3590a68dc115" />

---

## Running & verification checklist (for reviewers)

- [ ] Backend starts (`npm run dev`) and connects to MongoDB.
- [ ] Frontend starts (`npm run dev`) and loads products from the API.
- [ ] Product detail pages load and `Add to cart` works.
- [ ] Cart prevents quantities exceeding `stock`.
- [ ] Checkout creates an `Order` document in MongoDB.
- [ ] Admin page shows new orders (if available).
- [ ] No secrets remain committed (verify `backend/.env` is removed from the index).

---

## Troubleshooting

- If the frontend shows empty data: confirm `VITE_API_BASE_URL` in [frontend/.env](frontend/.env#L1) points to the running backend.
- If DB connection fails: verify `MONGO_URI` in local `backend/.env` and network access to the cluster; check logs in [backend/src/config/db.js](backend/src/config/db.js#L1).

---

## Next steps I can do for you

- Create and commit `backend/.env.example` (no secrets).
- Remove `backend/.env` from repo history (prepare commands to run locally).
- Add server-side validation for `createOrder` to verify totals and quantities.
- Run a frontend build and provide the `dist` contents.

---

## 🧪 UX & Edge-Case Handling

- Empty states for Orders and Products
- Stock-aware cart limits
- Graceful loading skeletons
- Image fallback handling
- Admin dashboard with expandable order details
- Client-side routing support for direct URLs (/admin, /cart, etc.)

---

## ✅ Assignment Objectives Covered

- ✔ End-to-end flow
- ✔ Clean API design
- ✔ Frontend–backend integration
- ✔ Admin functionality
- ✔ Deployment-ready SPA routing
- ✔ Security awareness

---

## 📬 Next Improvements (Optional)

- Authentication & role-based access
- Order status updates
- Server-side validation
- Pagination on backend
- Unit & integration tests

> This assignment demonstrates my approach to building clean, scalable, and user-focused full-stack applications.
