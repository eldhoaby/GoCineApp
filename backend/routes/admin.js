// import express from "express";
// import dotenv from "dotenv";
// import Booking from "../models/booking.js";
// import User from "../models/user.js";  // ✅ Make sure this exists and contains `name`, `phone`

// dotenv.config();

// const router = express.Router();

// // ✅ Admin Login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   if (
//     email === process.env.ADMIN_EMAIL &&
//     password === process.env.ADMIN_PASSWORD
//   ) {
//     return res.status(200).json({
//       message: "Admin login successful",
//       role: "admin",
//       email
//     });
//   }

//   res.status(401).json({ message: "Invalid email or password" });
// });

// // ✅ Admin Metrics Route
// // ✅ Admin Dashboard Metrics
// router.get("/metrics", async (req, res) => {
//   try {
//     // Populate userId to access name & phone
//     const allBookings = await Booking.find().populate("userId").sort({ createdAt: -1 });

//     const totalBookings = allBookings.length;
//     const totalRevenue = allBookings.reduce((acc, b) => acc + (b.totalPrice || 0), 0);
//     const pendingBookings = allBookings.filter(b => !b.isPaid).length;

//     const recentBookings = allBookings.slice(0, 5).map(b => ({
//       _id: b._id,
//       userName: b.userId?.name || "N/A",
//       phone: b.userId?.phoneNumber || "N/A",
//       roomName: b.room?.name || "N/A",
//       amount: b.totalPrice || 0,
//       status: b.isPaid ? "Completed" : "Pending"
//     }));

//     // ✅ Send all bookings (for full list view)
//     const bookings = allBookings.map(b => ({
//       _id: b._id,
//       userName: b.userId?.name || "N/A",
//       phone: b.userId?.phoneNumber || "N/A",
//       roomName: b.room?.name || "N/A",
//       amount: b.totalPrice || 0,
//       status: b.isPaid ? "Completed" : "Pending"
//     }));

//     res.status(200).json({
//       totalBookings,
//       totalRevenue,
//       pendingBookings,
//       recentBookings,
//       bookings // 👈 Include full bookings list
//     });
//   } catch (err) {
//     console.error("❌ Admin metrics error:", err);
//     res.status(500).json({ error: "Failed to load metrics" });
//   }
// });


// import express from "express";
// import dotenv from "dotenv";
// import Booking from "../models/booking.js";
// import User from "../models/user.js"; // Make sure the User model exists with `name` and `phoneNumber`

// dotenv.config();

// const router = express.Router();

// // ✅ Admin Login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   if (
//     email === process.env.ADMIN_EMAIL &&
//     password === process.env.ADMIN_PASSWORD
//   ) {
//     return res.status(200).json({
//       message: "Admin login successful",
//       role: "admin",
//       email
//     });
//   }

//   res.status(401).json({ message: "Invalid email or password" });
// });

// // ✅ Admin Dashboard Metrics
// router.get("/metrics", async (req, res) => {
//   try {
//     // Get all bookings and populate user info
//     const allBookings = await Booking.find()
//       .populate("userId")
//       .sort({ createdAt: -1 });

//     const totalBookings = allBookings.length;
//     const totalRevenue = allBookings.reduce(
//       (acc, b) => acc + (b.totalPrice || 0),
//       0
//     );
//     const pendingBookings = allBookings.filter(
//       (b) => b.status === "Pending"
//     ).length;

//     const recentBookings = allBookings.slice(0, 5).map((b) => ({
//       _id: b._id,
//       userName: b.userId?.name || "N/A",
//       phone: b.userId?.phoneNumber || "N/A",
//       roomName: b.room?.name || "N/A",
//       amount: b.totalPrice || 0,
//       status: b.status // ✅ Preserve real status from DB
//     }));

//     const bookings = allBookings.map((b) => ({
//       _id: b._id,
//       userName: b.userId?.name || "N/A",
//       phone: b.userId?.phoneNumber || "N/A",
//       roomName: b.room?.name || "N/A",
//       amount: b.totalPrice || 0,
//       status: b.status // ✅ Preserve real status from DB
//     }));

//     res.status(200).json({
//       totalBookings,
//       totalRevenue,
//       pendingBookings,
//       recentBookings,
//       bookings
//     });
//   } catch (err) {
//     console.error("❌ Admin metrics error:", err);
//     res.status(500).json({ error: "Failed to load metrics" });
//   }
// });

// export default router;


import express from "express";
import dotenv from "dotenv";
import Booking from "../models/booking.js";
import User from "../models/user.js";

dotenv.config();
const router = express.Router();

// ✅ Admin Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.status(200).json({
      message: "Admin login successful",
      role: "admin",
      email
    });
  }

  res.status(401).json({ message: "Invalid email or password" });
});

// ✅ Admin Metrics Route
// ✅ Admin Metrics Route
router.get("/metrics", async (req, res) => {
  try {
    // Get all bookings and populate user info
    const allBookings = await Booking.find()
      .populate("userId")
      .sort({ createdAt: -1 });

    const totalBookings = allBookings.length;
    const totalRevenue = allBookings.reduce(
      (acc, b) => acc + (b.totalPrice || 0),
      0
    );
    const pendingBookings = allBookings.filter(
      (b) => b.status === "Pending"
    ).length;

    // 🧾 Prepare recent 5 bookings summary
    const recentBookings = allBookings.slice(0, 5).map((b) => ({
      _id: b._id,
      userName: b.userId?.name || "N/A",
      email: b.userId?.email || b.email || "N/A",
      movieName: b.room?.name || "N/A",
      location: b.room?.location || "N/A",
      seats:
        b.selectedSeats?.length > 0
          ? b.selectedSeats.map((s) => `${s.row}${s.number}`).join(", ")
          : "N/A",
      showDate: b.showDate || "N/A",
      showtime: b.showtime || "N/A",
      amount: b.totalPrice || 0,
      status: b.status || (b.isPaid ? "Completed" : "Pending"),
    }));

    // 🎬 Full bookings list for dashboard table
    const bookings = allBookings.map((b) => ({
      _id: b._id,
      userName: b.userId?.name || "N/A",
      email: b.userId?.email || b.email || "N/A",
      movieName: b.room?.name || "N/A",
      location: b.room?.location || "N/A",
      seats:
        b.selectedSeats?.length > 0
          ? b.selectedSeats.map((s) => `${s.row}${s.number}`).join(", ")
          : "N/A",
      showDate: b.showDate || "N/A",
      showtime: b.showtime || "N/A",
      amount: b.totalPrice || 0,
      status: b.status || (b.isPaid ? "Completed" : "Pending"),
    }));

    // 🧮 Send all metrics + data
    res.json({
      totalBookings,
      totalRevenue,
      pendingBookings,
      recentBookings,
      bookings,
    });
  } catch (err) {
    console.error("❌ Error fetching metrics:", err);
    res.status(500).json({ error: "Failed to fetch metrics" });
  }
});




// router.get("/metrics", async (req, res) => {
//   try {
//     // Get all bookings and populate user info
//     const allBookings = await Booking.find().populate("userId").sort({ createdAt: -1 });

//     const totalBookings = allBookings.length;
//     const totalRevenue = allBookings.reduce((acc, b) => acc + (b.totalPrice || 0), 0);
//     const pendingBookings = allBookings.filter(b => b.status === "Pending").length;

//     // Recent 5 bookings (for summary if needed)
//     const recentBookings = allBookings.slice(0, 5).map(b => ({
//       _id: b._id,
//       userName: b.userId?.name || "N/A",
//       phone: b.userId?.phoneNumber || "N/A",
//       roomName: b.room?.name || "N/A",
//       amount: b.totalPrice || 0,
//       status: b.status || (b.isPaid ? "Completed" : "Pending")
//     }));

//     // All bookings for full dashboard table
//     const bookings = allBookings.map(b => ({
//       _id: b._id,
//       userName: b.userId?.name || "N/A",
//       phone: b.userId?.phoneNumber || "N/A",
//       roomName: b.room?.name || "N/A",
//       amount: b.totalPrice || 0,
//       status: b.status || (b.isPaid ? "Completed" : "Pending")
//     }));

//     // ✅ Return the metrics
//     res.status(200).json({
//       totalBookings,
//       totalRevenue,
//       pendingBookings,
//       recentBookings,
//       bookings
//     });

//   } catch (err) {
//     console.error("❌ Admin metrics error:", err);
//     res.status(500).json({ error: "Failed to load metrics" });
//   }
// });

export default router;
