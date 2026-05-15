<div align="center">

# 🎬 GoCine — Movie Ticket Booking Application

### A Production-Ready Full Stack MERN Application

[![React](https://img.shields.io/badge/React-19.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-5.1-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[![Deployment Status](https://img.shields.io/badge/Status-Live_in_Production-brightgreen?style=for-the-badge)](#-live-deployment)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge)](CONTRIBUTING.md)

<br />

**GoCine** is a feature-rich, production-deployed movie ticket booking platform built with the **MERN Stack**. It delivers a seamless end-to-end experience — from browsing movies and selecting showtimes to secure payment processing and downloadable e-tickets — with a dedicated admin dashboard for complete content management.

[🌐 Live Demo](#-live-deployment) · [📖 Documentation](docs/) · [🐛 Report Bug](https://github.com/eldhoaby/GoCineApp/issues) · [✨ Request Feature](https://github.com/eldhoaby/GoCineApp/issues)

</div>

---

## 📋 Table of Contents

- [Live Deployment](#-live-deployment)
- [Why This Project Stands Out](#-why-this-project-stands-out)
- [Tech Stack](#-tech-stack)
- [Architecture Overview](#-architecture-overview)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Environment Setup](#-environment-setup)
- [API Overview](#-api-overview)
- [Deployment](#-deployment)
- [Project Structure](#-project-structure)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 🌐 Live Deployment

> **GoCine is fully deployed and running in production.**

| Service   | Platform | URL                                                 | Status |
|-----------|----------|-----------------------------------------------------|--------|
| Frontend  | Vercel   | [gocine-app-eldho.vercel.app](https://gocine-app-eldho.vercel.app) | ✅ Live |
| Backend   | Render   | [gocine-api.onrender.com](https://gocineapp.onrender.com) | ✅ Live |
| Database  | MongoDB Atlas | Cloud-hosted cluster                            | ✅ Active |

> **Note:** The backend is hosted on Render's free tier and may take ~30 seconds to cold-start on the first request.

---

## 🏆 Why This Project Stands Out

<div align="center">

| Aspect | Details |
|--------|---------|
| 🏗️ **Real-World Architecture** | Production-grade MERN stack with clean separation of concerns, RESTful API design, and scalable folder structure |
| 🔐 **Authentication System** | Complete user registration and login flow with role-based access control (User / Admin) |
| 🎟️ **Booking Workflow** | End-to-end ticket booking — browse → select → book → pay → receive e-ticket with QR code |
| 💳 **Payment Integration** | Dual payment gateway support with **Razorpay** and **Stripe** for real transaction processing |
| 👨‍💼 **Admin Dashboard** | Full-featured admin panel for managing movies, showtimes, bookings, and platform analytics |
| 📱 **Responsive UI** | Mobile-first responsive design built with **Tailwind CSS** and **Material UI** |
| 🚀 **Production Deployment** | Fully deployed on **Vercel** (frontend) and **Render** (backend) with **MongoDB Atlas** |
| 📄 **E-Ticket Generation** | Downloadable PDF tickets with QR codes using `html2pdf.js` and `qrcode.react` |

</div>

---

## 🛠️ Tech Stack

<details>
<summary><strong>Frontend</strong></summary>

| Technology | Purpose |
|------------|---------|
| React 19 | UI library with component-based architecture |
| Vite 6.3 | Lightning-fast build tool and dev server |
| Tailwind CSS 4.1 | Utility-first CSS framework |
| Material UI 7.1 | Pre-built UI component library |
| React Router DOM 7.6 | Client-side routing and navigation |
| Axios | HTTP client for API communication |
| Stripe React | Payment gateway integration (frontend) |
| Razorpay | Payment gateway integration (frontend) |
| html2pdf.js | PDF generation for e-tickets |
| qrcode.react | QR code generation for bookings |
| React Icons | Icon library |
| jsPDF | PDF document generation |

</details>

<details>
<summary><strong>Backend</strong></summary>

| Technology | Purpose |
|------------|---------|
| Node.js | Server-side JavaScript runtime |
| Express 5.1 | Web application framework |
| MongoDB + Mongoose 8.16 | NoSQL database with ODM |
| Razorpay SDK | Payment processing (server-side) |
| Stripe SDK | Payment processing (server-side) |
| Multer 2.0 | File upload middleware |
| CORS | Cross-origin resource sharing |
| dotenv | Environment variable management |

</details>

<details>
<summary><strong>DevOps & Deployment</strong></summary>

| Technology | Purpose |
|------------|---------|
| Vercel | Frontend hosting and CI/CD |
| Render | Backend hosting and deployment |
| MongoDB Atlas | Cloud-hosted database |
| GitHub Actions | Automated CI/CD pipeline |
| ESLint | Code linting and quality |
| Prettier | Code formatting |

</details>

---

## 🏛️ Architecture Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                        CLIENT (Vercel)                           │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────────────────┐ │
│  │  React 19  │  │ Tailwind CSS │  │   Material UI Components │ │
│  │  + Vite    │  │   + MUI      │  │   + React Router DOM     │ │
│  └─────┬──────┘  └──────────────┘  └──────────────────────────┘ │
│        │                                                         │
│        │  Axios HTTP Requests                                    │
└────────┼─────────────────────────────────────────────────────────┘
         │
         │  REST API (JSON)
         ▼
┌──────────────────────────────────────────────────────────────────┐
│                       SERVER (Render)                             │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────────────────┐ │
│  │ Express 5  │  │  Middleware   │  │     Route Handlers       │ │
│  │  Server    │──│  (CORS,JSON) │──│  Auth│Rooms│Bookings│Pay │ │
│  └────────────┘  └──────────────┘  └───────────┬──────────────┘ │
│                                                 │                │
│  ┌──────────────────┐  ┌────────────────────────┘               │
│  │  Razorpay SDK    │  │                                         │
│  │  Stripe SDK      │  ▼                                         │
│  └──────────────────┘  ┌──────────────────────────┐              │
│                        │   Mongoose ODM            │              │
│                        └───────────┬──────────────┘              │
└────────────────────────────────────┼─────────────────────────────┘
                                     │
                                     ▼
                        ┌──────────────────────┐
                        │   MongoDB Atlas       │
                        │   (Cloud Database)    │
                        └──────────────────────┘
```

---

## ✨ Features

### 🎭 User Features
- **Browse Movies** — Explore a curated catalog of movies with rich details, ratings, and imagery
- **Movie Details** — View comprehensive movie information including synopsis, cast, and showtimes
- **Seat Selection** — Interactive seat picker for choosing preferred seats
- **Secure Booking** — Complete ticket booking with real-time availability updates
- **Dual Payment** — Pay via **Razorpay** or **Stripe** with secure transaction handling
- **E-Ticket with QR** — Receive downloadable PDF tickets with embedded QR codes
- **Booking History** — View and manage all past and upcoming bookings
- **User Authentication** — Secure registration and login with session management

### 👨‍💼 Admin Features
- **Admin Dashboard** — Comprehensive analytics and management overview
- **Movie Management** — Add, edit, and remove movie listings with image uploads
- **Showtime Management** — Configure showtimes, pricing, and availability
- **Booking Oversight** — Monitor all bookings and revenue analytics
- **Role-Based Access** — Admin-only routes with protected access control

### 🎨 UI/UX Features
- **Responsive Design** — Fully responsive across mobile, tablet, and desktop
- **Modern Interface** — Clean, intuitive design with Material UI components
- **Smooth Animations** — Polished transitions and micro-interactions
- **Dark/Light Theming** — Professional visual hierarchy with consistent styling

---

## 📸 Screenshots

<details>
<summary><strong>Click to expand screenshots</strong></summary>

### Home Page
> _Screenshot: Landing page with hero section and featured movies_

### Movie Listing
> _Screenshot: Browse all available movies with filters_

### Movie Details & Booking
> _Screenshot: Detailed movie view with showtime selection_

### Payment Gateway
> _Screenshot: Secure payment processing with Razorpay/Stripe_

### E-Ticket
> _Screenshot: Generated ticket with QR code_

### Admin Dashboard
> _Screenshot: Admin panel with analytics and management tools_

> **💡 To add screenshots:** Capture your app screens, save them to a `screenshots/` folder, and update the image references above.

</details>

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

| Tool | Version | Download |
|------|---------|----------|
| Node.js | ≥ 18.x | [nodejs.org](https://nodejs.org/) |
| npm | ≥ 9.x | Included with Node.js |
| MongoDB | Atlas or Local | [mongodb.com](https://www.mongodb.com/) |
| Git | Latest | [git-scm.com](https://git-scm.com/) |

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/eldhoaby/GoCineApp.git
cd GoCineApp

# 2. Install backend dependencies
cd backend
npm install

# 3. Install frontend dependencies
cd ../frontend
npm install
```

### Running Locally

```bash
# Terminal 1 — Start Backend Server
cd backend
npm start
# Server runs on http://localhost:3000

# Terminal 2 — Start Frontend Dev Server
cd frontend
npm run dev
# App runs on http://localhost:5173
```

> 📖 For detailed setup instructions, see [docs/setup.md](docs/setup.md)

---

## ⚙️ Environment Setup

### Backend (`backend/.env`)

```env
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/gocine
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:3000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

> ⚠️ **Never commit `.env` files.** Use the provided [`.env.example`](.env.example) as a template.

---

## 📡 API Overview

The backend exposes a RESTful API with the following endpoint groups:

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/users/register` | Register a new user | Public |
| `POST` | `/users/login` | Authenticate user | Public |
| `GET` | `/rooms` | Get all movie listings | Public |
| `GET` | `/rooms/:id` | Get movie details by ID | Public |
| `POST` | `/bookings` | Create a new booking | User |
| `GET` | `/bookings` | Get user's bookings | User |
| `POST` | `/payment` | Process Stripe payment | User |
| `POST` | `/razorpay` | Process Razorpay payment | User |
| `GET` | `/admin/dashboard` | Admin dashboard data | Admin |
| `POST` | `/admin/rooms` | Add new movie listing | Admin |
| `PUT` | `/admin/rooms/:id` | Update movie listing | Admin |
| `DELETE` | `/admin/rooms/:id` | Delete movie listing | Admin |

> 📖 For comprehensive API documentation, see [docs/api-overview.md](docs/api-overview.md)

---

## 🚢 Deployment

### Deployment Architecture

GoCine follows a modern **JAMstack-inspired** deployment architecture:

```
GitHub Repository
       │
       ├──→ Vercel (Frontend)
       │     ├── Automatic deployments on push
       │     ├── Edge network CDN
       │     └── Environment variables configured
       │
       ├──→ Render (Backend)
       │     ├── Automatic deployments on push
       │     ├── Node.js runtime environment
       │     └── Environment variables configured
       │
       └──→ MongoDB Atlas (Database)
             ├── Cloud-hosted cluster
             ├── Automatic backups
             └── Network access whitelist
```

### Frontend Deployment (Vercel)

1. Connect your GitHub repository to [Vercel](https://vercel.com)
2. Set the **Root Directory** to `frontend`
3. Set the **Build Command** to `npm run build`
4. Set the **Output Directory** to `dist`
5. Configure environment variables (`VITE_API_URL`, `VITE_RAZORPAY_KEY_ID`)

### Backend Deployment (Render)

1. Create a new **Web Service** on [Render](https://render.com)
2. Connect your GitHub repository
3. Set the **Root Directory** to `backend`
4. Set the **Build Command** to `npm install`
5. Set the **Start Command** to `npm start`
6. Configure all environment variables

> 📖 For step-by-step deployment guide, see [docs/deployment.md](docs/deployment.md)

---

## 📁 Project Structure

```
GoCineApp/
├── frontend/                   # React + Vite Frontend Application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── assets/             # Images, icons, and media
│   │   ├── components/         # Reusable UI components
│   │   │   ├── hotelOwner/     # Admin panel components
│   │   │   │   ├── Admin.jsx       # Admin layout with routing
│   │   │   │   ├── Dashboard.jsx   # Analytics dashboard
│   │   │   │   ├── EditRoom.jsx    # Edit movie listing
│   │   │   │   ├── HotelReg.jsx    # Add new movie listing
│   │   │   │   ├── ListRooms.jsx   # Manage all listings
│   │   │   │   └── Sidebar.jsx     # Admin sidebar navigation
│   │   │   ├── Footer.jsx         # App footer
│   │   │   ├── Hero.jsx           # Landing hero section
│   │   │   ├── HotelCard.jsx      # Movie card component
│   │   │   ├── Login.jsx          # Login modal
│   │   │   ├── Navbar.jsx         # Navigation bar
│   │   │   ├── Register.jsx       # Registration modal
│   │   │   └── ...
│   │   ├── config/             # App configuration
│   │   │   └── api.js              # API base URL config
│   │   ├── pages/              # Page-level components
│   │   │   ├── Home.jsx            # Landing page
│   │   │   ├── AllRooms.jsx        # Movie listing page
│   │   │   ├── RoomDetails.jsx     # Movie details + booking
│   │   │   ├── Payment.jsx         # Payment processing
│   │   │   ├── Confirmation.jsx    # Booking confirmation + e-ticket
│   │   │   └── MyBookings.jsx      # User booking history
│   │   ├── App.jsx             # Root component with routing
│   │   └── main.jsx            # Application entry point
│   ├── package.json
│   └── vite.config.js
│
├── backend/                    # Node.js + Express Backend API
│   ├── configs/
│   │   └── db.js                   # MongoDB connection config
│   ├── models/
│   │   ├── user.js                 # User schema
│   │   ├── room.js                 # Movie/Room schema
│   │   └── booking.js              # Booking schema
│   ├── routes/
│   │   ├── auth.js                 # Authentication routes
│   │   ├── rooms.js                # Movie CRUD routes
│   │   ├── bookings.js             # Booking management routes
│   │   ├── payment.js              # Stripe payment routes
│   │   ├── razorpay.js             # Razorpay payment routes
│   │   └── admin.js                # Admin management routes
│   ├── server.js               # Express server entry point
│   └── package.json
│
├── docs/                       # Project documentation
│   ├── setup.md                    # Detailed setup guide
│   ├── deployment.md               # Deployment instructions
│   ├── api-overview.md             # API documentation
│   └── project-structure.md        # Architecture details
│
├── .github/                    # GitHub configuration
│   ├── workflows/                  # CI/CD pipelines
│   ├── ISSUE_TEMPLATE/             # Issue templates
│   └── PULL_REQUEST_TEMPLATE.md    # PR template
│
├── CONTRIBUTING.md             # Contribution guidelines
├── CODE_OF_CONDUCT.md          # Code of conduct
├── SECURITY.md                 # Security policy
├── CHANGELOG.md                # Version changelog
├── LICENSE                     # MIT License
└── README.md                   # This file
```

> 📖 For detailed architecture documentation, see [docs/project-structure.md](docs/project-structure.md)

---

## 🔮 Future Improvements

- [ ] **JWT Token Authentication** — Implement token-based auth with refresh tokens
- [ ] **Email Notifications** — Send booking confirmations via email (SendGrid/Nodemailer)
- [ ] **Real-Time Seat Updates** — WebSocket integration for live seat availability
- [ ] **Movie Reviews & Ratings** — User review system with star ratings
- [ ] **Advanced Search & Filters** — Search by genre, language, location, and date
- [ ] **Wishlist & Favorites** — Save movies for later viewing
- [ ] **Multi-Language Support** — Internationalization (i18n) for broader reach
- [ ] **Progressive Web App** — PWA support for mobile-native experience
- [ ] **CI/CD Pipeline Enhancement** — Automated testing and deployment workflows
- [ ] **Docker Containerization** — Containerized development and deployment
- [ ] **Redis Caching** — Performance optimization with server-side caching
- [ ] **Rate Limiting** — API rate limiting for security hardening

---

## 🤝 Contributing

Contributions are what make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please read our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before getting started.

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/amazing-feature

# 3. Commit your changes
git commit -m "feat: add amazing feature"

# 4. Push to the branch
git push origin feature/amazing-feature

# 5. Open a Pull Request
```

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

<div align="center">

**Eldho Baby**

[![GitHub](https://img.shields.io/badge/GitHub-eldhoaby-181717?style=for-the-badge&logo=github)](https://github.com/eldhoaby)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/eldhoaby)

---

<sub>⭐ If you found this project helpful, please consider giving it a star!</sub>

<sub>Built with ❤️ using the MERN Stack</sub>

</div>
