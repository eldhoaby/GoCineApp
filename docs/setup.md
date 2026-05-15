# 🛠️ Development Setup Guide

Complete guide to setting up GoCine for local development.

---

## Prerequisites

| Requirement | Minimum Version | Recommended |
|-------------|-----------------|-------------|
| Node.js | 18.x | 20.x LTS |
| npm | 9.x | 10.x |
| MongoDB | 6.x (Atlas) | Atlas Free Tier |
| Git | 2.x | Latest |

---

## Step 1: Clone the Repository

```bash
git clone https://github.com/eldhoaby/GoCineApp.git
cd GoCineApp
```

## Step 2: Backend Setup

```bash
cd backend
npm install
```

### Configure Backend Environment

Create a `backend/.env` file:

```env
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/gocine
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create a database user with read/write permissions
4. Whitelist your IP address (or use `0.0.0.0/0` for development)
5. Get the connection string and add it to `MONGODB_URI`

### Start the Backend

```bash
npm start
# Server runs on http://localhost:3000
```

Verify by visiting `http://localhost:3000` — you should see: `✅ API is working fine`

---

## Step 3: Frontend Setup

```bash
cd ../frontend
npm install
```

### Configure Frontend Environment

Create a `frontend/.env` file:

```env
VITE_API_URL=http://localhost:3000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### Start the Frontend

```bash
npm run dev
# App runs on http://localhost:5173
```

---

## Step 4: Payment Gateway Setup

### Razorpay (Test Mode)

1. Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Navigate to **Settings → API Keys**
3. Generate test mode keys
4. Add `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` to backend `.env`
5. Add `VITE_RAZORPAY_KEY_ID` to frontend `.env`

### Stripe (Test Mode)

1. Sign up at [Stripe Dashboard](https://dashboard.stripe.com)
2. Get your test **Secret Key** from **Developers → API Keys**
3. Add `STRIPE_SECRET_KEY` to backend `.env`

---

## Development Workflow

```
Terminal 1 (Backend):
  cd backend && npm start

Terminal 2 (Frontend):
  cd frontend && npm run dev
```

The frontend dev server hot-reloads on file changes. The backend requires a restart (or use `npx nodemon server.js` for auto-reload).

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection failed | Check your `MONGODB_URI` and IP whitelist |
| CORS errors | Ensure backend is running on the correct port |
| Payment not working | Verify API keys are in test mode |
| Frontend can't reach backend | Check `VITE_API_URL` matches backend port |
| `node_modules` issues | Delete `node_modules` and run `npm install` |
