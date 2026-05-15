// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// const Payment = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { booking } = location.state || {};
//   if (!booking) {
//     return (
//       <p className="pt-32 text-center text-red-600">
//         Invalid booking. Please try again.
//       </p>
//     );
//   }

//   const { room, guests, totalPrice, selectedSeats, _id: bookingId } = booking;

//   const key = import.meta.env.VITE_RAZORPAY_KEY_ID;

//   const handlePayment = async () => {
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       if (!user?._id) {
//         alert("Please log in to continue.");
//         navigate("/login");
//         return;
//       }

//       // ✅ Create Razorpay order via backend
//       const res = await fetch("http://localhost:3000/razorpay/create-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount: totalPrice }), // send human-readable amount
//       });

//       if (!res.ok) throw new Error("Failed to create Razorpay order");

//       const data = await res.json();
//       if (!data.success) throw new Error("Failed to create Razorpay order");

//       const order = data.order;

//       const options = {
//         key,
//         amount: order.amount, // backend already multiplied by 100
//         currency: order.currency,
//         name: "Movie Booking",
//         description: `${room.name} - Seats: ${selectedSeats
//           .map((s) => s.row + s.number)
//           .join(", ")}`,
//         order_id: order.id,
//         handler: async function (response) {
//           alert("Payment Successful! ✅");
//           try {
//             const updateRes = await axios.put(
//               `http://localhost:3000/bookings/${bookingId}`,
//               { isPaid: true }
//             );
//             navigate("/confirmation", { state: { booking: updateRes.data } });
//           } catch (err) {
//             console.error("Booking update failed:", err);
//             alert("Payment succeeded, but failed to update booking.");
//           }
//         },
//         prefill: {
//           name: user.name || "Guest",
//           email: user.email || "guest@example.com",
//           contact: "9999999999",
//         },
//         theme: { color: "#F37254" },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error("Payment error:", err);
//       alert("Something went wrong during payment.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="bg-white shadow-lg p-10 rounded-lg w-full max-w-lg text-center">
//         <h2 className="text-2xl font-bold mb-4">Proceed to Payment</h2>
//         <p className="mb-2">
//           <strong>Movie:</strong> {room.name}
//         </p>
//         <p className="mb-2">
//           <strong>Seats:</strong>{" "}
//           {selectedSeats.map((s) => s.row + s.number).join(", ")}
//         </p>
//         <p className="mb-2">
//           <strong>Number of Tickets:</strong> {guests}
//         </p>
//         <p className="text-lg font-medium mt-4 mb-6">
//           Total: ₹{totalPrice}
//         </p>
//         <button
//           onClick={handlePayment}
//           className="px-6 py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
//         >
//           Pay Now with Razorpay
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Payment;

// 
// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Payment = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const { booking } = location.state || {};

//   if (!booking || !booking._id) {
//     return (
//       <p className="pt-32 text-center text-red-600">
//         Invalid booking. Please try again.
//       </p>
//     );
//   }

//   const { room, hotel, guests, totalPrice, selectedSeats, showDate, showTime } = booking;
//   const bookingId = booking._id;
//   const key = import.meta.env.VITE_RAZORPAY_KEY_ID;

//   // Format date & time nicely
//   const formattedDateTime = () => {
//     if (!showDate || !showTime) return 'N/A';
//     const dateObj = new Date(`${showDate}T${showTime}`);
//     const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
//     const dateStr = dateObj.toLocaleDateString(undefined, options); // e.g., Saturday, 18 Oct 2025
//     const timeStr = dateObj.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true }); // e.g., 07:00 PM
//     return `${dateStr} - ${timeStr}`;
//   };

//   const handlePayment = async () => {
//     setLoading(true);
//     try {
//       const user = JSON.parse(localStorage.getItem('user'));
//       if (!user?._id) {
//         alert('Please log in to continue.');
//         navigate('/login');
//         return;
//       }

//       const res = await fetch('http://localhost:3000/razorpay/create-order', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ amount: Number(totalPrice) * 100 }),
//       });

//       if (!res.ok) throw new Error('Failed to create Razorpay order');

//       const data = await res.json();
//       if (!data.success) throw new Error('Failed to create Razorpay order');

//       const order = data.order;

//       const options = {
//         key,
//         amount: order.amount,
//         currency: order.currency,
//         name: hotel?.name || 'Movie Booking',
//         description: `${room?.name} - Seats: ${selectedSeats?.length ? selectedSeats.map(s => s.row + s.number).join(', ') : 'N/A'} | ${formattedDateTime()}`,
//         order_id: order.id,
//         handler: async function (response) {
//           alert('Payment Successful! ✅');
//           try {
//             const updateRes = await axios.put(
//               `http://localhost:3000/bookings/${bookingId}`,
//               { isPaid: true }
//             );
//             navigate('/confirmation', { state: { booking: updateRes.data } });
//           } catch (err) {
//             console.error('Booking update failed:', err);
//             alert('Payment succeeded, but failed to update booking.');
//           }
//         },
//         prefill: {
//           name: user.name || 'Guest',
//           email: user.email || 'guest@example.com',
//           contact: user.phone || '9999999999',
//         },
//         theme: { color: '#F37254' },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error('Payment error:', err);
//       alert('Something went wrong during payment.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="bg-white shadow-lg p-10 rounded-lg w-full max-w-lg text-center">
//         <h2 className="text-2xl font-bold mb-4">Proceed to Payment</h2>
//         <p className="mb-2"><strong>Movie:</strong> {room?.name}</p>
//         <p className="mb-2"><strong>Show Date & Time:</strong> {formattedDateTime()}</p>
//         <p className="mb-2">
//           <strong>Seats:</strong> {selectedSeats?.map(s => s.row + s.number).join(', ')}
//         </p>
//         <p className="mb-2"><strong>Number of Tickets:</strong> {guests}</p>
//         <p className="text-lg font-medium mt-4 mb-6">
//           Total: ₹{totalPrice}
//         </p>
//         <button
//           onClick={handlePayment}
//           disabled={loading}
//           className="px-6 py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700 disabled:opacity-50"
//         >
//           {loading ? 'Processing...' : 'Pay Now with Razorpay'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Payment;


// 

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config/api';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { booking } = location.state || {};

  if (!booking || !booking._id) {
    return (
      <p className="pt-32 text-center text-red-600">
        Invalid booking. Please try again.
      </p>
    );
  }

  const { room, hotel, guests, totalPrice, selectedSeats, showDate, showtime } = booking;
  const bookingId = booking._id;
  const key = import.meta.env.VITE_RAZORPAY_KEY_ID;

  // ✅ Helper function to format date & time beautifully
  const formatShowDateTime = (date, time) => {
    if (!date && !time) return "N/A";
    try {
      const formattedDate = new Date(date).toLocaleDateString("en-IN", {
        weekday: "long",
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      // convert 24hr to 12hr format with AM/PM
      let [hours, minutes] = time.split(":");
      hours = parseInt(hours);
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      const formattedTime = `${hours}:${minutes} ${ampm}`;

      return { formattedDate, formattedTime };
    } catch {
      return { formattedDate: "Invalid", formattedTime: "" };
    }
  };

  const { formattedDate, formattedTime } = formatShowDateTime(showDate, showtime);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user?._id) {
        alert('Please log in to continue.');
        navigate('/login');
        return;
      }

      const res = await fetch(`${API_BASE_URL}/razorpay/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Number(totalPrice) }),
      });

      if (!res.ok) throw new Error('Failed to create Razorpay order');

      const data = await res.json();
      if (!data.success) throw new Error('Failed to create Razorpay order');

      const order = data.order;

      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: hotel?.name || 'Movie Booking',
        description: `${room?.name} - Seats: ${
          selectedSeats?.length
            ? selectedSeats.map(s => s.row + s.number).join(', ')
            : 'N/A'
        }`,
        order_id: order.id,
        handler: async function (response) {
          alert('Payment Successful! ✅');
          try {
            const updateRes = await axios.put(
              `${API_BASE_URL}/bookings/${bookingId}`,
              { isPaid: true }
            );
            navigate('/confirmation', { state: { booking: updateRes.data } });
          } catch (err) {
            console.error('Booking update failed:', err);
            alert('Payment succeeded, but failed to update booking.');
          }
        },
        prefill: {
          name: user.name || 'Guest',
          email: user.email || 'guest@example.com',
          contact: user.phone || '9999999999',
        },
        theme: { color: '#F37254' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Payment error:', err);
      alert('Something went wrong during payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg p-10 rounded-2xl w-full max-w-lg text-center border border-gray-200">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">Proceed to Payment</h2>
        <p className="text-lg mb-2"><strong>🎬 Movie:</strong> {room?.name}</p>
        <p className="text-lg mb-2"><strong>📅 Date:</strong> {formattedDate}</p>
        <p className="text-lg mb-2"><strong>🕒 Time:</strong> {formattedTime}</p>
        <p className="text-lg mb-2">
          <strong>🎟 Seats:</strong>{" "}
          {selectedSeats?.length
            ? selectedSeats.map(s => s.row + s.number).join(', ')
            : "Not selected"}
        </p>
        <p className="text-lg mb-2"><strong>👥 Tickets:</strong> {guests}</p>
        <p className="text-xl font-bold mt-5 mb-8 text-green-700">
          Total: ₹{totalPrice?.toLocaleString("en-IN")}
        </p>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-all disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Pay Now with Razorpay'}
        </button>
      </div>
    </div>
  );
};

export default Payment;
