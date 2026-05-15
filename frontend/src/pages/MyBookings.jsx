// // import React, { useEffect, useState } from "react";
// // import Title from "../components/Title";
// // import { assets } from "../assets/assets";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// // const MyBookings = () => {
// //   const [bookings, setBookings] = useState([]);
// //   const navigate = useNavigate();

// //   const fetchBookings = async () => {
// //     try {
// //       const storedUser = JSON.parse(localStorage.getItem("user"));
// //       const userId = storedUser?._id;

// //       if (!userId) {
// //         navigate("/login");
// //         return;
// //       }

// //       const res = await axios.get(`http://localhost:3000/bookings/user/${userId}`);
// //       setBookings(res.data);
// //       console.log("Bookings fetched:", res.data);
// //     } catch (err) {
// //       console.error("Failed to fetch bookings", err);
// //     }
// //   };

// //   useEffect(() => {
// //     const storedUser = JSON.parse(localStorage.getItem("user"));
// //     if (!storedUser || !storedUser._id) {
// //       navigate("/login");
// //     } else {
// //       fetchBookings();
// //     }
// //   }, []);

// //   const handleRemove = async (bookingId) => {
// //     const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
// //     if (!confirmCancel) return;

// //     try {
// //       await axios.put(`http://localhost:3000/bookings/${bookingId}`, {
// //         status: "Cancelled by User",
// //       });

// //       setBookings((prev) =>
// //         prev.map((b) =>
// //           b._id === bookingId ? { ...b, status: "Cancelled by User" } : b
// //         )
// //       );

// //       alert("Booking cancelled successfully.");
// //     } catch (err) {
// //       console.error("Failed to cancel booking", err);
// //       alert("❌ Failed to cancel booking.");
// //     }
// //   };

// //   const handlePayNow = (booking) => {
// //     window.scrollTo(0, 0);
// //     navigate("/payment", {
// //       state: { booking },
// //     });
// //   };

// //   return (
// //     <div className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
// //       <Title
// //         title="My Bookings"
// //         subTitle="Easily manage your past, current and upcoming movie reservations in one place."
// //         align="left"
// //       />

// //       <div className="max-w-6xl mt-8 w-full text-gray-800">
// //         <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3">
// //           <div>Theaters</div>
// //           <div>Date & Time</div>
// //           <div>Actions</div>
// //         </div>

// //         {bookings.map((booking) => (
// //           <div
// //             key={booking._id}
// //             className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t"
// //           >
// //             <div className="flex flex-col md:flex-row">
// //               <img
// //                 src={booking.room?.images?.[0] || assets.defaultRoomImage}
// //                 onError={(e) => (e.target.src = assets.defaultRoomImage)}
// //                 alt="theater-img"
// //                 className="min-md:w-44 rounded shadow object-cover h-28 w-44"
// //               />
// //               <div className="flex flex-col gap-1.5 max-md:mt-3 min-md:ml-4">
// //                 <p className="font-playfair text-2xl">
// //                   {booking.hotel?.name}
// //                   <span className="font-inter text-sm">
// //                     {" "}
// //                     ({booking.room?.roomType})
// //                   </span>
// //                 </p>
// //                 <div className="flex items-center gap-1 text-sm text-gray-500">
// //                   <img src={assets.locationIcon} alt="Location icon" />
// //                   <span>{booking.hotel?.address}</span>
// //                 </div>
// //                 <div className="flex items-center gap-1 text-sm text-gray-500">
// //                   <img src={assets.guestsIcon} alt="Guests icon" />
// //                   <span>Guests: {booking.guests}</span>
// //                 </div>
// //                 <p className="text-base font-medium">
// //                   Total: ₹{booking.totalPrice?.toLocaleString("en-IN")}
// //                 </p>
// //               </div>
// //             </div>

// //             <div className="flex flex-row md:items-center md:gap-12 mt-3 gap-8">
// //               <div>
// //                 <p>Check-In Date:</p>
// //                 <p className="text-gray-500 text-sm">
// //                   {new Date(booking.checkInDate).toLocaleDateString("en-IN")}
// //                 </p>
// //               </div>
// //               <div>
// //                 <p>Check-Out Time:</p>
// //                 <p className="text-gray-500 text-sm">
// //                   {new Date(booking.checkOutDate).toLocaleTimeString("en-IN", {
// //                     hour: "2-digit",
// //                     minute: "2-digit",
// //                   })}
// //                 </p>
// //               </div>
// //             </div>

// //             <div className="flex flex-col items-start justify-center pt-3 gap-2">
// //               {booking.status === "Cancelled by Admin" ? (
// //                 <p className="text-red-600 font-semibold">
// //                   Booking cancelled by admin.
// //                 </p>
// //               ) : booking.status === "Cancelled by User" ? (
// //                 <p className="text-red-600 font-semibold">
// //                   Booking cancelled by you.
// //                 </p>
// //               ) : (
// //                 <>
// //                   <div className="flex items-center gap-2">
// //                     <div
// //                       className={`h-3 w-3 rounded-full ${
// //                         booking.isPaid ? "bg-green-500" : "bg-red-500"
// //                       }`}
// //                     ></div>
// //                     <p
// //                       className={`text-sm ${
// //                         booking.isPaid ? "text-green-500" : "text-red-500"
// //                       }`}
// //                     >
// //                       {booking.isPaid ? "Paid" : "Unpaid"}
// //                     </p>
// //                   </div>

// //                   {!booking.isPaid && (
// //                     <button
// //                       className="px-4 py-1.5 text-xs border border-gray-400 rounded-full hover:bg-gray-50 transition-all"
// //                       onClick={() => handlePayNow(booking)}
// //                     >
// //                       Pay Now
// //                     </button>
// //                   )}

// //                   <button
// //                     className="px-4 py-1.5 text-xs text-red-600 border border-red-400 rounded-full hover:bg-red-50 transition-all"
// //                     onClick={() => handleRemove(booking._id)}
// //                   >
// //                     Cancel Booking
// //                   </button>
// //                 </>
// //               )}
// //             </div>
// //           </div>
// //         ))}

// //         {bookings.length === 0 && (
// //           <p className="text-center text-gray-500 mt-8">No bookings yet.</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default MyBookings;

// import React, { useEffect, useState } from "react";
// import Title from "../components/Title";
// import { assets } from "../assets/assets";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const MyBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const navigate = useNavigate();

//   const fetchBookings = async () => {
//     try {
//       const storedUser = JSON.parse(localStorage.getItem("user"));
//       const userId = storedUser?._id;

//       if (!userId) {
//         navigate("/login");
//         return;
//       }

//       const res = await axios.get(`http://localhost:3000/bookings/user/${userId}`);
//       setBookings(res.data);
//     } catch (err) {
//       console.error("Failed to fetch bookings", err);
//     }
//   };

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (!storedUser || !storedUser._id) {
//       navigate("/login");
//     } else {
//       fetchBookings();
//     }
//   }, []);

//   const handleRemove = async (bookingId) => {
//     const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
//     if (!confirmCancel) return;

//     try {
//       await axios.put(`http://localhost:3000/bookings/${bookingId}`, {
//         status: "Cancelled by User",
//       });

//       setBookings((prev) =>
//         prev.map((b) =>
//           b._id === bookingId ? { ...b, status: "Cancelled by User" } : b
//         )
//       );

//       alert("Booking cancelled successfully.");
//     } catch (err) {
//       console.error("Failed to cancel booking", err);
//       alert("❌ Failed to cancel booking.");
//     }
//   };

//   const handlePayNow = (booking) => {
//     navigate("/payment", { state: { booking } });
//   };

//   const handleViewTicket = (booking) => {
//     navigate("/confirmation", { state: { booking } });
//   };

//   return (
//     <div className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
//       <Title
//         title="My Bookings"
//         subTitle="Easily manage your past, current and upcoming movie reservations in one place."
//         align="left"
//       />

//       <div className="max-w-6xl mt-8 w-full text-gray-800">
//         <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3">
//           <div>Theaters</div>
//           <div>Date & Time</div>
//           <div>Actions</div>
//         </div>

//         {bookings.map((booking) => (
//           <div
//             key={booking._id}
//             className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t"
//           >
//             <div className="flex flex-col md:flex-row">
//               <img
//                 src={booking.room?.images?.[0] || assets.defaultRoomImage}
//                 onError={(e) => (e.target.src = assets.defaultRoomImage)}
//                 alt="theater-img"
//                 className="min-md:w-44 rounded shadow object-cover h-28 w-44"
//               />
//               <div className="flex flex-col gap-1.5 max-md:mt-3 min-md:ml-4">
//                 <p className="font-playfair text-2xl">
//                   {booking.room?.name}
//                   <span className="font-inter text-sm">
//                     {" "}({booking.room?.roomType})
//                   </span>
//                 </p>
//                 <div className="flex items-center gap-1 text-sm text-gray-500">
//                   <img src={assets.guestsIcon} alt="Guests icon" />
//                   <span>Guests: {booking.guests}</span>
//                 </div>
//                 <p className="text-base font-medium">
//                   Total: ₹{booking.totalPrice?.toLocaleString("en-IN")}
//                 </p>
//               </div>
//             </div>

//             <div className="flex flex-row md:items-center md:gap-12 mt-3 gap-8">
//               <div>
//                 <p>Show Date:</p>
//                 <p className="text-gray-500 text-sm">
//                   {new Date(booking.checkInDate).toLocaleDateString("en-IN")}
//                 </p>
//               </div>
//               <div>
//                 <p>Show Time:</p>
//                 <p className="text-gray-500 text-sm">
//                   {new Date(booking.checkOutDate).toLocaleTimeString("en-IN", {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </p>
//               </div>
//             </div>

//             <div className="flex flex-col items-start justify-center pt-3 gap-2">
//               {booking.status?.includes("Cancelled") ? (
//                 <p className="text-red-600 font-semibold">
//                   Booking cancelled.
//                 </p>
//               ) : (
//                 <>
//                   <div className="flex items-center gap-2">
//                     <div
//                       className={`h-3 w-3 rounded-full ${
//                         booking.isPaid ? "bg-green-500" : "bg-red-500"
//                       }`}
//                     ></div>
//                     <p
//                       className={`text-sm ${
//                         booking.isPaid ? "text-green-500" : "text-red-500"
//                       }`}
//                     >
//                       {booking.isPaid ? "Paid" : "Unpaid"}
//                     </p>
//                   </div>

//                   {!booking.isPaid && (
//                     <button
//                       className="px-4 py-1.5 text-xs border border-gray-400 rounded-full hover:bg-gray-50 transition-all"
//                       onClick={() => handlePayNow(booking)}
//                     >
//                       Pay Now
//                     </button>
//                   )}

//                   <button
//                     className="px-4 py-1.5 text-xs text-blue-600 border border-blue-400 rounded-full hover:bg-blue-50 transition-all"
//                     onClick={() => handleViewTicket(booking)}
//                   >
//                     View Ticket
//                   </button>

//                   <button
//                     className="px-4 py-1.5 text-xs text-red-600 border border-red-400 rounded-full hover:bg-red-50 transition-all"
//                     onClick={() => handleRemove(booking._id)}
//                   >
//                     Cancel Booking
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         ))}

//         {bookings.length === 0 && (
//           <p className="text-center text-gray-500 mt-8">No bookings yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyBookings;

import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser?._id;

      if (!userId) {
        navigate("/login");
        return;
      }

      const res = await axios.get(`http://localhost:3000/bookings/user/${userId}`);
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || !storedUser._id) {
      navigate("/login");
    } else {
      fetchBookings();
    }
  }, []);

  const handleRemove = async (bookingId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmCancel) return;

    try {
      await axios.put(`http://localhost:3000/bookings/${bookingId}`, {
        status: "Cancelled by User",
      });

      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, status: "Cancelled by User" } : b
        )
      );

      alert("Booking cancelled successfully.");
    } catch (err) {
      console.error("Failed to cancel booking", err);
      alert("❌ Failed to cancel booking.");
    }
  };

  const handlePayNow = (booking) => {
    navigate("/payment", { state: { booking } });
  };

  const handleViewTicket = (booking) => {
    navigate("/confirmation", { state: { booking } });
  };

  // ✅ Helper function to format date & time nicely
  const formatShowDateTime = (date, time) => {
    if (!date && !time) return "N/A";
    try {
      const formattedDate = new Date(date).toLocaleDateString("en-IN", {
        weekday: "long",
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      // convert 24hr to 12hr AM/PM format
      let [hours, minutes] = time.split(":");
      hours = parseInt(hours);
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      const formattedTime = `${hours}:${minutes} ${ampm}`;

      return `${formattedDate} • ${formattedTime}`;
    } catch {
      return "Invalid Date/Time";
    }
  };

  return (
    <div className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
      <Title
        title="My Bookings"
        subTitle="Easily manage your past, current and upcoming movie reservations in one place."
        align="left"
      />

      <div className="max-w-6xl mt-8 w-full text-gray-800">
        <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3">
          <div>Movies</div>
          <div>Date & Time</div>
          <div>Actions</div>
        </div>

        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t"
          >
            <div className="flex flex-col md:flex-row">
              <img
                src={booking.room?.images?.[0] || assets.defaultRoomImage}
                onError={(e) => (e.target.src = assets.defaultRoomImage)}
                alt="movie-poster"
                className="min-md:w-44 rounded shadow object-cover h-28 w-44"
              />
              <div className="flex flex-col gap-1.5 max-md:mt-3 min-md:ml-4">
                <p className="font-playfair text-2xl">
                  {booking.room?.name}
                </p>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <img src={assets.guestsIcon} alt="Guests icon" />
                  <span>Tickets: {booking.guests}</span>
                </div>
                <p className="text-base font-medium">
                  Total: ₹{booking.totalPrice?.toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            <div className="flex flex-col md:items-start justify-center mt-3 gap-1">
              <p className="text-sm text-gray-600">
                {formatShowDateTime(booking.showDate, booking.showtime)}
              </p>
            </div>

            <div className="flex flex-col items-start justify-center pt-3 gap-2">
              {booking.status?.includes("Cancelled") ? (
                <p className="text-red-600 font-semibold">Booking cancelled.</p>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        booking.isPaid ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    <p
                      className={`text-sm ${
                        booking.isPaid ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {booking.isPaid ? "Paid" : "Unpaid"}
                    </p>
                  </div>

                  {!booking.isPaid && (
                    <button
                      className="px-4 py-1.5 text-xs border border-gray-400 rounded-full hover:bg-gray-50 transition-all"
                      onClick={() => handlePayNow(booking)}
                    >
                      Pay Now
                    </button>
                  )}

                  <button
                    className="px-4 py-1.5 text-xs text-blue-600 border border-blue-400 rounded-full hover:bg-blue-50 transition-all"
                    onClick={() => handleViewTicket(booking)}
                  >
                    View Ticket
                  </button>

                  <button
                    className="px-4 py-1.5 text-xs text-red-600 border border-red-400 rounded-full hover:bg-red-50 transition-all"
                    onClick={() => handleRemove(booking._id)}
                  >
                    Cancel Booking
                  </button>
                </>
              )}
            </div>
          </div>
        ))}

        {bookings.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No bookings yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
