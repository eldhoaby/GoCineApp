# 🚢 Deployment Guide

Step-by-step guide for deploying GoCine to production.

---

## Architecture Overview

```
GitHub Repository (Source of Truth)
       │
       ├──→ Vercel ──→ Frontend (React + Vite)
       │         ↓
       │     CDN Edge Network (Global)
       │
       ├──→ Render ──→ Backend (Node.js + Express)
       │         ↓
       │     Web Service (Auto-scaling)
       │
       └──→ MongoDB Atlas ──→ Database
                  ↓
             Cloud Cluster (Auto-managed)
```

---

## 1. Database — MongoDB Atlas

### Setup

1. Create an account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a **free M0 cluster**
3. Choose a cloud provider and region closest to your users
4. Create a **database user** (username + password)
5. Configure **Network Access**:
   - Add `0.0.0.0/0` to allow connections from Render
6. Get the **connection string** from **Connect → Drivers**

### Connection String Format

```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/gocine?retryWrites=true&w=majority
```

---

## 2. Backend — Render

### Setup

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New → Web Service**
3. Connect your GitHub repository

### Configuration

| Setting | Value |
|---------|-------|
| **Name** | `gocine-api` |
| **Region** | Oregon (US West) or nearest |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | Free |

### Environment Variables

Add these in Render's **Environment** tab:

| Variable | Value |
|----------|-------|
| `PORT` | `3000` |
| `MONGODB_URI` | Your Atlas connection string |
| `RAZORPAY_KEY_ID` | Your Razorpay key |
| `RAZORPAY_KEY_SECRET` | Your Razorpay secret |
| `STRIPE_SECRET_KEY` | Your Stripe secret key |
| `NODE_ENV` | `production` |

### Verify

After deployment, visit your Render URL — you should see: `✅ API is working fine`

> **Note:** Free tier services spin down after 15 minutes of inactivity. First requests may take ~30 seconds.

---

## 3. Frontend — Vercel

### Setup

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New → Project**
3. Import your GitHub repository

### Configuration

| Setting | Value |
|---------|-------|
| **Framework Preset** | Vite |
| **Root Directory** | `frontend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

### Environment Variables

Add these in Vercel's **Settings → Environment Variables**:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://your-backend.onrender.com` |
| `VITE_RAZORPAY_KEY_ID` | Your Razorpay public key |

### Verify

Visit your Vercel deployment URL to confirm the app is live and connected to the backend.

---

## Deployment Workflow

Both Vercel and Render support **automatic deployments**:

```
Developer pushes to main branch
         │
         ├──→ Vercel detects change → Rebuilds frontend → Deploys to CDN
         │
         └──→ Render detects change → Rebuilds backend → Deploys service
```

Every `git push` to `main` triggers a fresh deployment on both platforms automatically.

---

## Post-Deployment Checklist

- [ ] Backend API responds at deployed URL
- [ ] Frontend loads correctly
- [ ] User registration works
- [ ] User login works
- [ ] Movie listings load from API
- [ ] Booking flow completes successfully
- [ ] Payment processing works (test mode)
- [ ] E-ticket PDF generates correctly
- [ ] Admin dashboard is accessible
- [ ] Admin can add/edit/delete listings
