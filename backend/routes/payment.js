// routes/payment.js

import express from 'express';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post('/create-order', async (req, res) => {
  const { amount, currency = 'INR' } = req.body;

  const options = {
    amount: amount * 100, // ✅ Razorpay requires paise
    currency,
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order }); // ✅ Send order inside `order` key
  } catch (err) {
    console.error("❌ Razorpay Order Error:", err);
    res.status(500).json({ success: false, error: 'Failed to create Razorpay order' });
  }
});

export default router;
