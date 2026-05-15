

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const ListRooms = () => {
//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchRooms();
//   }, []);

//   // ✅ Fetch all movies (endpoint unchanged)
//   const fetchRooms = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/rooms");
//       setRooms(res.data);
//     } catch (err) {
//       console.error("❌ Failed to fetch movies:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Delete movie (API unchanged)
//   const handleDelete = async (roomId) => {
//     if (!window.confirm("Are you sure you want to delete this movie?")) return;

//     try {
//       await axios.delete(`http://localhost:3000/rooms/${roomId}`);
//       alert("✅ Movie deleted successfully!");
//       fetchRooms();
//     } catch (err) {
//       console.error("❌ Delete error:", err);
//       alert("Failed to delete movie.");
//     }
//   };

//   // ✅ Edit movie (navigate unchanged)
//   const handleEditClick = (roomId) => {
//     navigate(`/admin/edit-room/${roomId}`);
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-semibold mb-4">🎬 All Movies</h2>

//       {loading ? (
//         <p>Loading movies...</p>
//       ) : rooms.length === 0 ? (
//         <p className="text-gray-500">No movies found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border rounded shadow">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="py-2 px-4 text-left">Movie Name</th>
//                 <th className="py-2 px-4 text-left">City</th>
//                 <th className="py-2 px-4 text-left">Ticket Price</th>
//                 <th className="py-2 px-4 text-left">Screen Type</th>
//                 <th className="py-2 px-4 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {rooms.map((room) => (
//                 <tr key={room._id} className="border-t hover:bg-gray-50">
//                   <td className="py-2 px-4 font-medium">{room.name}</td>
//                   <td className="py-2 px-4">{room.city}</td>
//                   <td className="py-2 px-4">₹{room.price}</td>
//                   <td className="py-2 px-4 capitalize">{room.roomType}</td>
//                   <td className="py-2 px-4 space-x-2">
//                     <button
//                       onClick={() => handleEditClick(room._id)}
//                       className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-xs rounded"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(room._id)}
//                       className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-xs rounded"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ListRooms;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from '../../config/api';

const ListRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/rooms`);
      setRooms(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch movies:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (roomId) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/rooms/${roomId}`);
      alert("✅ Movie deleted successfully!");
      fetchRooms();
    } catch (err) {
      console.error("❌ Delete error:", err);
      alert("Failed to delete movie.");
    }
  };

  const handleEditClick = (roomId) => {
    navigate(`/admin/edit-room/${roomId}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">🎬 All Movies</h2>

      {loading ? (
        <p>Loading movies...</p>
      ) : rooms.length === 0 ? (
        <p className="text-gray-500">No movies found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow-lg">
            <thead className="bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700">
              <tr>
                <th className="py-2 px-4 text-left">Movie Name</th>
                <th className="py-2 px-4 text-left">Location</th>
                <th className="py-2 px-4 text-left">Show Date & Time</th>
                <th className="py-2 px-4 text-left">Remaining Seats</th>
                <th className="py-2 px-4 text-left">Ticket Price</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => {
                // Pick the first show
                const show = room.shows && room.shows.length > 0 ? room.shows[0] : null;
                const remainingSeats = show
                  ? show.seats.filter((seat) => !seat.isBooked).length
                  : 0;

                // Status example (if all seats booked -> Sold Out)
                const status = remainingSeats === 0 ? "Sold Out" : "Available";

                return (
                  <tr
                    key={room._id}
                    className="border-t hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200"
                  >
                    <td className="py-2 px-4 font-medium">{room.name}</td>
                    <td className="py-2 px-4">{room.city || "N/A"}</td>
                    <td className="py-2 px-4">
                      {show ? `${show.showDate} ${show.showTime}` : "Not Scheduled"}
                    </td>
                    <td className="py-2 px-4">{remainingSeats}</td>
                    <td className="py-2 px-4">₹{room.price}</td>
                    <td className={`py-2 px-4 font-semibold ${status === "Sold Out" ? "text-red-600" : "text-green-600"}`}>
                      {status}
                    </td>
                    <td className="py-2 px-4 space-x-2">
                      <button
                        onClick={() => handleEditClick(room._id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-xs rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(room._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-xs rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListRooms;
