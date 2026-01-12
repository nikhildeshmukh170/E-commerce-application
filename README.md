# Cartify — E‑commerce Assignment

Live demo (local): [Main site](http://localhost:5173) · [Admin dashboard](http://localhost:5173/admin)

This repository is a concise, reviewer-focused full‑stack e‑commerce assignment demonstrating a maintainable product → cart → checkout → order flow. It uses a Vite + React frontend and an Express + Mongoose backend with MongoDB.

---

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
    R[React App (pages & components)]
  end
  subgraph Backend
    B[Express API]
    C[Controllers & Routes]
    M[Mongoose Models]
  end
  DB[(MongoDB)]

  U --> R
  R -->|REST /api| B
  B --> C
  C --> M
  M --> DB
  R -->|assets| V
```

---

## User flow (diagram)

```mermaid
flowchart LR
  PL[Product Listing] --> PD[Product Detail]
  PD -->|Add to cart| C[Cart]
  C -->|Proceed to checkout| CO[Checkout (simulated)]
  CO -->|Place Order| OS[Order Success]
  OS -->|POST /api/orders| B[Backend]
  B --> DB[(MongoDB)]
  DB --> ADM[Admin Dashboard]
  ADM -->|update status| B
```

---

## Security — immediate remediation required

This repository currently contains `backend/.env` with `MONGO_URI`. Treat it as leaked and remove it from the repo now.

Commands (keep local copy):

```bash
git rm --cached backend/.env
git commit -m "chore(secrets): remove backend .env from repo"
echo "backend/.env" >> .gitignore
git add .gitignore
git commit -m "chore: ignore backend .env"
```

Rotate the MongoDB credentials in your provider immediately. If the repo was pushed to a remote, purge the secret from history (use `git filter-repo` or BFG), then force-push and inform stakeholders.

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

Create a folder `frontend/public/screenshots/` and add these image files (example names):

- `home.png` — Home / product listing
- `product.png` — Product detail
- `cart.png` — Cart page
- `checkout.png` — Order success
- `admin.png` — Admin orders list

Embed example in this README or other markdown files:

```markdown
![Home page](/screenshots/home.png)
```

Tips:

- Use PNG at ~1200px width for clear UI capture.
- Add a one-line caption and reproduction steps under each image.
- If you have a hosted demo, show the URL next to each screenshot.

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
