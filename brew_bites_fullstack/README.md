# Brew & Bites Café — Full-stack project

A full-stack café website starter for the Future Interns Task 3, built with React, Vite, Node.js, Express and MongoDB Atlas.

## Included
- Responsive React frontend with menu photos, price-sorted menu, categories (Spicy, Sweet, Ice & Juice, Combos, Offers and Coffee), category-specific persuasive copy, search, cart and dark mode
- REST API with Express
- MongoDB/Mongoose models for menu items, orders, reservations and admin users
- Admin sign-in using bcrypt password hashing and JWT bearer tokens
- Admin dashboard: create/edit/delete menu items, view orders/reservations, update order status
- Customer order submission and reservation request APIs
- Seeded admin account created from environment variables on server startup
- Input validation, basic rate limiting for login, and centralized error handling

## Requirements
- Node.js LTS installed
- MongoDB Atlas account and a database connection string
- VS Code

## Setup (first time)
1. Extract the ZIP and open the `brew_bites_fullstack` folder in VS Code.
2. Open a terminal in VS Code at the project root.
3. Install the root helper package:
   ```bash
   npm install
   ```
4. Install frontend and backend packages:
   ```bash
   npm run install:all
   ```
   Or run `npm install` separately inside `server` and `client`.
5. In the `server` folder, copy `.env.example` to `.env`.
6. In `server/.env`, set your MongoDB Atlas URI and choose your own admin email and password. Use a long unique password. Do not upload `.env` to GitHub.
   The server loads this file from its own folder; keep these credentials server-side and out of frontend files.
7. Start the project from the root:
   ```bash
   npm run dev
   ```
8. Open the frontend at `http://localhost:5173`. During local development, Vite proxies `/api` requests to the backend at `http://localhost:5000`, avoiding browser CORS issues.

## MongoDB Atlas checklist
- Create a free cluster and a database user.
- In Network Access, allow your current IP for local development.
- Copy the Node.js connection string and replace `<db_password>` with the database user's password.
- Put the URI in `MONGODB_URI` in `server/.env`.
- Do not put the database URI or JWT secret in frontend files or commit them to GitHub.

## Admin login
Use the `ADMIN_EMAIL` and `ADMIN_PASSWORD` values you set in `server/.env`. The server creates the admin if it doesn't exist. If you change the env password after the user already exists, the existing password is not automatically reset; update it securely in the database or use a fresh database for a clean setup.

## API endpoints
- `GET /api/health` — server health
- `GET /api/menu` — public menu
- `POST /api/orders` — place an order
- `POST /api/reservations` — request a reservation
- `POST /api/auth/login` — admin login
- `GET /api/admin/summary` — admin summary (JWT required)
- `GET /api/admin/orders` — list orders (JWT required)
- `PATCH /api/admin/orders/:id/status` — update order status (JWT required)
- `GET /api/admin/reservations` — list reservations (JWT required)
- `GET /api/admin/menu` — list menu items including unavailable items (JWT required)
- `POST /api/admin/menu` — add menu item (JWT required)
- `PATCH /api/admin/menu/:id` — edit menu item (JWT required)
- `DELETE /api/admin/menu/:id` — delete menu item (JWT required)

## Important notes
- This is a working local full-stack starter, but you must configure MongoDB Atlas and environment variables before the database-backed flows can run.
- No payment gateway is included. Orders are saved as pending orders in MongoDB; they are not automatically paid or sent to a delivery service.
- Reservation requests are stored in MongoDB; a café owner must confirm them.
- The menu uses remote Unsplash images, so an internet connection is required.
- Replace sample café details, menu prices, images, reviews and contact information before a real live pitch.
- For production deployment, configure environment variables on your host, use HTTPS, review security settings, and never expose admin credentials.
- When hosting the frontend and backend on different production origins, set the frontend's `VITE_API_URL` to the backend API base URL (for example, `https://api.example.com/api`) and configure the backend `CLIENT_ORIGIN` to allow the frontend origin.
