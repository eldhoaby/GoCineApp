// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaStar, FaTicketAlt } from 'react-icons/fa';

// const HotelCard = ({ movie, index, onBookNow }) => {
//   const navigate = useNavigate();

//   if (!movie) return null;

//   const {
//     _id,
//     title = 'Untitled Movie',
//     theatre = 'Theatre info not available',
//     ticketPrice = 'N/A',
//     rating = 4.5,
//     poster = '',
//     showTime = 'Time not set',
//     genres = [],
//   } = movie;

//   const handleCardClick = () => {
//     if (_id) navigate(`/movies/${_id}`);
//   };

//   const handleBookNowClick = (e) => {
//     e.stopPropagation();
//     if (onBookNow) onBookNow();
//   };

//   return (
//     <article
//       onClick={handleCardClick}
//       className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden w-full max-w-xs mx-auto"
//     >
//       {/* Poster */}
//       <div className="relative h-64">
//         <img
//           src={poster || 'https://via.placeholder.com/300x400'}
//           alt={title}
//           className="w-full h-full object-cover"
//         />
//         {index === 0 && (
//           <span className="absolute top-3 left-3 bg-red-600 text-xs font-semibold px-2 py-1 rounded">
//             Now Showing
//           </span>
//         )}
//       </div>

//       {/* Details */}
//       <div className="p-4 flex flex-col justify-between h-56">
//         <div className="space-y-1">
//           <h3 className="text-lg font-semibold text-gray-900 truncate">{title}</h3>
//           <p className="text-sm text-gray-500 truncate">{theatre}</p>
//           <p className="text-sm text-gray-500">Showtime: {showTime}</p>

//           {/* Genres */}
//           <div className="flex flex-wrap gap-2 mt-2">
//             {genres.length > 0 ? (
//               genres.map((g, i) => (
//                 <span
//                   key={i}
//                   className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full font-medium"
//                 >
//                   {g}
//                 </span>
//               ))
//             ) : (
//               <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full font-medium">
//                 Genre N/A
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Rating + Price + Button */}
//         <div className="mt-3 flex flex-col gap-2">
//           <div className="flex items-center justify-between">
//             <p className="text-sm flex items-center gap-1 text-yellow-500 font-medium">
//               <FaStar /> {rating}
//             </p>
//             <p className="text-sm font-bold text-gray-900">
//               ₹{ticketPrice} <span className="text-gray-500 text-xs">/ticket</span>
//             </p>
//           </div>

//           <button
//             onClick={handleBookNowClick}
//             className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-xl flex items-center justify-center gap-2 transition-colors"
//           >
//             <FaTicketAlt /> Book Now
//           </button>
//         </div>
//       </div>
//     </article>
//   );
// };

// export default HotelCard;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaTicketAlt } from 'react-icons/fa';

const MovieCard = ({ movie, index, onBookNow }) => {
  const navigate = useNavigate();

  if (!movie) return null;

  const {
    _id,
    title = 'Untitled Movie',
    theatre = 'Theatre info not available',
    ticketPrice = 'N/A',
    rating = 4.5,
    poster = '',
    showTime = 'Time not set',
    genres = [],
  } = movie;

  const handleCardClick = () => {
    if (_id) navigate(`/movies/${_id}`);
  };

  const handleBookNowClick = (e) => {
    e.stopPropagation();
    if (onBookNow) onBookNow(movie);
  };

  return (
    <article
      onClick={handleCardClick}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden w-full max-w-xs mx-auto"
    >
      {/* Poster */}
      <div className="relative h-64">
        <img
          src={poster || 'https://via.placeholder.com/300x400?text=No+Poster'}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {index === 0 && (
          <span className="absolute top-3 left-3 bg-red-600 text-xs font-semibold px-2 py-1 rounded">
            Now Showing
          </span>
        )}
      </div>

      {/* Movie Details */}
      <div className="p-4 flex flex-col justify-between h-56">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{title}</h3>
          <p className="text-sm text-gray-500 truncate">{theatre}</p>
          <p className="text-sm text-gray-500">Showtime: {showTime}</p>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mt-2">
            {genres.length > 0 ? (
              genres.map((g, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full font-medium"
                >
                  {g}
                </span>
              ))
            ) : (
              <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full font-medium">
                Genre N/A
              </span>
            )}
          </div>
        </div>

        {/* Rating + Price + Button */}
        <div className="mt-3 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-sm flex items-center gap-1 text-yellow-500 font-medium">
              <FaStar /> {rating}
            </p>
            <p className="text-sm font-bold text-gray-900">
              ₹{ticketPrice} <span className="text-gray-500 text-xs">/ticket</span>
            </p>
          </div>

          <button
            onClick={handleBookNowClick}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <FaTicketAlt /> Book Now
          </button>
        </div>
      </div>
    </article>
  );
};

export default MovieCard;

