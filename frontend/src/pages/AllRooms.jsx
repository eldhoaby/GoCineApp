// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { FaTicketAlt, FaStar } from 'react-icons/fa';
// import StarRating from '../components/StarRating';
// import Login from '../components/Login';
// import Register from '../components/Register';

// const CheckBox = ({ label, selected = false, onChange = () => {} }) => (
//   <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
//     <input
//       type="checkbox"
//       checked={selected}
//       onChange={(e) => onChange(e.target.checked, label)}
//     />
//     <span className="font-light select-none">{label}</span>
//   </label>
// );

// const RadioButton = ({ label, selected = false, onChange = () => {} }) => (
//   <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
//     <input
//       type="radio"
//       name="sortOption"
//       checked={selected}
//       onChange={() => onChange(label)}
//     />
//     <span className="font-light select-none">{label}</span>
//   </label>
// );

// const AllRooms = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const cityQuery = searchParams.get('city');

//   const [rooms, setRooms] = useState([]);
//   const [openFilters, setOpenFilters] = useState(false);
//   const [selectedScreenTypes, setSelectedScreenTypes] = useState([]);
//   const [selectedGenres, setSelectedGenres] = useState([]);
//   const [selectedSortOption, setSelectedSortOption] = useState('');
//   const [showLogin, setShowLogin] = useState(false);
//   const [showRegister, setShowRegister] = useState(false);
//   const [roomToNavigate, setRoomToNavigate] = useState(null);

//   const screenTypes = ["IMAX", "4DX", "ICE", "Standard 2D"];
//   const genres = ["Family", "Thriller", "Horror", "Comedy", "Drama", "Crime"];
//   const sortOptions = ["Price Low to High", "Price High to Low", "Newest First"];

//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/rooms');
//         const data = await response.json();

//         const filteredByCity = cityQuery
//           ? data.filter((room) => {
//               const city = room.city || room?.hotel?.city || '';
//               return city.toLowerCase().trim() === cityQuery.toLowerCase().trim();
//             })
//           : data;

//         setRooms(filteredByCity);
//       } catch (error) {
//         console.error('Error fetching rooms:', error);
//       }
//     };
//     fetchRooms();
//   }, [cityQuery]);

//   const handleImageClick = (roomId) => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user) {
//       setRoomToNavigate(roomId);
//       setShowLogin(true);
//     } else {
//       navigate(`/rooms/${roomId}`);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const handleScreenTypeChange = (checked, label) => {
//     setSelectedScreenTypes((prev) =>
//       checked ? [...prev, label] : prev.filter((item) => item !== label)
//     );
//   };

//   const handleGenreChange = (checked, label) => {
//     setSelectedGenres((prev) =>
//       checked ? [...prev, label] : prev.filter((item) => item !== label)
//     );
//   };

//   const handleSortOptionChange = (label) => {
//     setSelectedSortOption(label);
//   };

//   const handleLoginSuccess = () => {
//     setShowLogin(false);
//     window.dispatchEvent(new Event('storage'));
//     if (roomToNavigate) {
//       navigate(`/rooms/${roomToNavigate}`);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//       setRoomToNavigate(null);
//     }
//   };

//   const filteredRooms = rooms
//     .filter((room) => {
//       const matchesType =
//         selectedScreenTypes.length === 0 || selectedScreenTypes.includes(room.roomType);
//       const matchesGenre =
//         selectedGenres.length === 0 ||
//         selectedGenres.includes(room.genre || "Drama");
//       return matchesType && matchesGenre;
//     })
//     .sort((a, b) => {
//       if (selectedSortOption === 'Price Low to High') return a.price - b.price;
//       if (selectedSortOption === 'Price High to Low') return b.price - a.price;
//       return 0;
//     });

//   return (
//     <>
//       <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 px-6 md:px-16 lg:px-24 xl:px-32 min-h-screen">
//         {/* Left: Movie Grid */}
//         <div className="flex-1">
//           <h1 className="text-2xl font-semibold mb-6">Now Showing</h1>

//           {filteredRooms.length === 0 ? (
//             <div className="mt-10 text-gray-500">
//               <p>
//                 {cityQuery
//                   ? `No theaters found for "${cityQuery}".`
//                   : 'No theaters match your filters.'}
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
//               {filteredRooms.map((room) => (
//                 <div
//                   key={room._id}
//                   onClick={() => handleImageClick(room._id)}
//                   className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 border cursor-pointer"
//                 >
//                   <img
//                     src={room.images[0]}
//                     alt={room.name}
//                     className="w-full h-60 object-cover"
//                   />
//                   <div className="p-4 flex flex-col justify-between">
//                     <div>
//                       <h3 className="text-base font-semibold truncate">
//                         {room.name}
//                       </h3>
//                       <p className="text-sm text-gray-500 mt-1">
//                         2025 • {room.genre || "Action"} | {room.city || "Adventure"} • 2h 50m
//                       </p>
//                     </div>
//                     <div className="flex items-center justify-between mt-4">
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleImageClick(room._id);
//                         }}
//                         className="bg-pink-500 hover:bg-pink-600 text-white text-xs font-medium px-4 py-2 rounded-full flex items-center gap-2"
//                       >
//                         <FaTicketAlt /> Buy Tickets
//                       </button>
//                       <div className="flex items-center gap-1 text-pink-600 text-sm font-semibold">
//                         <FaStar /> {room.rating || "7.2"}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Right: Filter Panel */}
//         <div className="bg-white w-80 border text-gray-600 mb-8 lg:mb-0 mt-0 lg:mt-16 rounded-lg shadow-sm lg:ml-10">
//           <div className={`flex items-center justify-between px-5 py-2.5 ${openFilters && "border-b"}`}>
//             <p className="text-base font-medium text-gray-800">FILTERS</p>
//             <div className="text-xs cursor-pointer">
//               <span onClick={() => setOpenFilters(!openFilters)} className="lg:hidden">
//                 {openFilters ? "HIDE" : "SHOW"}
//               </span>
//               <span
//                 className="hidden lg:block"
//                 onClick={() => {
//                   setSelectedScreenTypes([]);
//                   setSelectedGenres([]);
//                   setSelectedSortOption('');
//                 }}
//               >
//                 CLEAR
//               </span>
//             </div>
//           </div>

//           <div className={`${openFilters ? "h-auto" : "h-0 lg:h-auto"} overflow-hidden transition-all duration-700`}>
//             <div className="px-5 pt-5">
//               <p className="font-medium text-gray-800 pb-2">Screen Types</p>
//               {screenTypes.map((type, i) => (
//                 <CheckBox
//                   key={i}
//                   label={type}
//                   selected={selectedScreenTypes.includes(type)}
//                   onChange={handleScreenTypeChange}
//                 />
//               ))}
//             </div>

//             <div className="px-5 pt-5">
//               <p className="font-medium text-gray-800 pb-2">Genre</p>
//               {genres.map((genre, i) => (
//                 <CheckBox
//                   key={i}
//                   label={genre}
//                   selected={selectedGenres.includes(genre)}
//                   onChange={handleGenreChange}
//                 />
//               ))}
//             </div>

//             <div className="px-5 pt-5 pb-6">
//               <p className="font-medium text-gray-800 pb-2">Sort By</p>
//               {sortOptions.map((opt, i) => (
//                 <RadioButton
//                   key={i}
//                   label={opt}
//                   selected={selectedSortOption === opt}
//                   onChange={handleSortOptionChange}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Login Popup */}
//       {showLogin && (
//         <Login
//           onClose={() => setShowLogin(false)}
//           onSwitch={() => {
//             setShowLogin(false);
//             setShowRegister(true);
//           }}
//           onLoginSuccess={handleLoginSuccess}
//         />
//       )}

//       {/* Register Popup */}
//       {showRegister && (
//         <Register
//           onClose={() => setShowRegister(false)}
//           onSwitch={() => {
//             setShowRegister(false);
//             setShowLogin(true);
//           }}
//         />
//       )}
//     </>
//   );
// };

// export default AllRooms;










import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaTicketAlt, FaStar } from 'react-icons/fa';
import StarRating from '../components/StarRating';
import Login from '../components/Login';
import Register from '../components/Register';

const CheckBox = ({ label, selected = false, onChange = () => {} }) => (
  <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
    <input
      type="checkbox"
      checked={selected}
      onChange={(e) => onChange(e.target.checked, label)}
    />
    <span className="font-light select-none">{label}</span>
  </label>
);

const RadioButton = ({ label, selected = false, onChange = () => {} }) => (
  <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
    <input
      type="radio"
      name="sortOption"
      checked={selected}
      onChange={() => onChange(label)}
    />
    <span className="font-light select-none">{label}</span>
  </label>
);

const AllRooms = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cityQuery = searchParams.get('city');

  const [rooms, setRooms] = useState([]);
  const [openFilters, setOpenFilters] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [roomToNavigate, setRoomToNavigate] = useState(null);

  const genres = ['Action', 'Adventure', 'Comedy', 'Crime', 'Drama', 'Family','Fantasy','Horror','Romance','Sci-Fi','Thriller'];
  const sortOptions = ["Price Low to High", "Price High to Low", "Newest First"];

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:3000/rooms');
        const data = await response.json();

        const filteredByCity = cityQuery
          ? data.filter((room) => {
              const city = room.city || room?.hotel?.city || '';
              return city.toLowerCase().trim() === cityQuery.toLowerCase().trim();
            })
          : data;

        setRooms(filteredByCity);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };
    fetchRooms();
  }, [cityQuery]);

  const handleImageClick = (roomId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setRoomToNavigate(roomId);
      setShowLogin(true);
    } else {
      navigate(`/rooms/${roomId}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGenreChange = (checked, label) => {
    setSelectedGenres((prev) =>
      checked ? [...prev, label] : prev.filter((item) => item !== label)
    );
  };

  const handleSortOptionChange = (label) => {
    setSelectedSortOption(label);
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    window.dispatchEvent(new Event('storage'));
    if (roomToNavigate) {
      navigate(`/rooms/${roomToNavigate}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setRoomToNavigate(null);
    }
  };


  const filteredRooms = rooms
  .filter((room) => {
    if (selectedGenres.length === 0) return true;
    if (!room.genres || room.genres.length === 0) return false;

    // Check if the room has at least one genre in selectedGenres
    return room.genres.some((g) => selectedGenres.includes(g));
  })
  .sort((a, b) => {
    if (selectedSortOption === 'Price Low to High') return a.price - b.price;
    if (selectedSortOption === 'Price High to Low') return b.price - a.price;
    return 0;
  });


  // const filteredRooms = rooms
  //   .filter((room) => {
  //     const matchesGenre =
  //       selectedGenres.length === 0 ||
  //       selectedGenres.includes(room.genre || "Drama");
  //     return matchesGenre;
  //   })
  //   .sort((a, b) => {
  //     if (selectedSortOption === 'Price Low to High') return a.price - b.price;
  //     if (selectedSortOption === 'Price High to Low') return b.price - a.price;
  //     return 0;
  //   });

  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 px-6 md:px-16 lg:px-24 xl:px-32 min-h-screen">
        {/* Left: Movie Grid */}
        <div className="flex-1">
          <h1 className="text-2xl font-semibold mb-6">Now Showing</h1>

          {filteredRooms.length === 0 ? (
            <div className="mt-10 text-gray-500">
              <p>
                {cityQuery
                  ? `No theaters found for "${cityQuery}".`
                  : 'No theaters match your filters.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredRooms.map((room) => (
                <div
                  key={room._id}
                  onClick={() => handleImageClick(room._id)}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 border cursor-pointer"
                >
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-semibold truncate">
                        {room.name}
                      </h3>
                      {/* <p className="text-sm text-gray-500 mt-1">
                        2025 • {room.genre || "Action"} | {room.city || "Adventure"} • 2h 50m
                      </p> */}
                      <p className="text-sm text-gray-500 mt-1">
  {room.year || "2025"} • {room.genres?.join(", ") || "Drama"} | {room.city || "Unknown"} • {room.duration || "2h 50m"}
</p>

                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleImageClick(room._id);
                        }}
                        className="bg-pink-500 hover:bg-pink-600 text-white text-xs font-medium px-4 py-2 rounded-full flex items-center gap-2"
                      >
                        <FaTicketAlt /> Buy Tickets
                      </button>
                      <div className="flex items-center gap-1 text-pink-600 text-sm font-semibold">
                        <FaStar /> {room.rating || "7.2"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Filter Panel */}
        <div className="bg-white w-80 border text-gray-600 mb-8 lg:mb-0 mt-0 lg:mt-16 rounded-lg shadow-sm lg:ml-10">
          <div className={`flex items-center justify-between px-5 py-2.5 ${openFilters && "border-b"}`}>
            <p className="text-base font-medium text-gray-800">FILTERS</p>
            <div className="text-xs cursor-pointer">
              <span onClick={() => setOpenFilters(!openFilters)} className="lg:hidden">
                {openFilters ? "HIDE" : "SHOW"}
              </span>
              <span
                className="hidden lg:block"
                onClick={() => {
                  setSelectedGenres([]);
                  setSelectedSortOption('');
                }}
              >
                CLEAR
              </span>
            </div>
          </div>

          <div className={`${openFilters ? "h-auto" : "h-0 lg:h-auto"} overflow-hidden transition-all duration-700`}>
            <div className="px-5 pt-5">
              <p className="font-medium text-gray-800 pb-2">Genre</p>
              {genres.map((genre, i) => (
                <CheckBox
                  key={i}
                  label={genre}
                  selected={selectedGenres.includes(genre)}
                  onChange={handleGenreChange}
                />
              ))}
            </div>

            <div className="px-5 pt-5 pb-6">
              <p className="font-medium text-gray-800 pb-2">Sort By</p>
              {sortOptions.map((opt, i) => (
                <RadioButton
                  key={i}
                  label={opt}
                  selected={selectedSortOption === opt}
                  onChange={handleSortOptionChange}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Login Popup */}
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onSwitch={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* Register Popup */}
      {showRegister && (
        <Register
          onClose={() => setShowRegister(false)}
          onSwitch={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}
    </>
  );
};

export default AllRooms;
