// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { assets } from "../assets/assets";

// const Hero = () => {
//   const navigate = useNavigate();

//   const [destinationInput, setDestinationInput] = useState(""); // Movie / theatre
//   const [allCities, setAllCities] = useState([]); // Movie theatres/cities
//   const [filteredCities, setFilteredCities] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);

//   const [showDate, setShowDate] = useState(""); // Show date
//   const [guests, setGuests] = useState(1); // Number of tickets

//   const [destinationError, setDestinationError] = useState("");
//   const [dateError, setDateError] = useState("");
//   const [guestError, setGuestError] = useState("");

//   // Fetch movie theatres / cities from rooms endpoint
//   useEffect(() => {
//     const fetchCities = async () => {
//       try {
//         const res = await fetch("http://localhost:3000/rooms");
//         const data = await res.json();
//         const citySet = new Set();

//         data.forEach((room) => {
//           const city = room?.hotel?.city || room?.city;
//           if (city) citySet.add(city.trim());
//         });

//         setAllCities([...citySet]);
//       } catch (err) {
//         console.error("Failed to fetch theatres:", err);
//       }
//     };

//     fetchCities();
//   }, []);

//   const handleDestinationChange = (e) => {
//     const value = e.target.value;
//     setDestinationInput(value);

//     if (!value.trim()) {
//       setFilteredCities([]);
//       setShowDropdown(false);
//       return;
//     }

//     const matches = allCities
//       .filter((city) => city.toLowerCase().includes(value.toLowerCase()))
//       .sort();

//     setFilteredCities(matches);
//     setShowDropdown(matches.length > 0);
//   };

//   const handleSelectCity = (city) => {
//     setDestinationInput(city);
//     setShowDropdown(false);
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const showDateObj = new Date(showDate);
//     showDateObj.setHours(0, 0, 0, 0);

//     let isValid = true;

//     if (!destinationInput.trim()) {
//       setDestinationError("❌ Movie / Theatre is required.");
//       isValid = false;
//     } else {
//       setDestinationError("");
//     }

//     if (!showDate || showDateObj < today) {
//       setDateError("❌ Show date must be today or later.");
//       isValid = false;
//     } else {
//       setDateError("");
//     }

//     if (guests < 1 || guests > 10) {
//       setGuestError("❌ Tickets must be between 1 and 10.");
//       isValid = false;
//     } else {
//       setGuestError("");
//     }

//     if (!isValid) return;

//     const query = new URLSearchParams({
//       city: destinationInput.trim(),
//       showDate,
//       guests,
//     });

//     navigate(`/rooms?${query.toString()}`);
//   };

//   return (
//     <div className="flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url('/src/assets/backgroundImage.png')] bg-no-repeat bg-cover bg-center h-screen">
//       <p className="bg-[#4989FF]/60 px-3.5 py-1 rounded-full mt-20">
//         The Ultimate Movie Experience
//       </p>
//       <h1 className="font-playfair text-2xl md:text-5xl font-bold max-w-xl mt-4">
//         Step into the world of your favorite movies
//       </h1>
//       <p className="max-w-130 mt-2 text-sm md:text-base text-white">
//         Book tickets for the latest movies in theatres near you. Enjoy the show!
//       </p>

//       <form
//         className="bg-white text-gray-500 rounded-lg px-6 py-4 mt-8 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto relative z-10"
//         onSubmit={handleSearch}
//       >
//         {/* Movie / Theatre */}
//         <div className="relative w-full md:w-48">
//           <div className="flex items-center gap-2">
//             <img src={assets.calenderIcon} alt="" className="h-4" />
//             <label htmlFor="destinationInput">Movie / Theatre</label>
//           </div>
//           <input
//             id="destinationInput"
//             type="text"
//             value={destinationInput}
//             onChange={handleDestinationChange}
//             className="w-full rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
//             placeholder="Type movie or theatre"
//             autoComplete="on"
//           />
//           {showDropdown && (
//             <ul className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded shadow z-20 max-h-40 overflow-y-auto text-sm">
//               {filteredCities.map((city, index) => (
//                 <li
//                   key={index}
//                   onClick={() => handleSelectCity(city)}
//                   className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
//                 >
//                   {city}
//                 </li>
//               ))}
//             </ul>
//           )}
//           {destinationError && <p className="text-red-600 text-sm mt-1">{destinationError}</p>}
//         </div>

//         {/* Show Date */}
//         <div>
//           <div className="flex items-center gap-2">
//             <img src={assets.calenderIcon} alt="" className="h-4" />
//             <label htmlFor="showDate">Show Date</label>
//           </div>
//           <input
//             id="showDate"
//             type="date"
//             value={showDate}
//             onChange={(e) => setShowDate(e.target.value)}
//             className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
//           />
//           {dateError && <p className="text-red-600 text-sm mt-1">{dateError}</p>}
//         </div>

//         {/* Tickets */}
//         <div className="flex md:flex-col max-md:gap-2 max-md:items-center">
//           <label htmlFor="guests">Tickets</label>
//           <input
//             id="guests"
//             type="number"
//             min={1}
//             max={10}
//             value={guests}
//             onChange={(e) => setGuests(parseInt(e.target.value))}
//             className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none max-w-16"
//             placeholder="1"
//           />
//           {guestError && <p className="text-red-600 text-sm mt-1">{guestError}</p>}
//         </div>

//         {/* Search Button */}
//         <button
//           type="submit"
//           className="flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1"
//         >
//           <img src={assets.searchIcon} alt="searchIcon" className="h-7" />
//           <span>Search</span>
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Hero;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState(""); // movie or location
  const [allRooms, setAllRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [showDate, setShowDate] = useState(""); 
  const [guests, setGuests] = useState(1);

  const [inputError, setInputError] = useState("");
  const [dateError, setDateError] = useState("");
  const [guestError, setGuestError] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("http://localhost:3000/rooms");
        const data = await res.json();
        setAllRooms(data);
      } catch (err) {
        console.error("Failed to fetch rooms:", err);
      }
    };
    fetchRooms();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (!value.trim()) {
      setFilteredRooms([]);
      setShowDropdown(false);
      return;
    }

    const matches = allRooms.filter(
      (room) =>
        room.name.toLowerCase().includes(value.toLowerCase()) ||
        (room.city || "").toLowerCase().includes(value.toLowerCase())
    );

    setFilteredRooms(matches);
    setShowDropdown(matches.length > 0);
  };

  const handleSelectRoom = (room) => {
    setSearchInput(room.name || room.city);
    setShowDropdown(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let isValid = true;

    if (!searchInput.trim()) {
      setInputError("❌ Movie or Location is required.");
      isValid = false;
    } else {
      setInputError("");
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(showDate);
    selectedDate.setHours(0, 0, 0, 0);

    if (!showDate || selectedDate < today) {
      setDateError("❌ Show date must be today or later.");
      isValid = false;
    } else {
      setDateError("");
    }

    if (guests < 1 || guests > 10) {
      setGuestError("❌ Tickets must be between 1 and 10.");
      isValid = false;
    } else {
      setGuestError("");
    }

    if (!isValid) return;

    const query = new URLSearchParams({
      query: searchInput.trim(),
      showDate,
      guests,
    });

    navigate(`/rooms?${query.toString()}`);
  };

  return (
    <div className="flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url('/src/assets/backgroundImage.png')] bg-no-repeat bg-cover bg-center h-screen">
      <p className="bg-[#4989FF]/60 px-3.5 py-1 rounded-full mt-20">
        The Ultimate Movie Experience
      </p>
      <h1 className="font-playfair text-2xl md:text-5xl font-bold max-w-xl mt-4">
        Step into the world of your favorite movies
      </h1>
      <p className="max-w-130 mt-2 text-sm md:text-base text-white">
        Book tickets for the latest movies in theatres near you. Enjoy the show!
      </p>

      <form
        className="bg-white text-gray-500 rounded-lg px-6 py-4 mt-8 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto relative z-10"
        onSubmit={handleSearch}
      >
        {/* Movie / Location */}
        <div className="relative w-full md:w-48">
          <div className="flex items-center gap-2">
            <img src={assets.calenderIcon} alt="" className="h-4" />
            <label htmlFor="searchInput">Movie / Location</label>
          </div>
          <input
            id="searchInput"
            type="text"
            value={searchInput}
            onChange={handleInputChange}
            className="w-full rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            placeholder="Type movie or location"
          />
          {showDropdown && (
            <ul className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded shadow z-20 max-h-40 overflow-y-auto text-sm">
              {filteredRooms.map((room, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectRoom(room)}
                  className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                >
                  {room.name} / {room.city}
                </li>
              ))}
            </ul>
          )}
          {inputError && (
            <p className="text-red-600 text-sm mt-1">{inputError}</p>
          )}
        </div>

        {/* Show Date */}
        <div>
          <div className="flex items-center gap-2">
            <img src={assets.calenderIcon} alt="" className="h-4" />
            <label htmlFor="showDate">Show Date</label>
          </div>
          <input
            id="showDate"
            type="date"
            value={showDate}
            onChange={(e) => setShowDate(e.target.value)}
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          />
          {dateError && <p className="text-red-600 text-sm mt-1">{dateError}</p>}
        </div>

        {/* Tickets */}
        <div className="flex md:flex-col max-md:gap-2 max-md:items-center">
          <label htmlFor="guests">Tickets</label>
          <input
            id="guests"
            type="number"
            min={1}
            max={10}
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none max-w-16"
            placeholder="1"
          />
          {guestError && <p className="text-red-600 text-sm mt-1">{guestError}</p>}
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 my-auto cursor-pointer max-md:w-full max-md:py-1 text-white"
        >
          <img src={assets.searchIcon} alt="searchIcon" className="h-7" />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
};

export default Hero;
