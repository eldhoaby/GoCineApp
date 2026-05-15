import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  room: {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    images: [String]
  },
  guests: {         // number of tickets
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: "Pending"
  },
  showDate: {       // date of the movie show
    type: String
  },
  showtime: {       // showtime of the movie
    type: String
  },
  selectedSeats: [  // seats booked
    {
      row: String,
      number: Number
    }
  ],
  name: String,
  email: String
}, {
  timestamps: true
});

export default mongoose.model("Booking", bookingSchema);
