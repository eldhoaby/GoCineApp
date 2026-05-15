# Changelog

All notable changes to the GoCine project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] — 2026-05-15

### 🚀 Initial Production Release

#### Added
- **User Authentication** — Registration and login with role-based access (User/Admin)
- **Movie Browsing** — Browse and search movie listings with detailed views
- **Ticket Booking** — End-to-end booking workflow with seat selection
- **Razorpay Integration** — Payment processing via Razorpay gateway
- **Stripe Integration** — Payment processing via Stripe gateway
- **E-Ticket Generation** — Downloadable PDF tickets with QR codes
- **Booking History** — View and manage past bookings
- **Admin Dashboard** — Comprehensive admin panel with analytics
- **Movie Management** — Admin CRUD operations for movie listings
- **Image Uploads** — Movie poster uploads via Multer middleware
- **Responsive Design** — Mobile-first UI with Tailwind CSS and Material UI
- **REST API** — Complete RESTful backend API with Express 5
- **MongoDB Integration** — Cloud database with Mongoose ODM
- **Production Deployment** — Frontend on Vercel, Backend on Render
- **Professional Documentation** — README, Contributing guide, and docs

#### Technical Stack
- Frontend: React 19, Vite 6.3, Tailwind CSS 4.1, Material UI 7.1
- Backend: Node.js, Express 5.1, MongoDB, Mongoose 8.16
- Payments: Razorpay SDK, Stripe SDK
- Deployment: Vercel, Render, MongoDB Atlas
