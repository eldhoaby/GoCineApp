// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { assets } from '../../assets/assets';

// const HotelReg = () => {
//   const navigate = useNavigate();

//   const genreOptions = ['Family', 'Comedy', 'Thriller', 'Horror', 'Drama', 'Crime'];

//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     duration: '',
//     genres: [],
//     year: '',
//     rating: '',
//     price: '',
//     trailerUrl: '',
//     image: '',           // Only one image
//     shows: [{ showDate: '', showTime: '' }]
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const toggleGenre = (genre) => {
//     setFormData(prev => ({
//       ...prev,
//       genres: prev.genres.includes(genre)
//         ? prev.genres.filter(g => g !== genre)
//         : [...prev.genres, genre]
//     }));
//   };

//   const handleShowChange = (index, field, value) => {
//     const updatedShows = [...formData.shows];
//     updatedShows[index][field] = value;
//     setFormData(prev => ({ ...prev, shows: updatedShows }));
//   };

//   const addShow = () => {
//     setFormData(prev => ({ ...prev, shows: [...prev.shows, { showDate: '', showTime: '' }] }));
//   };

//   const removeShow = (index) => {
//     const updatedShows = [...formData.shows];
//     updatedShows.splice(index, 1);
//     setFormData(prev => ({ ...prev, shows: updatedShows }));
//   };

//   const generateSeats = () => {
//     const rows = "ABCDEFGHIJKL".split("");
//     const seatsPerRow = 12;
//     let seats = [];
//     rows.forEach(row => {
//       for (let num = 1; num <= seatsPerRow; num++) {
//         seats.push({ row, number: num, isBooked: false });
//       }
//     });
//     return seats;
//   };

//   const handleClose = () => navigate('/admin/dashboard');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const showsWithSeats = formData.shows.map(show => ({
//         ...show,
//         seats: generateSeats()
//       }));

//       const dataToSend = {
//         ...formData,
//         year: Number(formData.year),
//         rating: Number(formData.rating),
//         price: Number(formData.price),
//         images: [formData.image], // wrap single image in array
//         shows: showsWithSeats
//       };

//       await axios.post('http://localhost:3000/rooms', dataToSend);
//       alert("Movie registered successfully!");
//       navigate("/admin/dashboard");
//     } catch (err) {
//       console.error("Error registering movie:", err.response?.data || err.message);
//       alert("Error registering movie. Check console for details.");
//     }
//   };

//   return (
//     <div className='fixed inset-0 bg-black/70 z-50 flex justify-center items-center overflow-y-auto'>
//       <form
//         onSubmit={handleSubmit}
//         className='flex flex-col md:flex-row bg-white rounded-2xl max-w-5xl w-full mx-4 my-10 md:my-20 overflow-y-auto max-h-[90vh] shadow-xl animate-fadeIn'
//       >
//         {/* Left Image */}
//         <div className='md:w-1/2 relative'>
//           <img
//             src={formData.image || assets.regImage}
//             alt="Poster Preview"
//             className='w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none transition-all duration-300 hover:scale-105'
//           />
//         </div>

//         {/* Form */}
//         <div className='md:w-1/2 p-8 flex flex-col gap-4'>
//           <img
//             src={assets.closeIcon}
//             alt="close"
//             className='w-6 h-6 cursor-pointer self-end hover:scale-110 transition-transform duration-300'
//             onClick={handleClose}
//           />
//           <h2 className='text-3xl font-semibold text-center mb-4 animate-fadeIn'>Register Movie</h2>

//           {[
//             { id: 'name', label: 'Movie Title' },
//             { id: 'description', label: 'Description' },
//             { id: 'duration', label: 'Duration (e.g., 2h 30m)' },
//             { id: 'year', label: 'Release Year' },
//             { id: 'rating', label: 'Rating (e.g., 4.5)' },
//             { id: 'price', label: 'Ticket Price' },
//             { id: 'trailerUrl', label: 'Trailer URL' },
//           ].map(f => (
//             <div key={f.id} className='flex flex-col'>
//               <label htmlFor={f.id} className='text-gray-600 font-medium mb-1'>{f.label}</label>
//               <input
//                 type='text'
//                 id={f.id}
//                 name={f.id}
//                 value={formData[f.id]}
//                 onChange={handleChange}
//                 placeholder={`Enter ${f.label}`}
//                 className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200'
//                 required
//               />
//             </div>
//           ))}

//           {/* Genre Selection */}
//           <div>
//             <label className='text-gray-600 font-medium mb-1'>Genres</label>
//             <div className='grid grid-cols-2 gap-2'>
//               {genreOptions.map(genre => (
//                 <label key={genre} className='flex items-center space-x-2'>
//                   <input
//                     type="checkbox"
//                     checked={formData.genres.includes(genre)}
//                     onChange={() => toggleGenre(genre)}
//                     className="accent-indigo-500"
//                   />
//                   <span>{genre}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Single Poster URL */}
//           <div>
//             <label className='text-gray-600 font-medium mb-1'>Poster URL</label>
//             <input
//               type='text'
//               placeholder='Enter poster image URL'
//               value={formData.image}
//               onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
//               className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200'
//               required
//             />
//             {formData.image && (
//               <img
//                 src={formData.image}
//                 alt='Preview'
//                 className='mt-2 w-full h-48 object-cover rounded-lg shadow-md transition-all duration-300 hover:scale-105'
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
//                 }}
//               />
//             )}
//           </div>

//           {/* Shows Section */}
//           <div>
//             <label className='text-gray-600 font-medium mb-1'>Shows</label>
//             {formData.shows.map((show, index) => (
//               <div key={index} className='flex gap-2 items-center mb-2'>
//                 <input
//                   type='date'
//                   value={show.showDate}
//                   onChange={(e) => handleShowChange(index, 'showDate', e.target.value)}
//                   className='border border-gray-300 rounded px-2 py-1 outline-indigo-500'
//                   required
//                 />
//                 <input
//                   type='time'
//                   value={show.showTime}
//                   onChange={(e) => handleShowChange(index, 'showTime', e.target.value)}
//                   className='border border-gray-300 rounded px-2 py-1 outline-indigo-500'
//                   required
//                 />
//                 {formData.shows.length > 1 && (
//                   <button type='button' onClick={() => removeShow(index)} className='text-red-500 font-medium hover:text-red-600 transition-colors'>Remove</button>
//                 )}
//               </div>
//             ))}
//             <button type='button' onClick={addShow} className='text-indigo-500 font-medium hover:text-indigo-600 transition-colors'>+ Add Show</button>
//           </div>

//           <button
//             type="submit"
//             className='bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-lg mt-4 transition-all duration-300 shadow-md hover:shadow-lg'
//           >
//             Register Movie
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default HotelReg;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const HotelReg = () => {
  const navigate = useNavigate();

  const genreOptions = ['Action', 'Adventure', 'Comedy', 'Crime', 'Drama', 'Family','Fantasy','Horror','Romance','Sci-Fi','Thriller'];

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    genres: [],
    year: '',
    rating: '',
    price: '',
    trailerUrl: '',
    image: '',       // Poster URL for backend
    city: '',        // New city/location field
    shows: [{ showDate: '', showTime: '' }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleGenre = (genre) => {
    setFormData(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  const handleShowChange = (index, field, value) => {
    const updatedShows = [...formData.shows];
    updatedShows[index][field] = value;
    setFormData(prev => ({ ...prev, shows: updatedShows }));
  };

  const addShow = () => {
    setFormData(prev => ({ ...prev, shows: [...prev.shows, { showDate: '', showTime: '' }] }));
  };

  const removeShow = (index) => {
    const updatedShows = [...formData.shows];
    updatedShows.splice(index, 1);
    setFormData(prev => ({ ...prev, shows: updatedShows }));
  };

  const generateSeats = () => {
    const rows = "ABCDEFGHIJKL".split("");
    const seatsPerRow = 12;
    let seats = [];
    rows.forEach(row => {
      for (let num = 1; num <= seatsPerRow; num++) {
        seats.push({ row, number: num, isBooked: false });
      }
    });
    return seats;
  };

  const handleClose = () => navigate('/admin/dashboard');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const showsWithSeats = formData.shows.map(show => ({
        ...show,
        seats: generateSeats()
      }));

      const dataToSend = {
        ...formData,
        year: Number(formData.year),
        rating: Number(formData.rating),
        price: Number(formData.price),
        images: [formData.image], // Poster URL
        shows: showsWithSeats
      };

      await axios.post('http://localhost:3000/rooms', dataToSend);
      alert("Movie registered successfully!");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Error registering movie:", err.response?.data || err.message);
      alert("Error registering movie. Check console for details.");
    }
  };

  return (
    <div className='fixed inset-0 bg-black/70 z-50 flex justify-center items-center overflow-y-auto'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col md:flex-row bg-white rounded-2xl max-w-5xl w-full mx-4 my-10 md:my-20 overflow-y-auto max-h-[90vh] shadow-xl animate-fadeIn'
      >
        {/* Left Image (static)
        <div className='md:w-1/2 relative'>
          <img
            src={assets.regImage}   // Always show static image
            alt="Poster Preview"
            className='w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none'
          />
        </div> */}
        {/* Left Image (static from web) */}
<div className='md:w-1/2 relative'>
  <img
    src="https://image.tmdb.org/t/p/original/m9EtP1Yrzv6v7dMaC9mRaGhd1um.jpg"   // Replace with the web URL
    alt="Poster Preview"
    className='w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none'
  />
</div>


        {/* Form */}
        <div className='md:w-1/2 p-8 flex flex-col gap-4'>
          <img
            src={assets.closeIcon}
            alt="close"
            className='w-6 h-6 cursor-pointer self-end hover:scale-110 transition-transform duration-300'
            onClick={handleClose}
          />
          <h2 className='text-3xl font-semibold text-center mb-4 animate-fadeIn'>Register Movie</h2>

          {/* Movie Info Inputs */}
          {[
            { id: 'name', label: 'Movie Title' },
            { id: 'description', label: 'Description' },
            { id: 'duration', label: 'Duration (e.g., 2h 30m)' },
            { id: 'year', label: 'Release Year' },
            { id: 'rating', label: 'Rating (e.g., 4.5)' },
            { id: 'price', label: 'Ticket Price' },
            { id: 'trailerUrl', label: 'Trailer URL' },
          ].map(f => (
            <div key={f.id} className='flex flex-col'>
              <label htmlFor={f.id} className='text-gray-600 font-medium mb-1'>{f.label}</label>
              <input
                type='text'
                id={f.id}
                name={f.id}
                value={formData[f.id]}
                onChange={handleChange}
                placeholder={`Enter ${f.label}`}
                className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200'
                required
              />
            </div>
          ))}

          {/* City Input */}
          <div>
            <label className='text-gray-600 font-medium mb-1'>City / Location</label>
            <input
              type='text'
              placeholder='Enter city or location'
              value={formData.city}
              onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
              className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200'
              required
            />
          </div>

          {/* Genre Selection */}
          <div>
            <label className='text-gray-600 font-medium mb-1'>Genres</label>
            <div className='grid grid-cols-2 gap-2'>
              {genreOptions.map(genre => (
                <label key={genre} className='flex items-center space-x-2'>
                  <input
                    type="checkbox"
                    checked={formData.genres.includes(genre)}
                    onChange={() => toggleGenre(genre)}
                    className="accent-indigo-500"
                  />
                  <span>{genre}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Poster URL Input */}
          <div>
            <label className='text-gray-600 font-medium mb-1'>Poster URL</label>
            <input
              type='text'
              placeholder='Enter poster image URL'
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200'
              required
            />
          </div>

          {/* Shows Section */}
          <div>
            <label className='text-gray-600 font-medium mb-1'>Shows</label>
            {formData.shows.map((show, index) => (
              <div key={index} className='flex gap-2 items-center mb-2'>
                <input
                  type='date'
                  value={show.showDate}
                  onChange={(e) => handleShowChange(index, 'showDate', e.target.value)}
                  className='border border-gray-300 rounded px-2 py-1 outline-indigo-500'
                  required
                />
                <input
                  type='time'
                  value={show.showTime}
                  onChange={(e) => handleShowChange(index, 'showTime', e.target.value)}
                  className='border border-gray-300 rounded px-2 py-1 outline-indigo-500'
                  required
                />
                {formData.shows.length > 1 && (
                  <button type='button' onClick={() => removeShow(index)} className='text-red-500 font-medium hover:text-red-600 transition-colors'>Remove</button>
                )}
              </div>
            ))}
            <button type='button' onClick={addShow} className='text-indigo-500 font-medium hover:text-indigo-600 transition-colors'>+ Add Show</button>
          </div>

          <button
            type="submit"
            className='bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-lg mt-4 transition-all duration-300 shadow-md hover:shadow-lg'
          >
            Register Movie
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelReg;
