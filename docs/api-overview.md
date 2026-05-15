# 📡 API Overview

Comprehensive documentation of the GoCine REST API.

---

## Base URL

| Environment | URL |
|-------------|-----|
| Development | `http://localhost:3000` |
| Production  | `https://gocineapp.onrender.com` |

---

## Authentication Endpoints

### Register User

```http
POST /users/register
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "role": "user"
}
```

**Response:** `201 Created`
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Login User

```http
POST /users/login
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:** `200 OK`
```json
{
  "message": "Login successful",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

## Movie/Room Endpoints

### Get All Listings

```http
GET /rooms
```

**Response:** `200 OK`
```json
[
  {
    "_id": "...",
    "title": "Movie Title",
    "description": "Movie description",
    "price": 250,
    "images": ["url1", "url2"],
    "amenities": [...],
    "rating": 4.5
  }
]
```

### Get Single Listing

```http
GET /rooms/:id
```

**Response:** `200 OK` — Returns detailed movie/show information.

---

## Booking Endpoints

### Create Booking

```http
POST /bookings
Content-Type: application/json
```

**Request Body:**
```json
{
  "userId": "user_id",
  "roomId": "room_id",
  "checkIn": "2026-06-01",
  "checkOut": "2026-06-02",
  "guests": 2,
  "totalAmount": 500
}
```

**Response:** `201 Created`

### Get User Bookings

```http
GET /bookings?userId=<user_id>
```

**Response:** `200 OK` — Returns array of user's bookings.

---

## Payment Endpoints

### Stripe Payment

```http
POST /payment
Content-Type: application/json
```

Processes payment through Stripe payment gateway.

### Razorpay Payment

```http
POST /razorpay
Content-Type: application/json
```

Creates a Razorpay order for payment processing.

---

## Admin Endpoints

> All admin endpoints require admin role authentication.

### Get Dashboard Data

```http
GET /admin/dashboard
```

Returns analytics data including total bookings, revenue, and user statistics.

### Add New Listing

```http
POST /admin/rooms
Content-Type: multipart/form-data
```

Creates a new movie/show listing with image upload support.

### Update Listing

```http
PUT /admin/rooms/:id
Content-Type: multipart/form-data
```

Updates an existing listing.

### Delete Listing

```http
DELETE /admin/rooms/:id
```

Removes a listing from the platform.

---

## Error Responses

All endpoints follow a consistent error format:

```json
{
  "error": "Error description message"
}
```

| Status Code | Description |
|-------------|-------------|
| `400` | Bad Request — Invalid input |
| `401` | Unauthorized — Authentication required |
| `403` | Forbidden — Insufficient permissions |
| `404` | Not Found — Resource doesn't exist |
| `500` | Internal Server Error |

---

## Rate Limiting

Currently, no rate limiting is implemented. This is planned for a future release.

## CORS

The API accepts requests from all origins (`*`) in the current configuration. In production, consider restricting this to your frontend domain.
