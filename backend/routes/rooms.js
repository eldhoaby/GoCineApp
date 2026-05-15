import express from "express";
import Room from "../models/room.js";
import Booking from "../models/booking.js";

const router = express.Router();

// ✅ Get all rooms (movies)
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    console.error("❌ Error fetching rooms:", error);
    res.status(500).send("Error fetching rooms");
  }
});

// ✅ Add new room/movie
// ✅ Add new room/movie
router.post("/", async (req, res) => {
  try {
    console.log("📥 Incoming room data:", req.body);
    const { name, images, genres, rating, duration, year, price, trailerUrl, city } = req.body;

    if (!name || !images || !genres || !rating || !duration || !year || !price || !city) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newRoom = new Room({
      ...req.body,
      rating: Number(rating),
      price: Number(price)
    });

    await newRoom.save();
    console.log("✅ Room added:", newRoom._id);
    res.status(201).json({ message: "Room added successfully", room: newRoom });
  } catch (error) {
    console.error("❌ Error adding room:", error.message);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});


// ✅ Update room/movie by ID
router.put("/:id", async (req, res) => {
  try {
    await Room.findByIdAndUpdate(req.params.id, req.body);
    res.send("Room updated successfully");
  } catch (error) {
    console.error("❌ Error updating room:", error);
    res.status(500).send("Error updating room");
  }
});

// ✅ Delete room/movie by ID
router.delete("/:id", async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.send("Room deleted successfully");
  } catch (error) {
    console.error("❌ Error deleting room:", error);
    res.status(500).send("Error deleting room");
  }
});

// ✅ Get room/movie by ID
router.get("/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).send("Room not found");
    res.json(room);
  } catch (error) {
    console.error("❌ Error fetching room details:", error);
    res.status(500).send("Error fetching room details");
  }
});

// ✅ Get seats for a specific show
router.get("/:id/shows/:showDate/:showTime", async (req, res) => {
  try {
    const { id, showDate, showTime } = req.params;
    const room = await Room.findById(id);
    if (!room) return res.status(404).json({ error: "Movie not found" });

    const show = room.shows.find(s => s.showDate === showDate && s.showTime === showTime);
    if (!show) return res.status(404).json({ error: "Show not found" });

    res.json(show.seats);
  } catch (err) {
    console.error("❌ Error fetching seats:", err);
    res.status(500).json({ error: "Failed to fetch seats" });
  }
});

export default router;
