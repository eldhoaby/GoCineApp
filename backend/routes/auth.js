import express from "express";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();
const router = express.Router();

// ✅ GET /users - Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // hide password
    res.status(200).json(users);
  } catch (error) {
    console.error("Fetch users error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET /users/:id - Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.error("Get user error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ POST /users/login - Admin + User login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // ✅ Admin login
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.status(200).json({
      message: "Admin login successful",
      role: "admin",
      name: "Admin",
      email,
    });
  }

  // ✅ User login
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "User login successful",
      role: "user",
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ POST /users/register - New user registration
router.post("/register", async (req, res) => {
  try {
    const { name, age, country, phoneNumber, email, password } = req.body;

    if (!name || !age || !country || !phoneNumber || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ name, age, country, phoneNumber, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ PUT /users/:id - Update user
router.put("/:id", async (req, res) => {
  try {
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Update error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ DELETE /users/:id - Delete user
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
