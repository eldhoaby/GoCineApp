// models/room.js
// import mongoose from "mongoose";

// const seatSchema = new mongoose.Schema({
//   row: String,
//   number: Number,
//   isBooked: { type: Boolean, default: false }
// });

// const showSchema = new mongoose.Schema({
//   showDate: String,
//   showTime: String,
//   seats: [seatSchema]
// });

// const roomSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: String,
//   duration: String,
//   genres: [String],
//   year: Number,
//   rating: Number,
//   price: Number,
//   images: [String],       // array even if only one image
//   trailerUrl: String,
//   shows: [showSchema]
// });

// export default mongoose.model("Room", roomSchema);


// models/room.js
import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
  row: String,
  number: Number,
  isBooked: { type: Boolean, default: false }
});

const showSchema = new mongoose.Schema({
  showDate: String,
  showTime: String,
  seats: [seatSchema]
});

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  duration: String,
  genres: [String],
  year: Number,
  rating: Number,
  price: Number,
  images: [String],       // array even if only one image
  trailerUrl: String,
  city: { type: String, required: false }, // ✅ Added city
  shows: [showSchema]
});

export default mongoose.model("Room", roomSchema);
