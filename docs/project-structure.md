# 🏗️ Project Structure & Architecture

Detailed breakdown of the GoCine application architecture and codebase organization.

---

## High-Level Architecture

GoCine follows a **monorepo structure** with clear separation between frontend and backend:

```
GoCineApp/
├── frontend/          → React SPA (Client)
├── backend/           → Express REST API (Server)
├── docs/              → Project documentation
└── .github/           → GitHub configuration & CI/CD
```

---

## Frontend Architecture

The frontend is a **React 19** single-page application built with **Vite** and styled using **Tailwind CSS** + **Material UI**.

```
frontend/src/
├── components/              # Reusable UI components
│   ├── Navbar.jsx              Navigation bar with auth state
│   ├── Footer.jsx              Application footer
│   ├── Hero.jsx                Landing page hero section
│   ├── HotelCard.jsx           Movie/show card component
│   ├── FeaturedDestination.jsx Featured content showcase
│   ├── Login.jsx               Login modal component
│   ├── Register.jsx            Registration modal component
│   ├── StarRating.jsx          Star rating display
│   ├── Testimonial.jsx         User testimonial component
│   ├── Title.jsx               Section title component
│   └── hotelOwner/             Admin panel components
│       ├── Admin.jsx               Admin layout + routing
│       ├── Dashboard.jsx           Analytics dashboard
│       ├── HotelReg.jsx            Add new listing form
│       ├── ListRooms.jsx           Manage all listings
│       ├── EditRoom.jsx            Edit listing form
│       └── Sidebar.jsx             Admin sidebar nav
│
├── pages/                   # Page-level route components
│   ├── Home.jsx                Landing page
│   ├── AllRooms.jsx            Browse all listings
│   ├── RoomDetails.jsx         Detailed view + booking
│   ├── Payment.jsx             Payment processing
│   ├── Confirmation.jsx        Booking confirmation + e-ticket
│   └── MyBookings.jsx          User booking history
│
├── config/                  # App configuration
│   └── api.js                  Centralized API base URL
│
├── assets/                  # Static assets (images, icons)
├── App.jsx                  # Root component with routing
├── main.jsx                 # Application entry point
└── index.css                # Global styles
```

### Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| **Vite** over CRA | Faster builds, HMR, and modern ESM support |
| **Tailwind + MUI** | Utility-first CSS with pre-built components for rapid development |
| **Centralized API config** | Single source of truth for API URL across environments |
| **Modal-based auth** | Non-disruptive login/register UX without page navigation |
| **Role-based routing** | Admin routes nested under `/admin/*` with dedicated layout |

---

## Backend Architecture

The backend is a **Node.js** REST API built with **Express 5** and **MongoDB** via **Mongoose**.

```
backend/
├── server.js           # Express app setup & route mounting
├── configs/
│   └── db.js              MongoDB connection configuration
├── models/
│   ├── user.js            User schema (name, email, password, role)
│   ├── room.js            Room/Movie schema (title, images, pricing)
│   └── booking.js         Booking schema (user, room, dates, payment)
├── routes/
│   ├── auth.js            Authentication (register, login)
│   ├── rooms.js           Movie/Room CRUD operations
│   ├── bookings.js        Booking management
│   ├── payment.js         Stripe payment processing
│   ├── razorpay.js        Razorpay payment processing
│   └── admin.js           Admin dashboard & management
└── package.json
```

### Request Flow

```
Client Request
     │
     ▼
Express Server (server.js)
     │
     ├── CORS Middleware
     ├── JSON Body Parser
     │
     ▼
Route Handler (routes/*.js)
     │
     ├── Input Validation
     ├── Business Logic
     │
     ▼
Mongoose Model (models/*.js)
     │
     ▼
MongoDB Atlas (Cloud)
     │
     ▼
JSON Response → Client
```

### API Route Mapping

| Route Prefix | Handler File | Purpose |
|-------------|--------------|---------|
| `/users` | `routes/auth.js` | User authentication |
| `/rooms` | `routes/rooms.js` | Movie/room operations |
| `/bookings` | `routes/bookings.js` | Booking management |
| `/payment` | `routes/payment.js` | Stripe payments |
| `/razorpay` | `routes/razorpay.js` | Razorpay payments |
| `/admin` | `routes/admin.js` | Admin operations |

---

## Data Models

### User Model
```
User {
  name:      String (required)
  email:     String (required, unique)
  password:  String (required)
  role:      String (user | admin)
}
```

### Room Model
```
Room {
  title:       String
  description: String
  price:       Number
  images:      [String]
  amenities:   [String]
  rating:      Number
  location:    String
  available:   Boolean
}
```

### Booking Model
```
Booking {
  userId:      ObjectId → User
  roomId:      ObjectId → Room
  checkIn:     Date
  checkOut:    Date
  guests:      Number
  totalAmount: Number
  status:      String
  paymentId:   String
}
```

---

## Authentication Flow

```
┌─────────┐     POST /users/register     ┌──────────┐
│  Client  │ ──────────────────────────→  │  Server  │
│          │                              │          │
│          │     POST /users/login        │          │
│          │ ──────────────────────────→  │          │
│          │  ←── User data + role ─────  │          │
│          │                              │          │
│  Store   │     Subsequent requests      │  Check   │
│  in      │ ──── with user context ───→  │  role    │
│  Local   │                              │  for     │
│  Storage │  ←── Protected response ───  │  access  │
└─────────┘                              └──────────┘
```

---

## Payment Flow

```
User selects movie/show
         │
         ▼
User completes booking form
         │
         ▼
Choose payment method
    ┌────┴────┐
    │         │
 Razorpay  Stripe
    │         │
    ▼         ▼
Payment SDK   Payment Intent
initialized   created (server)
    │         │
    ▼         ▼
User pays     User pays
    │         │
    └────┬────┘
         │
         ▼
Booking confirmed
         │
         ▼
E-ticket generated (PDF + QR)
```
