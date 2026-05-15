// server.js

import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";


//import adminRoutes from './routes/admin.js';
//app.use('/admin', adminRoutes);


// Route imports
import authRoutes from "./routes/auth.js";
import roomRoutes from "./routes/rooms.js";
import adminRoutes from "./routes/admin.js";
import bookingRoutes from "./routes/bookings.js";
import paymentRoutes from "./routes/payment.js";
import razorpayRoutes from "./routes/razorpay.js";

// Connect to DB
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: "*" }));

app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("✅ API is working fine"));

app.use("/users", authRoutes);         // login/register etc.
app.use("/rooms", roomRoutes);
app.use("/bookings", bookingRoutes);
app.use("/payment", paymentRoutes);
app.use("/razorpay", razorpayRoutes);
app.use("/admin", adminRoutes);       // ✅ Mounted at /admin

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "❌ Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
