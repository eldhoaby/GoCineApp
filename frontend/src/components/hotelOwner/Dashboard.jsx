// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Dashboard = () => {
//   const [metrics, setMetrics] = useState({
//     totalBookings: 0,
//     totalRevenue: 0,
//     pendingBookings: 0,
//     bookings: []
//   });

//   useEffect(() => {
//     fetchMetrics();
//   }, []);

//   const fetchMetrics = async () => {
//     try {
//       const res = await axios.get('http://localhost:3000/admin/metrics');
//       setMetrics(res.data);
//     } catch (err) {
//       console.error("❌ Error fetching metrics:", err);
//     }
//   };

//   const handleCancelBooking = async (bookingId) => {
//     const confirm = window.confirm("Are you sure you want to cancel this booking?");
//     if (!confirm) return;

//     try {
//       await axios.put(`http://localhost:3000/bookings/${bookingId}`, { status: "Cancelled by Admin" });
//       alert("✅ Booking cancelled successfully!");
//       fetchMetrics();
//     } catch (error) {
//       console.error("❌ Error cancelling booking:", error);
//       alert("Failed to cancel booking.");
//     }
//   };

//   const handleDeleteBooking = async (bookingId) => {
//     const confirm = window.confirm("Are you sure you want to delete this booking permanently?");
//     if (!confirm) return;

//     try {
//       await axios.delete(`http://localhost:3000/bookings/${bookingId}`);
//       alert("🗑️ Booking deleted successfully!");
//       fetchMetrics();
//     } catch (error) {
//       console.error("❌ Error deleting booking:", error);
//       alert("Failed to delete booking.");
//     }
//   };

//   return (
//     <div className="space-y-6 px-4 py-6">
//       {/* Top metrics */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <div className="bg-blue-500 text-white rounded p-6 shadow">
//           <h3 className="text-lg font-medium">Total Bookings</h3>
//           <p className="text-2xl font-bold mt-2">{metrics.totalBookings}</p>
//         </div>
//         <div className="bg-green-500 text-white rounded p-6 shadow">
//           <h3 className="text-lg font-medium">Total Revenue</h3>
//           <p className="text-2xl font-bold mt-2">₹{metrics.totalRevenue}</p>
//         </div>
//         <div className="bg-yellow-500 text-white rounded p-6 shadow">
//           <h3 className="text-lg font-medium">Pending Bookings</h3>
//           <p className="text-2xl font-bold mt-2">{metrics.pendingBookings}</p>
//         </div>
//       </div>

//       {/* All Bookings Table */}
//       <div className="bg-white rounded shadow p-4 mt-6 overflow-x-auto">
//         <h2 className="text-lg font-semibold mb-3">All Bookings</h2>
//         <table className="w-full text-left">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="py-2 px-4 font-medium">User</th>
//               <th className="py-2 px-4 font-medium">Phone</th>
//               <th className="py-2 px-4 font-medium">Movie</th>
//               <th className="py-2 px-4 font-medium">Amount</th>
//               <th className="py-2 px-4 font-medium">Status</th>
//               <th className="py-2 px-4 font-medium">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {metrics.bookings && metrics.bookings.length > 0 ? (
//               metrics.bookings.map((b, idx) => (
//                 <tr key={idx} className="border-t">
//                   <td className="py-2 px-4">{b.userName}</td>
//                   <td className="py-2 px-4">{b.phone}</td>
//                   <td className="py-2 px-4">{b.roomName}</td>
//                   <td className="py-2 px-4">₹{b.amount}</td>
//                   <td className="py-2 px-4">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-medium ${
//                         b.status === 'Completed'
//                           ? 'bg-green-100 text-green-700'
//                           : b.status === 'Cancelled by Admin'
//                           ? 'bg-red-100 text-red-700'
//                           : 'bg-yellow-100 text-yellow-700'
//                       }`}
//                     >
//                       {b.status}
//                     </span>
//                   </td>
//                   <td className="py-2 px-4 space-x-2">
//                     {b.status === "Cancelled by Admin" ? (
//                       <span className="text-red-600 font-semibold text-xs">Cancelled</span>
//                     ) : (
//                       <button
//                         onClick={() => handleCancelBooking(b._id)}
//                         className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs"
//                       >
//                         Cancel
//                       </button>
//                     )}
//                     <button
//                       onClick={() => handleDeleteBooking(b._id)}
//                       className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr className="border-t">
//                 <td className="py-3 px-4 text-gray-500" colSpan={6}>
//                   No bookings found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Dashboard = () => {
//   const [metrics, setMetrics] = useState({
//     totalBookings: 0,
//     totalRevenue: 0,
//     pendingBookings: 0,
//     totalSeatsBooked: 0,
//     totalShowsBooked: 0,
//     bookings: []
//   });

//   useEffect(() => {
//     fetchMetrics();
//   }, []);

//   const fetchMetrics = async () => {
//     try {
//       const res = await axios.get('http://localhost:3000/admin/metrics');
//       const data = res.data;

//       // Calculate total seats booked
//       const totalSeats = data.bookings.reduce(
//         (sum, booking) => sum + (booking.bookedSeats?.length || 0),
//         0
//       );

//       // Count unique show date-times
//       const uniqueShows = new Set(
//         data.bookings.map(b => b.showDateTime)
//       ).size;

//       setMetrics({
//         ...data,
//         totalSeatsBooked: totalSeats,
//         totalShowsBooked: uniqueShows
//       });
//     } catch (err) {
//       console.error("❌ Error fetching metrics:", err);
//     }
//   };

//   const handleCancelBooking = async (bookingId) => {
//     const confirm = window.confirm("Are you sure you want to cancel this booking?");
//     if (!confirm) return;

//     try {
//       await axios.put(`http://localhost:3000/bookings/${bookingId}`, { status: "Cancelled by Admin" });
//       alert("✅ Booking cancelled successfully!");
//       fetchMetrics();
//     } catch (error) {
//       console.error("❌ Error cancelling booking:", error);
//       alert("Failed to cancel booking.");
//     }
//   };

//   const handleDeleteBooking = async (bookingId) => {
//     const confirm = window.confirm("Are you sure you want to delete this booking permanently?");
//     if (!confirm) return;

//     try {
//       await axios.delete(`http://localhost:3000/bookings/${bookingId}`);
//       alert("🗑️ Booking deleted successfully!");
//       fetchMetrics();
//     } catch (error) {
//       console.error("❌ Error deleting booking:", error);
//       alert("Failed to delete booking.");
//     }
//   };

//   return (
//     <div className="space-y-6 px-4 py-6">
//       {/* Top metrics */}
//       <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
//         <div className="bg-blue-500 text-white rounded p-6 shadow">
//           <h3 className="text-lg font-medium">Total Bookings</h3>
//           <p className="text-2xl font-bold mt-2">{metrics.totalBookings}</p>
//         </div>
//         <div className="bg-green-500 text-white rounded p-6 shadow">
//           <h3 className="text-lg font-medium">Total Revenue</h3>
//           <p className="text-2xl font-bold mt-2">₹{metrics.totalRevenue}</p>
//         </div>
//         <div className="bg-yellow-500 text-white rounded p-6 shadow">
//           <h3 className="text-lg font-medium">Pending Bookings</h3>
//           <p className="text-2xl font-bold mt-2">{metrics.pendingBookings}</p>
//         </div>
//         <div className="bg-purple-500 text-white rounded p-6 shadow">
//           <h3 className="text-lg font-medium">Total Seats Booked</h3>
//           <p className="text-2xl font-bold mt-2">{metrics.totalSeatsBooked}</p>
//         </div>
//         <div className="bg-indigo-500 text-white rounded p-6 shadow">
//           <h3 className="text-lg font-medium">Total Shows Booked</h3>
//           <p className="text-2xl font-bold mt-2">{metrics.totalShowsBooked}</p>
//         </div>
//       </div>

//       {/* All Bookings Table */}
//       <div className="bg-white rounded shadow p-4 mt-6 overflow-x-auto">
//         <h2 className="text-lg font-semibold mb-3">All Bookings</h2>
//         <table className="w-full text-left">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="py-2 px-4 font-medium">User</th>
//               <th className="py-2 px-4 font-medium">Phone</th>
//               <th className="py-2 px-4 font-medium">Movie</th>
//               <th className="py-2 px-4 font-medium">Location</th>
//               <th className="py-2 px-4 font-medium">Seats</th>
//               <th className="py-2 px-4 font-medium">Show Date & Time</th>
//               <th className="py-2 px-4 font-medium">Amount</th>
//               <th className="py-2 px-4 font-medium">Status</th>
//               <th className="py-2 px-4 font-medium">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {metrics.bookings && metrics.bookings.length > 0 ? (
//               metrics.bookings.map((b, idx) => (
//                 <tr key={idx} className="border-t">
//                   <td className="py-2 px-4">{b.userName}</td>
//                   <td className="py-2 px-4">{b.phone}</td>
//                   <td className="py-2 px-4">{b.movieName}</td>
//                   <td className="py-2 px-4">{b.location}</td>
//                   <td className="py-2 px-4">{b.bookedSeats?.join(', ')}</td>
//                   <td className="py-2 px-4">
//                     {new Date(b.showDateTime).toLocaleString('en-IN', {
//                       day: '2-digit',
//                       month: 'short',
//                       year: 'numeric',
//                       hour: '2-digit',
//                       minute: '2-digit',
//                       hour12: true
//                     })}
//                   </td>
//                   <td className="py-2 px-4">₹{b.amount}</td>
//                   <td className="py-2 px-4">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-medium ${
//                         b.status === 'Completed'
//                           ? 'bg-green-100 text-green-700'
//                           : b.status === 'Cancelled by Admin'
//                           ? 'bg-red-100 text-red-700'
//                           : 'bg-yellow-100 text-yellow-700'
//                       }`}
//                     >
//                       {b.status}
//                     </span>
//                   </td>
//                   <td className="py-2 px-4 space-x-2">
//                     {b.status === "Cancelled by Admin" ? (
//                       <span className="text-red-600 font-semibold text-xs">Cancelled</span>
//                     ) : (
//                       <button
//                         onClick={() => handleCancelBooking(b._id)}
//                         className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs"
//                       >
//                         Cancel
//                       </button>
//                     )}
//                     <button
//                       onClick={() => handleDeleteBooking(b._id)}
//                       className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr className="border-t">
//                 <td className="py-3 px-4 text-gray-500" colSpan={9}>
//                   No bookings found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Dashboard = () => {
//   const [metrics, setMetrics] = useState({
//     totalBookings: 0,
//     totalRevenue: 0,
//     pendingBookings: 0,
//     totalSeatsBooked: 0,
//     totalShowsBooked: 0,
//     bookings: []
//   });

//   useEffect(() => {
//     fetchMetrics();
//   }, []);

//   const fetchMetrics = async () => {
//     try {
//       const res = await axios.get('http://localhost:3000/admin/metrics');
//       const data = res.data;

//       // Calculate total seats booked
//       const totalSeats = data.bookings.reduce(
//         (sum, booking) => sum + (booking.selectedSeats?.length || 0),
//         0
//       );

//       // Count unique show date-times
//       const uniqueShows = new Set(
//         data.bookings.map(b => `${b.showDate} ${b.showtime}`)
//       ).size;

//       setMetrics({
//         ...data,
//         totalSeatsBooked: totalSeats,
//         totalShowsBooked: uniqueShows
//       });
//     } catch (err) {
//       console.error("❌ Error fetching metrics:", err);
//     }
//   };

//   const handleCancelBooking = async (bookingId) => {
//     const confirm = window.confirm("Are you sure you want to cancel this booking?");
//     if (!confirm) return;

//     try {
//       await axios.put(`http://localhost:3000/bookings/${bookingId}`, { status: "Cancelled by Admin" });
//       alert("✅ Booking cancelled successfully!");
//       fetchMetrics();
//     } catch (error) {
//       console.error("❌ Error cancelling booking:", error);
//       alert("Failed to cancel booking.");
//     }
//   };

//   const handleDeleteBooking = async (bookingId) => {
//     const confirm = window.confirm("Are you sure you want to delete this booking permanently?");
//     if (!confirm) return;

//     try {
//       await axios.delete(`http://localhost:3000/bookings/${bookingId}`);
//       alert("🗑️ Booking deleted successfully!");
//       fetchMetrics();
//     } catch (error) {
//       console.error("❌ Error deleting booking:", error);
//       alert("Failed to delete booking.");
//     }
//   };

//   return (
//     <div className="space-y-6 px-4 py-6">
//       {/* Top metrics */}
//       <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
//         <div className="bg-blue-500 text-white rounded p-6 shadow">
//           <h3 className="text-lg font-medium">Total Bookings</h3>
//           <p className="text-2xl font-bold mt-2">{metrics.totalBookings}</p>
//         </div>
//         <div className="bg-green-500 text-white rounded p-6 shadow">
//           <h3 className="text-lg font-medium">Total Revenue</h3>
//           <p className="text-2xl font-bold mt-2">₹{metrics.totalRevenue}</p>
//         </div>
//         <div className="bg-yellow-500 text-white rounded p-6 shadow">
//           <h3 className="text-lg font-medium">Pending Bookings</h3>
//           <p className="text-2xl font-bold mt-2">{metrics.pendingBookings}</p>
//         </div>
//         <div className="bg-purple-500 text-white rounded p-6 shadow">
//           <h3 className="text-lg font-medium">Total Seats Booked</h3>
//           <p className="text-2xl font-bold mt-2">{metrics.totalSeatsBooked}</p>
//         </div>
//         <div className="bg-indigo-500 text-white rounded p-6 shadow">
//           <h3 className="text-lg font-medium">Total Shows Booked</h3>
//           <p className="text-2xl font-bold mt-2">{metrics.totalShowsBooked}</p>
//         </div>
//       </div>

//       {/* All Bookings Table */}
//       <div className="bg-white rounded shadow p-4 mt-6 overflow-x-auto">
//         <h2 className="text-lg font-semibold mb-3">All Bookings</h2>
//         <table className="w-full text-left">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="py-2 px-4 font-medium">User</th>
//               <th className="py-2 px-4 font-medium">Phone</th>
//               <th className="py-2 px-4 font-medium">Movie</th>
//               <th className="py-2 px-4 font-medium">Location</th>
//               <th className="py-2 px-4 font-medium">Seats</th>
//               <th className="py-2 px-4 font-medium">Show Date & Time</th>
//               <th className="py-2 px-4 font-medium">Amount</th>
//               <th className="py-2 px-4 font-medium">Status</th>
//               <th className="py-2 px-4 font-medium">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {metrics.bookings && metrics.bookings.length > 0 ? (
//               metrics.bookings.map((b, idx) => (
//                 <tr key={idx} className="border-t">
//                   <td className="py-2 px-4">{b.name}</td>
//                   <td className="py-2 px-4">{b.email}</td>
//                   <td className="py-2 px-4">{b.room?.name || 'N/A'}</td>
//                   <td className="py-2 px-4">{b.room?.location || 'N/A'}</td>
//                   <td className="py-2 px-4">
//                     {b.selectedSeats?.map(s => `${s.row}${s.number}`).join(', ')}
//                   </td>
//                   <td className="py-2 px-4">
//                     {b.showDate} {b.showtime}
//                   </td>
//                   <td className="py-2 px-4">₹{b.totalPrice}</td>
//                   <td className="py-2 px-4">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-medium ${
//                         b.status === 'Completed'
//                           ? 'bg-green-100 text-green-700'
//                           : b.status === 'Cancelled by Admin'
//                           ? 'bg-red-100 text-red-700'
//                           : 'bg-yellow-100 text-yellow-700'
//                       }`}
//                     >
//                       {b.status}
//                     </span>
//                   </td>
//                   <td className="py-2 px-4 space-x-2">
//                     {b.status === "Cancelled by Admin" ? (
//                       <span className="text-red-600 font-semibold text-xs">Cancelled</span>
//                     ) : (
//                       <button
//                         onClick={() => handleCancelBooking(b._id)}
//                         className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs"
//                       >
//                         Cancel
//                       </button>
//                     )}
//                     <button
//                       onClick={() => handleDeleteBooking(b._id)}
//                       className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr className="border-t">
//                 <td className="py-3 px-4 text-gray-500" colSpan={9}>
//                   No bookings found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Dashboard = () => {
//   const [metrics, setMetrics] = useState({
//     totalBookings: 0,
//     totalRevenue: 0,
//     pendingBookings: 0,
//     totalSeatsBooked: 0,
//     totalShowsBooked: 0,
//     bookings: []
//   });

//   useEffect(() => {
//     fetchMetrics();
//   }, []);

//   const fetchMetrics = async () => {
//     try {
//       const res = await axios.get('http://localhost:3000/admin/metrics');
//       const data = res.data;

//       // Calculate total seats booked
//       const totalSeats = data.bookings.reduce(
//         (sum, booking) => sum + (booking.selectedSeats?.length || 0),
//         0
//       );

//       // Count unique show date-times
//       const uniqueShows = new Set(
//         data.bookings.map(b => `${b.showDate} ${b.showtime}`)
//       ).size;

//       setMetrics({
//         ...data,
//         totalSeatsBooked: totalSeats,
//         totalShowsBooked: uniqueShows
//       });
//     } catch (err) {
//       console.error("❌ Error fetching metrics:", err);
//     }
//   };

//   const handleCancelBooking = async (bookingId) => {
//     const confirm = window.confirm("Are you sure you want to cancel this booking?");
//     if (!confirm) return;

//     try {
//       await axios.put(`http://localhost:3000/bookings/${bookingId}`, { status: "Cancelled by Admin" });
//       alert("✅ Booking cancelled successfully!");
//       fetchMetrics();
//     } catch (error) {
//       console.error("❌ Error cancelling booking:", error);
//       alert("Failed to cancel booking.");
//     }
//   };

//   const handleDeleteBooking = async (bookingId) => {
//     const confirm = window.confirm("Are you sure you want to delete this booking permanently?");
//     if (!confirm) return;

//     try {
//       await axios.delete(`http://localhost:3000/bookings/${bookingId}`);
//       alert("🗑️ Booking deleted successfully!");
//       fetchMetrics();
//     } catch (error) {
//       console.error("❌ Error deleting booking:", error);
//       alert("Failed to delete booking.");
//     }
//   };

//   return (
//     <div className="space-y-6 px-4 py-6">
//       {/* Top metrics */}
//       <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
//         <div className="bg-blue-500 text-white rounded p-6 shadow">
//           <h3 className="text-lg font-medium">Total Bookings</h3>
//           <p className="text-2xl font-bold mt-2">{metrics.totalBookings}</p>
//         </div>
//         <div className="bg-green-500 text-white rounded p-6 shadow">
//           <h3 className="text-lg font-medium">Total Revenue</h3>
//           <p className="text-2xl font-bold mt-2">₹{metrics.totalRevenue}</p>
//         </div>
//         <div className="bg-yellow-500 text-white rounded p-6 shadow">
//           <h3 className="text-lg font-medium">Pending Bookings</h3>
//           <p className="text-2xl font-bold mt-2">{metrics.pendingBookings}</p>
//         </div>
//         <div className="bg-purple-500 text-white rounded p-6 shadow">
//           <h3 className="text-lg font-medium">Total Seats Booked</h3>
//           <p className="text-2xl font-bold mt-2">{metrics.totalSeatsBooked}</p>
//         </div>
//         <div className="bg-indigo-500 text-white rounded p-6 shadow">
//           <h3 className="text-lg font-medium">Total Shows Booked</h3>
//           <p className="text-2xl font-bold mt-2">{metrics.totalShowsBooked}</p>
//         </div>
//       </div>

//       {/* All Bookings Table */}
//       <div className="bg-white rounded shadow p-4 mt-6 overflow-x-auto">
//         <h2 className="text-lg font-semibold mb-3">All Bookings</h2>
//         <table className="w-full text-left">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="py-2 px-4 font-medium">User</th>
//               <th className="py-2 px-4 font-medium">Email</th>
//               <th className="py-2 px-4 font-medium">Movie</th>
//               <th className="py-2 px-4 font-medium">Location</th>
//               <th className="py-2 px-4 font-medium">Seats</th>
//               <th className="py-2 px-4 font-medium">Show Date & Time</th>
//               <th className="py-2 px-4 font-medium">Amount</th>
//               <th className="py-2 px-4 font-medium">Status</th>
//               <th className="py-2 px-4 font-medium">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {metrics.bookings && metrics.bookings.length > 0 ? (
//               metrics.bookings.map((b, idx) => (
//                 <tr key={idx} className="border-t">
//                   <td className="py-2 px-4">{b.name || 'N/A'}</td>
//                   <td className="py-2 px-4">{b.email || 'N/A'}</td>
//                   <td className="py-2 px-4">{b.room?.name || 'N/A'}</td>
//                   <td className="py-2 px-4">{b.room?.location || 'N/A'}</td>
//                   <td className="py-2 px-4">
//                     {b.selectedSeats?.length
//                       ? b.selectedSeats.map(s => `${s.row}${s.number}`).join(', ')
//                       : 'N/A'}
//                   </td>
//                   <td className="py-2 px-4">
//                     {b.showDate || 'N/A'} {b.showtime || ''}
//                   </td>
//                   <td className="py-2 px-4">₹{b.totalPrice || 0}</td>
//                   <td className="py-2 px-4">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-medium ${
//                         b.status === 'Completed'
//                           ? 'bg-green-100 text-green-700'
//                           : b.status === 'Cancelled by Admin'
//                           ? 'bg-red-100 text-red-700'
//                           : 'bg-yellow-100 text-yellow-700'
//                       }`}
//                     >
//                       {b.status}
//                     </span>
//                   </td>
//                   <td className="py-2 px-4 space-x-2">
//                     {b.status === "Cancelled by Admin" ? (
//                       <span className="text-red-600 font-semibold text-xs">Cancelled</span>
//                     ) : (
//                       <button
//                         onClick={() => handleCancelBooking(b._id)}
//                         className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs"
//                       >
//                         Cancel
//                       </button>
//                     )}
//                     <button
//                       onClick={() => handleDeleteBooking(b._id)}
//                       className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr className="border-t">
//                 <td className="py-3 px-4 text-gray-500" colSpan={9}>
//                   No bookings found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Dashboard = () => {
//   const [metrics, setMetrics] = useState({
//     totalBookings: 0,
//     totalRevenue: 0,
//     pendingBookings: 0,
//     totalSeatsBooked: 0,
//     totalShowsBooked: 0,
//     bookings: [],
//   });

//   useEffect(() => {
//     fetchMetrics();
//   }, []);

//   const fetchMetrics = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/admin/metrics");
//       const data = res.data;

//       // ✅ Calculate total seats booked
//       const totalSeats = data.bookings.reduce((sum, booking) => {
//         const seatCount =
//           booking.seats && booking.seats !== "N/A"
//             ? booking.seats.split(",").length
//             : 0;
//         return sum + seatCount;
//       }, 0);

//       // ✅ Count unique shows
//       const uniqueShows = new Set(
//         data.bookings.map((b) => `${b.showDate} ${b.showtime}`)
//       ).size;

//       setMetrics({
//         ...data,
//         totalSeatsBooked: totalSeats,
//         totalShowsBooked: uniqueShows,
//       });
//     } catch (err) {
//       console.error("❌ Error fetching metrics:", err);
//     }
//   };

//   const handleCancelBooking = async (bookingId) => {
//     const confirmCancel = window.confirm(
//       "Are you sure you want to cancel this booking?"
//     );
//     if (!confirmCancel) return;

//     try {
//       await axios.put(`http://localhost:3000/bookings/${bookingId}`, {
//         status: "Cancelled by Admin",
//       });
//       alert("✅ Booking cancelled successfully!");
//       fetchMetrics();
//     } catch (error) {
//       console.error("❌ Error cancelling booking:", error);
//       alert("Failed to cancel booking.");
//     }
//   };

//   const handleDeleteBooking = async (bookingId) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this booking permanently?"
//     );
//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`http://localhost:3000/bookings/${bookingId}`);
//       alert("🗑️ Booking deleted successfully!");
//       fetchMetrics();
//     } catch (error) {
//       console.error("❌ Error deleting booking:", error);
//       alert("Failed to delete booking.");
//     }
//   };

//   return (
//     <div className="space-y-6 px-4 py-6">
//       {/* 📊 Top Metrics */}
//       <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
//         <div className="bg-blue-500 text-white rounded p-6 shadow">
//           <h3 className="text-lg font-medium">Total Bookings</h3>
//           <p className="text-2xl font-bold mt-2">{metrics.totalBookings}</p>
//         </div>
//         <div className="bg-green-500 text-white rounded p-6 shadow">
//           <h3 className="text-lg font-medium">Total Revenue</h3>
//           <p className="text-2xl font-bold mt-2">₹{metrics.totalRevenue}</p>
//         </div>
//         <div className="bg-yellow-500 text-white rounded p-6 shadow">
//           <h3 className="text-lg font-medium">Pending Bookings</h3>
//           <p className="text-2xl font-bold mt-2">{metrics.pendingBookings}</p>
//         </div>
//         <div className="bg-purple-500 text-white rounded p-6 shadow">
//           <h3 className="text-lg font-medium">Total Seats Booked</h3>
//           <p className="text-2xl font-bold mt-2">{metrics.totalSeatsBooked}</p>
//         </div>
//         <div className="bg-indigo-500 text-white rounded p-6 shadow">
//           <h3 className="text-lg font-medium">Total Shows Booked</h3>
//           <p className="text-2xl font-bold mt-2">{metrics.totalShowsBooked}</p>
//         </div>
//       </div>

//       {/* 🎬 All Bookings Table */}
//       <div className="bg-white rounded shadow p-4 mt-6 overflow-x-auto">
//         <h2 className="text-lg font-semibold mb-3">All Bookings</h2>
//         <table className="w-full text-left">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="py-2 px-4 font-medium">User</th>
//               <th className="py-2 px-4 font-medium">Email</th>
//               <th className="py-2 px-4 font-medium">Movie</th>
             
//               <th className="py-2 px-4 font-medium">Seats</th>
//               <th className="py-2 px-4 font-medium">Show Date</th>
//               <th className="py-2 px-4 font-medium">Show Time</th>
//               <th className="py-2 px-4 font-medium">Amount</th>
//               <th className="py-2 px-4 font-medium">Status</th>
//               <th className="py-2 px-4 font-medium">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {metrics.bookings && metrics.bookings.length > 0 ? (
//               metrics.bookings.map((b, idx) => (
//                 <tr key={idx} className="border-t hover:bg-gray-50">
//                   <td className="py-2 px-4">{b.userName || "N/A"}</td>
//                   <td className="py-2 px-4">{b.email || "N/A"}</td>
//                   <td className="py-2 px-4">{b.movieName || "N/A"}</td>
                  
//                   <td className="py-2 px-4">{b.seats || "N/A"}</td>
//                   <td className="py-2 px-4">{b.showDate || "N/A"}</td>

//                   <td className="py-2 px-4">
//   {b.showtime
//     ? new Date(`1970-01-01T${b.showtime}`).toLocaleTimeString("en-US", {
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//       })
//     : "N/A"}
// </td>


                  
//                   <td className="py-2 px-4">₹{b.amount || 0}</td>
//                   <td className="py-2 px-4">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-medium ${
//                         b.status === "Completed"
//                           ? "bg-green-100 text-green-700"
//                           : b.status === "Cancelled by Admin"
//                           ? "bg-red-100 text-red-700"
//                           : "bg-yellow-100 text-yellow-700"
//                       }`}
//                     >
//                       {b.status}
//                     </span>
//                   </td>
//                   <td className="py-2 px-4 space-x-2">
//                     {b.status === "Cancelled by Admin" ? (
//                       <span className="text-red-600 font-semibold text-xs">
//                         Cancelled
//                       </span>
//                     ) : (
//                       <button
//                         onClick={() => handleCancelBooking(b._id)}
//                         className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs"
//                       >
//                         Cancel
//                       </button>
//                     )}
//                     <button
//                       onClick={() => handleDeleteBooking(b._id)}
//                       className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr className="border-t">
//                 <td className="py-3 px-4 text-gray-500" colSpan={10}>
//                   No bookings found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from '../../config/api';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    pendingBookings: 0,
    totalSeatsBooked: 0,
    totalShowsBooked: 0,
    bookings: [],
  });

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/metrics`);
      const data = res.data;

      // Calculate total seats booked
      const totalSeats = data.bookings.reduce((sum, booking) => {
        const seatCount =
          booking.seats && booking.seats !== "N/A"
            ? booking.seats.split(",").length
            : 0;
        return sum + seatCount;
      }, 0);

      // Count unique shows
      const uniqueShows = new Set(
        data.bookings.map((b) => `${b.showDate} ${b.showtime}`)
      ).size;

      setMetrics({
        ...data,
        totalSeatsBooked: totalSeats,
        totalShowsBooked: uniqueShows,
      });
    } catch (err) {
      console.error("❌ Error fetching metrics:", err);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!confirmCancel) return;

    try {
      await axios.put(`${API_BASE_URL}/bookings/${bookingId}`, {
        status: "Cancelled by Admin",
      });
      alert("✅ Booking cancelled successfully!");
      fetchMetrics();
    } catch (error) {
      console.error("❌ Error cancelling booking:", error);
      alert("Failed to cancel booking.");
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking permanently?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/bookings/${bookingId}`);
      alert("🗑️ Booking deleted successfully!");
      fetchMetrics();
    } catch (error) {
      console.error("❌ Error deleting booking:", error);
      alert("Failed to delete booking.");
    }
  };

  return (
    <div className="space-y-8 px-6 py-6">
      {/* 📊 Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-5">
        <div className="bg-blue-500 text-white rounded-lg p-5 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">📦</span>
            <div>
              <h3 className="text-lg font-medium">Total Bookings</h3>
              <p className="text-2xl font-bold mt-1">{metrics.totalBookings}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-500 text-white rounded-lg p-5 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">💰</span>
            <div>
              <h3 className="text-lg font-medium">Total Revenue</h3>
              <p className="text-2xl font-bold mt-1">₹{metrics.totalRevenue}</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-500 text-white rounded-lg p-5 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">⏳</span>
            <div>
              <h3 className="text-lg font-medium">Pending Bookings</h3>
              <p className="text-2xl font-bold mt-1">{metrics.pendingBookings}</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-500 text-white rounded-lg p-5 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">💺</span>
            <div>
              <h3 className="text-lg font-medium">Total Seats</h3>
              <p className="text-2xl font-bold mt-1">{metrics.totalSeatsBooked}</p>
            </div>
          </div>
        </div>

        <div className="bg-indigo-500 text-white rounded-lg p-5 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🎬</span>
            <div>
              <h3 className="text-lg font-medium">Total Shows</h3>
              <p className="text-2xl font-bold mt-1">{metrics.totalShowsBooked}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 🎬 All Bookings Table */}
      <div className="bg-white rounded-xl shadow-lg p-6 mt-6 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">All Bookings</h2>
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 rounded-t-lg">
            <tr>
              <th className="py-3 px-5 font-medium">User</th>
              <th className="py-3 px-5 font-medium">Email</th>
              <th className="py-3 px-5 font-medium">Movie</th>
              <th className="py-3 px-5 font-medium">Seats</th>
              <th className="py-3 px-5 font-medium">Show Date</th>
              <th className="py-3 px-5 font-medium">Show Time</th>
              <th className="py-3 px-5 font-medium">Amount</th>
              <th className="py-3 px-5 font-medium">Status</th>
              <th className="py-3 px-5 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="animate-fadeIn">
            {metrics.bookings && metrics.bookings.length > 0 ? (
              metrics.bookings.map((b, idx) => (
                <tr
                  key={idx}
                  className="border-t hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="py-3 px-5">{b.userName || "N/A"}</td>
                  <td className="py-3 px-5">{b.email || "N/A"}</td>
                  <td className="py-3 px-5">{b.movieName || "N/A"}</td>
                  <td className="py-3 px-5">{b.seats || "N/A"}</td>
                  <td className="py-3 px-5">{b.showDate || "N/A"}</td>
                  <td className="py-3 px-5">
                    {b.showtime
                      ? new Date(`1970-01-01T${b.showtime}`).toLocaleTimeString(
                          "en-US",
                          { hour: "2-digit", minute: "2-digit", hour12: true }
                        )
                      : "N/A"}
                  </td>
                  <td className="py-3 px-5">₹{b.amount || 0}</td>
                  <td className="py-3 px-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                        b.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : b.status === "Cancelled by Admin"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3 px-5 flex gap-2">
                    {b.status !== "Cancelled by Admin" && (
                      <button
                        onClick={() => handleCancelBooking(b._id)}
                        className="bg-yellow-500 hover:bg-yellow-600 transform hover:scale-105 transition-all text-white px-3 py-1 rounded text-xs"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteBooking(b._id)}
                      className="bg-red-600 hover:bg-red-700 transform hover:scale-105 transition-all text-white px-3 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="border-t">
                <td className="py-3 px-5 text-gray-500" colSpan={9}>
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
