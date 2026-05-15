// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import HotelCard from './HotelCard';
// import Title from './Title';
// import Login from './Login';

// const FeaturedDestination = () => {
//   const navigate = useNavigate();
//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);

//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/rooms');
//         const data = await response.json();

//         // Map rooms to the format expected by HotelCard
//         const mappedMovies = data
//           .filter(room => room?.images?.length > 0 && room.price !== undefined)
//           .slice(0, 4)
//           .map(room => ({
//             _id: room._id,
//             title: room.name,
//             theatre: room.city,
//             ticketPrice: room.price,
//             poster: room.images[0] || '',
//             showTime: room.showTime || 'Time not set',
//             rating: 4.5, // default rating
//           }));

//         setRooms(mappedMovies);
//       } catch (err) {
//         console.error("Error fetching featured movies:", err);
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRooms();
//   }, []);

//   const handleBookNow = () => {
//     const user = localStorage.getItem('user');
//     if (user) {
//       navigate('/rooms');
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     } else {
//       setShowLogin(true);
//     }
//   };

//   const handleViewAllDestinations = () => {
//     navigate('/rooms');
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>
//       <Title
//         title='Featured Movies'
//         subTitle='Check out our selection of popular movies and book your tickets for an amazing cinematic experience.'
//       />

//       <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20 w-full'>
//         {loading && <p className='text-gray-500'>Loading featured movies...</p>}
//         {error && <p className='text-red-500'>Error loading featured movies.</p>}
//         {!loading && !error && rooms.length === 0 && (
//           <p className='text-gray-500'>No featured movies available.</p>
//         )}
//         {!loading && !error &&
//           rooms.map((movie, index) => (
//             <HotelCard
//               key={movie._id || index}
//               movie={movie} // ✅ correct prop name
//               index={index}
//               onBookNow={handleBookNow}
//             />
//           ))}
//       </div>

//       <button
//         onClick={handleViewAllDestinations}
//         className='my-16 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all'
//       >
//         View All Movies
//       </button>

//       {showLogin && (
//         <Login
//           onClose={() => setShowLogin(false)}
//           onSwitch={() => {}}
//           onLoginSuccess={() => {
//             setShowLogin(false);
//             navigate('/rooms');
//             window.scrollTo({ top: 0, behavior: 'smooth' });
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default FeaturedDestination;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTicketAlt, FaStar } from 'react-icons/fa';
import Login from './Login';
import API_BASE_URL from '../config/api';

const FeaturedDestination = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [roomToNavigate, setRoomToNavigate] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/rooms`);
        const data = await response.json();

        // Only take 4 featured rooms with images
        const featured = data.filter(r => r.images?.length > 0).slice(0, 4);
        setRooms(featured);
      } catch (err) {
        console.error("Error fetching featured movies:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const handleBookNow = (roomId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      setRoomToNavigate(roomId);
      setShowLogin(true);
    } else {
      navigate(`/rooms/${roomId}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleViewAllDestinations = () => {
    navigate('/rooms');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    if (roomToNavigate) {
      navigate(`/rooms/${roomToNavigate}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setRoomToNavigate(null);
    }
  };

  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>
      <h2 className='text-3xl font-bold'>Featured Movies</h2>
      <p className='text-gray-600 mt-2 text-center max-w-2xl'>
        Check out our selection of popular movies and book your tickets for an amazing cinematic experience.
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 w-full'>
        {loading && <p className='text-gray-500'>Loading featured movies...</p>}
        {error && <p className='text-red-500'>Error loading featured movies.</p>}
        {!loading && !error && rooms.length === 0 && (
          <p className='text-gray-500'>No featured movies available.</p>
        )}
        {!loading && !error && rooms.map((room, index) => (
          <div
            key={room._id || index}
            className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border cursor-pointer"
            onClick={() => handleBookNow(room._id)}
          >
            {/* TRENDING badge for first card */}
            {index === 0 && (
              <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
                TRENDING
              </span>
            )}

            <img
              src={room.images[0]}
              alt={room.name}
              className="w-full h-60 object-cover"
            />
            <div className="p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold truncate">{room.name}</h3>
                {/* <p className="text-sm text-gray-500 mt-1">
                  {room.year || '2025'} • {room.genre || "Action"} | {room.city || "City"} • {room.duration || "2h 30m"}
                </p> */}
                <p className="text-sm text-gray-500 mt-1">
  {room.year || "2025"} • {room.genres?.join(", ") || "Drama"} | {room.city || "Unknown"} • {room.duration || "2h 50m"}
</p>

              </div>
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookNow(room._id);
                  }}
                  className="bg-pink-500 hover:bg-pink-600 text-white text-xs font-medium px-4 py-2 rounded-full flex items-center gap-2"
                >
                  <FaTicketAlt /> Buy Tickets
                </button>
                <div className="flex items-center gap-1 text-pink-600 text-sm font-semibold">
                  <FaStar /> {room.rating || 7.2}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleViewAllDestinations}
        className='my-16 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all'
      >
        View All Movies
      </button>

      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onSwitch={() => {}}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
};

export default FeaturedDestination;
