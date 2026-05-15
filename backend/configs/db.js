import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/HomyStay`);
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection error:", error.message);
  }
};

export default connectDB;
