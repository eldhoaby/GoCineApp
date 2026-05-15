
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { MdLocationOn } from "react-icons/md";

// const ROWS = ["A","B","C","D","E","F","G","H","I","J"];
// const COLS = 16;

// const RoomDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [room, setRoom] = useState(null);
//   const [error, setError] = useState("");
//   const [showDate, setShowDate] = useState("");
//   const [showtime, setShowtime] = useState("");
//   const [availableDates, setAvailableDates] = useState([]);
//   const [seats, setSeats] = useState([]);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [message, setMessage] = useState("");

//   // Fetch movie/room details
//   useEffect(() => {
//     const fetchRoom = async () => {
//       try {
//         const res = await fetch(`http://localhost:3000/rooms/${id}`);
//         if (!res.ok) throw new Error("Movie not found");
//         const data = await res.json();
//         setRoom(data);
//         setAvailableDates(data.shows?.map(s => s.showDate) || []);
//       } catch (err) {
//         setError(err.message || "Unknown error");
//       }
//     };
//     fetchRoom();
//   }, [id]);

//   // Fetch seats for selected show
//   const fetchSeats = async () => {
//     if (!showDate || !showtime) {
//       setMessage("❌ Select show date and time first.");
//       return;
//     }
//     try {
//       const res = await fetch(`http://localhost:3000/rooms/${id}/shows/${showDate}/${showtime}`);
//       const data = await res.json();
//       setSeats(data);
//       setSelectedSeats([]);
//       setMessage("");
//     } catch (err) {
//       console.error(err);
//       setMessage("❌ Failed to fetch seats.");
//     }
//   };

//   const toggleSeat = (seat) => {
//     if (!seat || seat.isBooked) return;
//     const seatId = `${seat.row}-${seat.number}`;
//     setSelectedSeats(prev =>
//       prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]
//     );
//   };
  
//   const handleBooking = () => {
//   const userJson = localStorage.getItem("user");
//   if (!userJson) {
//     alert("Please log in to book.");
//     return navigate("/login");
//   }

//   if (!showDate || !showtime || selectedSeats.length === 0) {
//     setMessage("❌ Select show date, time, and seats first.");
//     return;
//   }

//   const user = JSON.parse(userJson);

//   // Prepare booking data
//   const bookingData = {
//     userId: user._id,
//     room: {
//       _id: room._id,
//       name: room.name,
//       price: room.price,
//       images: room.images,
//     },
//     guests: selectedSeats.length,
//     totalPrice: selectedSeats.length * room.price,
//     showDate,
//     showtime,
//     selectedSeats: selectedSeats.map(s => {
//       const [row, number] = s.split("-");
//       return { row, number: parseInt(number) };
//     }),
//     isPaid: false,
//     status: "Pending",
//     name: user.name,
//     email: user.email,
//   };

//   // Redirect to Payment.jsx and pass booking data
//   navigate("/payment", { state: { booking: bookingData } });
// };


  
//   if (error) return <p className='pt-32 text-red-600'>{error}</p>;
//   if (!room) return <p className='pt-32'>Loading movie details...</p>;

//   return (
//     <div className='pt-24 pb-16 px-4 md:px-16 lg:px-24 xl:px-32 space-y-6'>
//       {/* Movie Info */}
//       <div className="flex flex-col md:flex-row gap-6">
//         <img src={room.images[0]} alt={room.name} className="w-full md:w-1/3 rounded-xl shadow-lg object-cover" />
//         <div className="flex-1 space-y-3">
//           <h1 className='text-3xl md:text-4xl font-bold'>{room.name}</h1>
//           <p className='text-sm text-gray-500 flex items-center gap-1'>
//             <MdLocationOn />{room.address || "Theatre info"}
//           </p>
//           <p className='text-gray-700'>{room.description}</p>
//           <p className='text-gray-600'>{room.duration} • {room.genres?.join(", ")} • {room.year}</p>
//           <p className='text-yellow-500 font-semibold'>⭐ {room.rating} User Rating</p>
//           {room.trailerUrl && (
//             <a href={room.trailerUrl} target="_blank" className="text-blue-600 underline">Watch Trailer</a>
//           )}
//         </div>
//       </div>

//       {/* Show Date & Time */}
//       <div className="flex gap-4 flex-wrap items-end">
//         <div>
//           <label className="font-medium">Show Date</label>
//           <select
//             className='block rounded border border-gray-300 px-3 py-2 mt-1'
//             value={showDate}
//             onChange={(e) => setShowDate(e.target.value)}
//           >
//             <option value="">Select Date</option>
//             {availableDates.map(date => (
//               <option key={date} value={date}>{date}</option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="font-medium">Show Time</label>
//           <select
//             className='block rounded border border-gray-300 px-3 py-2 mt-1'
//             value={showtime}
//             onChange={(e) => setShowtime(e.target.value)}
//           >
//             <option value="">Select Time</option>
//             {room.shows
//               .filter(s => s.showDate === showDate)
//               .map((s, idx) => <option key={idx} value={s.showTime}>{s.showTime}</option>)}
//           </select>
//         </div>
//         <button
//           onClick={fetchSeats}
//           className='bg-blue-700 text-white px-6 py-2 rounded mt-1 hover:bg-blue-800 transition'
//         >
//           Show Seats
//         </button>
//       </div>

//       {/* Seat Selection */}
//       {seats.length > 0 && (
//         <div>
//           <div className='w-full flex justify-center mb-4'>
//             <div className='bg-gray-400 h-6 w-3/4 text-center rounded-t-lg'>SCREEN</div>
//           </div>
//           <div className='flex flex-col items-center gap-2'>
//             {ROWS.map(row => (
//               <div key={row} className='flex gap-2'>
//                 {Array.from({ length: COLS }).map((_, i) => {
//                   const seat = seats.find(s => s.row === row && s.number === i+1);
//                   const seatId = `${row}-${i+1}`;
//                   const isBooked = seat?.isBooked;
//                   const isSelected = selectedSeats.includes(seatId);
//                   return (
//                     <div
//                       key={i}
//                       onClick={() => toggleSeat(seat)}
//                       className={`w-6 h-6 rounded-sm text-xs flex items-center justify-center cursor-pointer transition ${
//                         isBooked ? "bg-gray-500 cursor-not-allowed" :
//                         isSelected ? "bg-green-600" :
//                         "bg-gray-200 hover:bg-blue-400"
//                       }`}
//                     >
//                       {i+1}
//                     </div>
//                   );
//                 })}
//               </div>
//             ))}
//           </div>
//           <p className='mt-4 text-sm text-gray-600'>Click seats to select. Green = selected, Gray = booked.</p>
//           <button
//             onClick={handleBooking}
//             className='bg-orange-600 text-white px-6 py-2 rounded mt-4 hover:bg-orange-700 transition'
//           >
//             Buy Tickets
//           </button>
//         </div>
//       )}

//       {message && <p className='mt-4 text-red-600'>{message}</p>}
//     </div>
//   );
// };

// export default RoomDetails;



// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { MdLocationOn } from "react-icons/md";
// import { FaCalendarAlt, FaClock, FaChair } from "react-icons/fa";
// import { assets } from "../assets/assets";

// const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
// const COLS = 16;

// const RoomDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [room, setRoom] = useState(null);
//   const [error, setError] = useState("");
//   const [showDate, setShowDate] = useState("");
//   const [showtime, setShowtime] = useState("");
//   const [seats, setSeats] = useState([]);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchRoom = async () => {
//       try {
//         const res = await fetch(`http://localhost:3000/rooms/${id}`);
//         if (!res.ok) throw new Error("Movie not found");
//         const data = await res.json();
//         setRoom(data);
//       } catch (err) {
//         setError(err.message || "Unknown error");
//       }
//     };
//     fetchRoom();
//   }, [id]);

//   const fetchSeats = async () => {
//     if (!showDate || !showtime) {
//       setMessage("❌ Please select show date and time first.");
//       return;
//     }
//     try {
//       const res = await fetch(
//         `http://localhost:3000/rooms/${id}/shows/${showDate}/${showtime}`
//       );
//       const data = await res.json();
//       if (!Array.isArray(data)) {
//         setMessage("❌ No seats found for this show.");
//         return;
//       }
//       setSeats(data);
//       setSelectedSeats([]);
//       setMessage("");
//     } catch (err) {
//       console.error(err);
//       setMessage("❌ Failed to fetch seats.");
//     }
//   };

//   const toggleSeat = (seat) => {
//     // Guard: ensure seat is defined
//     if (!seat) {
//       console.warn("Seat not found in current show grid");
//       return;
//     }
//     if (seat.isBooked) return;

//     const seatId = `${seat.row}-${seat.number}`;
//     setSelectedSeats((prev) =>
//       prev.includes(seatId)
//         ? prev.filter((s) => s !== seatId)
//         : [...prev, seatId]
//     );
//   };

//   const handleBooking = async () => {
//     const userJson = localStorage.getItem("user");
//     if (!userJson) {
//       alert("Please log in to book.");
//       return navigate("/login");
//     }

//     if (!showDate || !showtime || selectedSeats.length === 0) {
//       setMessage("❌ Select show date, time, and seats first.");
//       return;
//     }

//     const user = JSON.parse(userJson);

//     const bookingData = {
//       userId: user._id,
//       room: {
//         _id: room._id,
//         name: room.name,
//         price: room.price,
//         images: room.images || [],
//       },
//       guests: selectedSeats.length,
//       totalPrice: selectedSeats.length * room.price,
//       showDate,
//       showtime,
//       selectedSeats: selectedSeats.map((s) => {
//         const [row, number] = s.split("-");
//         return { row, number: parseInt(number) };
//       }),
//       isPaid: false,
//       name: user.name || "",
//       email: user.email || "",
//     };

//     try {
//       const res = await fetch("http://localhost:3000/bookings", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(bookingData),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || "Booking failed");
//       }

//       const createdBooking = await res.json();
//       navigate("/payment", { state: { booking: createdBooking } });
//     } catch (err) {
//       console.error("Booking error:", err);
//       setMessage("❌ Failed to proceed to payment.");
//     }
//   };

//   if (error) return <p className="pt-32 text-red-600">{error}</p>;
//   if (!room) return <p className="pt-32 text-center">Loading movie details...</p>;

//   const availableDates = room.shows.map((s) => s.showDate);

//   return (
//     <div className="pt-32 pb-16 px-4 md:px-16 lg:px-24 xl:px-32 bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white min-h-screen">
//       {/* Movie Section */}
//       <div className="flex flex-col md:flex-row gap-10 items-start">
//         <img
//           src={room.images?.[0] || assets.defaultRoomImage}
//           alt={room.name}
//           className="w-full md:w-1/3 rounded-2xl shadow-lg object-cover"
//         />

//         <div className="flex-1 space-y-4">
//           <h1 className="text-4xl font-bold">{room.name}</h1>
//           <p className="flex items-center text-gray-400">
//             <MdLocationOn className="text-red-400 mr-2" />
//             {room.city || "Location unavailable"}
//           </p>
//           <p className="text-gray-300 leading-relaxed">{room.description}</p>

//           <div className="flex flex-wrap gap-3 text-gray-400 text-sm">
//             <span>{room.duration}</span>•
//             <span>{room.genres?.join(", ")}</span>•
//             <span>{room.year}</span>
//           </div>

//           <p className="text-yellow-400 font-semibold text-lg">
//             ⭐ {room.rating} User Rating
//           </p>

//           {/* Show Selection */}
//           <div className="bg-gray-900/60 p-6 rounded-2xl mt-6 shadow-inner backdrop-blur">
//             <h2 className="text-xl font-semibold mb-4">
//               🎟 Select Show Details
//             </h2>
//             <div className="flex flex-wrap gap-4">
//               <div>
//                 <label className="text-sm text-gray-400 flex items-center gap-2">
//                   <FaCalendarAlt /> Show Date
//                 </label>
//                 <input
//                   type="date"
//                   min={availableDates[0]}
//                   max={availableDates[availableDates.length - 1]}
//                   value={showDate}
//                   onChange={(e) => setShowDate(e.target.value)}
//                   className="block rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 mt-1 text-white focus:ring-2 focus:ring-pink-500"
//                 />
//               </div>
//               <div>
//                 <label className="text-sm text-gray-400 flex items-center gap-2">
//                   <FaClock /> Show Time
//                 </label>
//                 <select
//                   value={showtime}
//                   onChange={(e) => setShowtime(e.target.value)}
//                   className="block rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 mt-1 text-white focus:ring-2 focus:ring-pink-500"
//                 >
//                   <option value="">Select Time</option>
//                   {room.shows
//                     .filter((s) => s.showDate === showDate)
//                     .map((s) => (
//                       <option key={s.showTime} value={s.showTime}>
//                         {s.showTime}
//                       </option>
//                     ))}
//                 </select>
//               </div>
//               <button
//                 onClick={fetchSeats}
//                 className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg mt-6 transition-colors"
//               >
//                 Show Seats
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Seat Selection */}
//       {seats.length > 0 && (
//         <div className="mt-12 bg-gray-900/60 p-6 rounded-2xl shadow-inner backdrop-blur">
//           <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
//             <FaChair /> Select Your Seats
//           </h2>
//           <div className="w-full flex justify-center mb-6">
//             <div className="bg-pink-600 h-6 w-3/4 text-center rounded-t-lg text-sm font-medium">
//               SCREEN THIS WAY
//             </div>
//           </div>

//           <div className="flex flex-col items-center gap-2">
//             {ROWS.map((row) => (
//               <div key={row} className="flex gap-2">
//                 {Array.from({ length: COLS }).map((_, i) => {
//                   const seat =
//                     seats.find(
//                       (s) => s.row === row && s.number === i + 1
//                     ) || null;
//                   const seatId = `${row}-${i + 1}`;
//                   const isBooked = seat?.isBooked;
//                   const isSelected = selectedSeats.includes(seatId);
//                   return (
//                     <div
//                       key={i}
//                       onClick={() => toggleSeat(seat)}
//                       className={`w-6 h-6 rounded-sm text-xs flex items-center justify-center cursor-pointer transition-all ${
//                         isBooked
//                           ? "bg-gray-600 cursor-not-allowed"
//                           : isSelected
//                           ? "bg-green-500"
//                           : "bg-gray-300 hover:bg-pink-400"
//                       }`}
//                     >
//                       {i + 1}
//                     </div>
//                   );
//                 })}
//               </div>
//             ))}
//           </div>

//           <div className="flex flex-col items-center mt-8">
//             <p className="text-gray-400 text-sm">
//               💡 Green = Selected | Gray = Booked | Light Gray = Available
//             </p>
//             <button
//               onClick={handleBooking}
//               className="mt-6 bg-gradient-to-r from-pink-500 to-red-500 hover:opacity-90 text-white px-10 py-3 rounded-xl font-semibold text-lg shadow-md transition-transform hover:scale-105"
//             >
//               Buy Tickets
//             </button>
//           </div>
//         </div>
//       )}

//       {message && (
//         <p className="mt-6 text-center text-red-500 font-medium">{message}</p>
//       )}
//     </div>
//   );
// };

// export default RoomDetails;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaCalendarAlt, FaClock, FaChair, FaPlay } from "react-icons/fa";
import { assets } from "../assets/assets";
import API_BASE_URL from "../config/api";

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const COLS = 16;

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [error, setError] = useState("");
  const [showDate, setShowDate] = useState("");
  const [showtime, setShowtime] = useState("");
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/rooms/${id}`);
        if (!res.ok) throw new Error("Movie not found");
        const data = await res.json();
        setRoom(data);
      } catch (err) {
        setError(err.message || "Unknown error");
      }
    };
    fetchRoom();
  }, [id]);

  const fetchSeats = async () => {
    if (!showDate || !showtime) {
      setMessage("❌ Please select show date and time first.");
      return;
    }
    try {
      const res = await fetch(
        `${API_BASE_URL}/rooms/${id}/shows/${showDate}/${showtime}`
      );
      const data = await res.json();
      if (!Array.isArray(data)) {
        setMessage("❌ No seats found for this show.");
        return;
      }
      setSeats(data);
      setSelectedSeats([]);
      setMessage("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to fetch seats.");
    }
  };

  const toggleSeat = (seat) => {
    if (!seat) return;
    if (seat.isBooked) return;

    const seatId = `${seat.row}-${seat.number}`;
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  const handleBooking = async () => {
    const userJson = localStorage.getItem("user");
    if (!userJson) {
      alert("Please log in to book.");
      return navigate("/login");
    }

    if (!showDate || !showtime || selectedSeats.length === 0) {
      setMessage("❌ Select show date, time, and seats first.");
      return;
    }

    const user = JSON.parse(userJson);

    const bookingData = {
      userId: user._id,
      room: {
        _id: room._id,
        name: room.name,
        price: room.price,
        images: room.images || [],
      },
      guests: selectedSeats.length,
      totalPrice: selectedSeats.length * room.price,
      showDate,
      showtime,
      selectedSeats: selectedSeats.map((s) => {
        const [row, number] = s.split("-");
        return { row, number: parseInt(number) };
      }),
      isPaid: false,
      name: user.name || "",
      email: user.email || "",
    };

    try {
      const res = await fetch(`${API_BASE_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Booking failed");
      }

      const createdBooking = await res.json();
      navigate("/payment", { state: { booking: createdBooking } });
    } catch (err) {
      console.error("Booking error:", err);
      setMessage("❌ Failed to proceed to payment.");
    }
  };

  const handleWatchTrailer = () => {
    if (room.trailerUrl) window.open(room.trailerUrl, "_blank");
    else alert("Trailer not available.");
  };

  if (error) return <p className="pt-32 text-red-600">{error}</p>;
  if (!room) return <p className="pt-32 text-center">Loading movie details...</p>;

  const availableDates = Array.from(new Set(room.shows.map((s) => s.showDate)));

  return (
    <div className="pt-32 pb-16 px-4 md:px-16 lg:px-24 xl:px-32 bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white min-h-screen">
      {/* Movie Section */}
      <div className="flex flex-col md:flex-row gap-10 items-start">
        <img
          src={room.images?.[0] || assets.defaultRoomImage}
          alt={room.name}
          className="w-full md:w-1/3 rounded-2xl shadow-lg object-cover"
        />

        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold">{room.name}</h1>
          <p className="flex items-center text-gray-400">
            <MdLocationOn className="text-red-400 mr-2" />
            {room.city || "Location unavailable"}
          </p>
          <p className="text-gray-300 leading-relaxed">{room.description}</p>

          <div className="flex flex-wrap gap-3 text-gray-400 text-sm">
            <span>{room.duration}</span>•
            <span>{room.genres?.join(", ")}</span>•
            <span>{room.year}</span>
          </div>

          <p className="text-yellow-400 font-semibold text-lg">
            ⭐ {room.rating} User Rating
          </p>

          {/* Watch Trailer Button */}
          <button
            onClick={handleWatchTrailer}
            className="mt-2 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition-all"
          >
            <FaPlay /> Watch Trailer
          </button>

          {/* Show Selection */}
          <div className="bg-gray-900/60 p-6 rounded-2xl mt-6 shadow-inner backdrop-blur">
            <h2 className="text-xl font-semibold mb-4">
              🎟 Select Show Details
            </h2>

            {/* Show Dates */}
            <div className="mb-6">
              <p className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                <FaCalendarAlt /> Choose a Date
              </p>
              <div className="flex flex-wrap gap-3">
                {availableDates.map((date) => (
                  <button
                    key={date}
                    onClick={() => {
                      setShowDate(date);
                      setShowtime(""); // reset time
                    }}
                    className={`px-4 py-2 rounded-lg border transition-all transform hover:scale-105 ${
                      showDate === date
                        ? "bg-pink-600 text-white border-pink-500"
                        : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
                    }`}
                  >
                    {new Date(date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      weekday: "short",
                    })}
                  </button>
                ))}
              </div>
            </div>

            {/* Show Times */}
            {showDate && (
              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                  <FaClock /> Choose a Time
                </p>
                <div className="flex flex-wrap gap-3">
                  {room.shows
                    .filter((s) => s.showDate === showDate)
                    .map((s) => (
                      <button
                        key={s.showTime}
                        onClick={() => setShowtime(s.showTime)}
                        className={`px-4 py-2 rounded-lg border transition-all transform hover:scale-105 ${
                          showtime === s.showTime
                            ? "bg-pink-600 text-white border-pink-500"
                            : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
                        }`}
                      >
                        {(() => {
                          const [hour, minute] = s.showTime.split(":");
                          const h = parseInt(hour);
                          const suffix = h >= 12 ? "PM" : "AM";
                          const formattedHour = ((h + 11) % 12) + 1;
                          return `${formattedHour}:${minute} ${suffix}`;
                        })()}
                      </button>
                    ))}
                </div>
              </div>
            )}

            <button
              onClick={fetchSeats}
              disabled={!showDate || !showtime}
              className={`px-6 py-2 rounded-lg mt-4 font-medium transition-all ${
                showDate && showtime
                  ? "bg-pink-600 hover:bg-pink-700 text-white"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              Show Seats
            </button>
          </div>
        </div>
      </div>

      {/* Seat Selection */}
      {seats.length > 0 && (
        <div className="mt-12 bg-gray-900/60 p-6 rounded-2xl shadow-inner backdrop-blur">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <FaChair /> Select Your Seats
          </h2>
          <div className="w-full flex justify-center mb-6">
            <div className="bg-pink-600 h-6 w-3/4 text-center rounded-t-lg text-sm font-medium">
              SCREEN THIS WAY
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            {ROWS.map((row) => (
              <div key={row} className="flex gap-2">
                {Array.from({ length: COLS }).map((_, i) => {
                  const seat =
                    seats.find((s) => s.row === row && s.number === i + 1) ||
                    null;
                  const seatId = `${row}-${i + 1}`;
                  const isBooked = seat?.isBooked;
                  const isSelected = selectedSeats.includes(seatId);
                  return (
                    <div
                      key={i}
                      onClick={() => toggleSeat(seat)}
                      className={`w-6 h-6 rounded-sm text-xs flex items-center justify-center cursor-pointer transition-all ${
                        isBooked
                          ? "bg-gray-600 cursor-not-allowed"
                          : isSelected
                          ? "bg-green-500"
                          : "bg-gray-300 hover:bg-pink-400"
                      }`}
                    >
                      {i + 1}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center mt-8">
            <p className="text-gray-400 text-sm">
              💡 Green = Selected | Gray = Booked | Light Gray = Available
            </p>
            <button
              onClick={handleBooking}
              className="mt-6 bg-gradient-to-r from-pink-500 to-red-500 hover:opacity-90 text-white px-10 py-3 rounded-xl font-semibold text-lg shadow-md transition-transform hover:scale-105"
            >
              Buy Tickets
            </button>
          </div>
        </div>
      )}

      {message && (
        <p className="mt-6 text-center text-red-500 font-medium">{message}</p>
      )}
    </div>
  );
};

export default RoomDetails;
