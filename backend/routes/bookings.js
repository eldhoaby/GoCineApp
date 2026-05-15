
// // import express from "express";
// // import Booking from "../models/booking.js";

// // const router = express.Router();

// // // Create booking
// // router.post("/", async (req, res) => {
// //   try {
// //     const booking = new Booking(req.body);
// //     await booking.save();
// //     res.status(201).json(booking);
// //   } catch (error) {
// //     console.error("❌ Booking Error:", error);
// //     res.status(500).json({ error: "Failed to create booking" });
// //   }
// // });

// // // Get bookings by user ID
// // router.get("/user/:userId", async (req, res) => {
// //   try {
// //     const bookings = await Booking.find({ userId: req.params.userId }).sort({ createdAt: -1 });
// //     res.status(200).json(bookings);
// //   } catch (error) {
// //     res.status(500).json({ error: "Failed to fetch bookings" });
// //   }
// // });

// // // ✅ Update booking (status or other fields)
// // // ✅ UPDATE booking with status logic
// // router.put("/:id", async (req, res) => {
// //   try {
// //     const updateData = { ...req.body };

// //     // If payment is marked as true, also update status
// //     if (updateData.isPaid === true) {
// //       updateData.status = "Completed";
// //     }

// //     const updatedBooking = await Booking.findByIdAndUpdate(
// //       req.params.id,
// //       { $set: updateData },
// //       { new: true }
// //     );

// //     res.status(200).json(updatedBooking);
// //   } catch (err) {
// //     console.error("❌ Update Error:", err);
// //     res.status(500).json({ error: "Failed to update booking" });
// //   }
// // });


// // // Delete booking
// // router.delete("/:id", async (req, res) => {
// //   try {
// //     await Booking.findByIdAndDelete(req.params.id);
// //     res.status(200).json({ message: "Booking deleted successfully" });
// //   } catch (error) {
// //     res.status(500).json({ error: "Failed to delete booking" });
// //   }
// // });

// // export default router;
// import express from "express";
// import Booking from "../models/booking.js";
// import Room from "../models/room.js"; // assuming your Room model includes shows and seats

// const router = express.Router();

// // -------------------------
// // CREATE BOOKING (hotel or movie)
// // -------------------------
// router.post("/", async (req, res) => {
//   try {
//     const { room, showDate, showtime, selectedSeats } = req.body;

//     // If it's a movie booking (selectedSeats exist)
//     if (selectedSeats && selectedSeats.length > 0) {
//       const movie = await Room.findById(room._id);
//       if (!movie) return res.status(404).json({ error: "Movie not found" });

//       const show = movie.shows.find(
//         s => s.showDate === showDate && s.showTime === showtime
//       );
//       if (!show) return res.status(404).json({ error: "Show not found" });

//       // Check if selected seats are available
//       for (const seat of selectedSeats) {
//         const seatObj = show.seats.find(s => s.row === seat.row && s.number === seat.number);
//         if (!seatObj || seatObj.isBooked) {
//           return res.status(400).json({ error: `Seat ${seat.row}${seat.number} is already booked` });
//         }
//       }

//       // Mark seats as booked
//       selectedSeats.forEach(seat => {
//         const seatObj = show.seats.find(s => s.row === seat.row && s.number === seat.number);
//         if (seatObj) seatObj.isBooked = true;
//       });

//       await movie.save();
//     }

//     // Create booking
//     const booking = new Booking(req.body);
//     await booking.save();
//     res.status(201).json(booking);

//   } catch (error) {
//     console.error("❌ Booking Error:", error);
//     res.status(500).json({ error: "Failed to create booking" });
//   }
// });

// // -------------------------
// // GET bookings by user ID
// // -------------------------
// router.get("/user/:userId", async (req, res) => {
//   try {
//     const bookings = await Booking.find({ userId: req.params.userId }).sort({ createdAt: -1 });
//     res.status(200).json(bookings);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch bookings" });
//   }
// });

// // -------------------------
// // UPDATE booking (status or other fields)
// // -------------------------
// router.put("/:id", async (req, res) => {
//   try {
//     const updateData = { ...req.body };

//     // If payment is marked as true, also update status
//     if (updateData.isPaid === true) {
//       updateData.status = "Completed";
//     }

//     const updatedBooking = await Booking.findByIdAndUpdate(
//       req.params.id,
//       { $set: updateData },
//       { new: true }
//     );

//     res.status(200).json(updatedBooking);
//   } catch (err) {
//     console.error("❌ Update Error:", err);
//     res.status(500).json({ error: "Failed to update booking" });
//   }
// });

// // -------------------------
// // DELETE booking
// // -------------------------
// router.delete("/:id", async (req, res) => {
//   try {
//     await Booking.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Booking deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to delete booking" });
//   }
// });

// export default router;



import express from "express";
import Booking from "../models/booking.js";
import Room from "../models/room.js";

const router = express.Router();

// Create booking and mark seats as booked
router.post("/", async (req, res) => {
  try {
    const bookingData = req.body;

    // Validate required fields
    const { userId, room, showDate, showtime, selectedSeats, totalPrice } = bookingData;
    if (!userId || !room?._id || !showDate || !showtime || !selectedSeats?.length || !totalPrice) {
      return res.status(400).json({ error: "Missing required booking fields" });
    }

    // Fetch room
    const roomDoc = await Room.findById(room._id);
    if (!roomDoc) return res.status(404).json({ error: "Movie not found" });

    // Find the show
    const show = roomDoc.shows.find(s => s.showDate === showDate && s.showTime === showtime);
    if (!show) return res.status(404).json({ error: "Show not found" });

    // Check if seats are already booked
    const alreadyBooked = selectedSeats.some(seat => {
      const seatObj = show.seats.find(s => s.row === seat.row && s.number === seat.number);
      return seatObj?.isBooked;
    });
    if (alreadyBooked) return res.status(400).json({ error: "One or more seats are already booked" });

    // Mark seats as booked
    selectedSeats.forEach(seat => {
      const seatToUpdate = show.seats.find(s => s.row === seat.row && s.number === seat.number);
      if (seatToUpdate) seatToUpdate.isBooked = true;
    });

    await roomDoc.save();

    // Save booking
    const booking = new Booking(bookingData);
    await booking.save();

    res.status(201).json(booking);
  } catch (error) {
    console.error("❌ Booking Error:", error);
    res.status(500).json({ error: "Failed to create booking", details: error.message });
  }
});

// Get bookings by user ID
router.get("/user/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// Update booking (status or other fields)
router.put("/:id", async (req, res) => {
  try {
    const updateData = { ...req.body };

    // If payment is marked as true, also update status
    if (updateData.isPaid === true) {
      updateData.status = "Completed";
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    res.status(200).json(updatedBooking);
  } catch (err) {
    console.error("❌ Update Error:", err);
    res.status(500).json({ error: "Failed to update booking" });
  }
});

// Delete booking
router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete booking" });
  }
});

export default router;
