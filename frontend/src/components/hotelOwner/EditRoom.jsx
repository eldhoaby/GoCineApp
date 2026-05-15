// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import { assets } from '../../assets/assets';

// const showTypes = ['2D', '3D', 'IMAX', '4DX'];

// const EditRoom = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();  // movie id from URL param

//   const [formData, setFormData] = useState({
//     name: '',           // Movie Title
//     city: '',           // Theatre City
//     address: '',        // Theatre Address
//     phoneNumber: '',    // Theatre Phone
//     amenities: [],      // Optional: Movie Features (like Subtitles, Snacks)
//     price: '',          // Ticket Price
//     rating: '',         // Movie Rating
//     reviewsCount: '',   // Reviews Count
//     roomType: '',       // Show Type (2D/3D/IMAX)
//     imageSources: ['', '', '', ''] // Poster URLs
//   });

//   const [loading, setLoading] = useState(true);

//   // Fetch movie data on mount
//   useEffect(() => {
//     const fetchRoom = async () => {
//       try {
//         const res = await axios.get(`http://localhost:3000/rooms/${id}`);
//         const room = res.data;

//         setFormData({
//           name: room.name || '',
//           city: room.city || '',
//           address: room.address || '',
//           phoneNumber: room.phoneNumber || '',
//           amenities: room.amenities || [],
//           price: room.price?.toString() || '',
//           rating: room.rating?.toString() || '',
//           reviewsCount: room.reviewsCount?.toString() || '',
//           roomType: room.roomType || '',
//           imageSources: (room.images && room.images.length > 0)
//             ? [...room.images, '', '', '', ''].slice(0, 4) 
//             : ['', '', '', '']
//         });
//       } catch (error) {
//         console.error("Error fetching movie:", error);
//         alert("Failed to load movie data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRoom();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleAmenityToggle = (amenity) => {
//     setFormData((prev) => ({
//       ...prev,
//       amenities: prev.amenities.includes(amenity)
//         ? prev.amenities.filter((a) => a !== amenity)
//         : [...prev.amenities, amenity]
//     }));
//   };

//   const handleImageURLChange = (index, value) => {
//     const updated = [...formData.imageSources];
//     updated[index] = value;
//     setFormData(prev => ({ ...prev, imageSources: updated }));
//   };

//   const handleClose = () => navigate('/admin/list-rooms');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const dataToSend = {
//       ...formData,
//       price: Number(formData.price),
//       rating: Number(formData.rating),
//       reviewsCount: Number(formData.reviewsCount),
//       images: formData.imageSources.filter(Boolean)
//     };

//     try {
//       await axios.put(`http://localhost:3000/rooms/${id}`, dataToSend);
//       alert("Movie updated successfully!");
//       navigate("/admin/list-rooms");
//     } catch (error) {
//       console.error("Error updating movie:", error);
//       alert("Error updating movie");
//     }
//   };

//   if (loading) {
//     return <div className="p-8 text-center">Loading movie details...</div>;
//   }

//   return (
//     <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/70 z-50 flex justify-center items-center overflow-y-auto'>
//       <form
//         onSubmit={handleSubmit}
//         className='flex bg-white rounded-xl max-w-4xl w-full mx-4 my-10 md:my-20 overflow-y-auto max-h-[90vh]'
//       >
//         <img src={assets.regImage} alt="reg" className='w-1/2 hidden md:block object-cover rounded-l-xl' />

//         <div className='relative flex flex-col md:w-1/2 p-8 overflow-y-auto'>
//           <img
//             src={assets.closeIcon}
//             alt="close"
//             className='absolute top-4 right-4 w-5 h-5 cursor-pointer'
//             onClick={handleClose}
//           />
//           <p className='text-2xl font-semibold mt-6 mb-4 text-center'>Edit Movie Details</p>

//           {/* Fields */}
//           {[
//             { id: 'name', label: 'Movie Title' },
//             { id: 'phoneNumber', label: 'Theatre Phone Number' },
//             { id: 'address', label: 'Theatre Address' },
//             { id: 'city', label: 'Theatre City' },
//             { id: 'price', label: 'Ticket Price' },
//             { id: 'rating', label: 'Movie Rating (e.g. 4.5)' },
//             { id: 'reviewsCount', label: 'Reviews Count' }
//           ].map((f) => (
//             <div className='w-full mt-3' key={f.id}>
//               <label htmlFor={f.id} className='text-sm text-gray-600 font-medium'>{f.label}</label>
//               <input
//                 id={f.id}
//                 name={f.id}
//                 type='text'
//                 placeholder='Type here...'
//                 value={formData[f.id]}
//                 onChange={handleChange}
//                 className='border border-gray-300 rounded w-full px-3 py-2 mt-1 outline-indigo-500 font-light focus:ring focus:ring-indigo-200'
//                 required
//               />
//             </div>
//           ))}

//           {/* Show Type */}
//           <div className='w-full mt-4'>
//             <label htmlFor="roomType" className="text-sm text-gray-600 font-medium">Show Type</label>
//             <select
//               id="roomType"
//               name="roomType"
//               value={formData.roomType}
//               onChange={handleChange}
//               className="border border-gray-300 rounded w-full px-3 py-2 mt-1 outline-indigo-500 font-light focus:ring focus:ring-indigo-200"
//               required
//             >
//               <option value="">Select Show Type</option>
//               {showTypes.map(type => (
//                 <option key={type} value={type}>{type}</option>
//               ))}
//             </select>
//           </div>

//           {/* Features / Amenities */}
//           <div className='w-full mt-6'>
//             <label className="text-sm text-gray-600 font-medium">Features</label>
//             <div className='grid grid-cols-2 gap-2 mt-2'>
//               {['Subtitles', 'Snacks', '3D Glasses', 'Dolby Sound'].map((a) => (
//                 <label key={a} className='flex items-center space-x-2 text-sm'>
//                   <input
//                     type="checkbox"
//                     checked={formData.amenities.includes(a)}
//                     onChange={() => handleAmenityToggle(a)}
//                     className="accent-indigo-500"
//                   />
//                   <span>{a}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Poster URLs */}
//           <div className='w-full mt-6'>
//             <label className='text-sm text-gray-600 font-medium'>Movie Posters (URLs Only)</label>
//             {formData.imageSources.map((src, index) => (
//               <div key={index} className='mt-3'>
//                 <input
//                   type="text"
//                   placeholder={`Poster URL ${index + 1}`}
//                   value={src}
//                   onChange={(e) => handleImageURLChange(index, e.target.value)}
//                   className="border border-gray-300 rounded w-full px-3 py-2 outline-indigo-500 font-light focus:ring focus:ring-indigo-200"
//                 />
//                 {src?.trim() && (
//                   <div className="mt-2 border rounded overflow-hidden">
//                     <img
//                       src={src}
//                       alt={`Preview ${index + 1}`}
//                       className="h-32 w-full object-cover"
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
//                       }}
//                     />
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className='bg-indigo-500 hover:bg-indigo-600 transition-all text-white font-medium px-6 py-2 rounded mt-6 self-start'
//           >
//             Update Movie
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditRoom;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { assets } from '../../assets/assets';

const genreOptions = ['Action', 'Adventure', 'Comedy', 'Crime', 'Drama', 'Family','Fantasy','Horror','Romance','Sci-Fi','Thriller'];

const EditRoom = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // movie id

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    genres: [],
    year: '',
    rating: '',
    price: '',
    trailerUrl: '',
    image: '', // single poster
    city: '',
    shows: [{ showDate: '', showTime: '' }]
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/rooms/${id}`);
        const room = res.data;

        setFormData({
          name: room.name || '',
          description: room.description || '',
          duration: room.duration || '',
          genres: room.genres || [],
          year: room.year?.toString() || '',
          rating: room.rating?.toString() || '',
          price: room.price?.toString() || '',
          trailerUrl: room.trailerUrl || '',
          image: room.images && room.images.length > 0 ? room.images[0] : '',
          city: room.city || '',
          shows: room.shows.length > 0 ? room.shows.map(s => ({ showDate: s.showDate, showTime: s.showTime })) : [{ showDate: '', showTime: '' }]
        });
      } catch (err) {
        console.error(err);
        alert('Failed to load movie data');
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

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

  const handleClose = () => navigate('/admin/list-rooms');

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
        images: [formData.image],
        shows: showsWithSeats
      };

      await axios.put(`http://localhost:3000/rooms/${id}`, dataToSend);
      alert("Movie updated successfully!");
      navigate("/admin/list-rooms");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Error updating movie. Check console.");
    }
  };

  if (loading) return <div className="p-8 text-center">Loading movie details...</div>;

  return (
    <div className='fixed inset-0 bg-black/70 z-50 flex justify-center items-center overflow-y-auto'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col md:flex-row bg-white rounded-2xl max-w-5xl w-full mx-4 my-10 md:my-20 overflow-y-auto max-h-[90vh] shadow-xl'
      >
        {/* Left Static Image
        <div className='md:w-1/2 relative'>
          <img
            src={assets.regImage}
            alt="Poster Preview"
            className='w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none'
          />
        </div> */}
        <div className='md:w-1/2 relative'>
  <img
    src="https://image.tmdb.org/t/p/original/z53D72EAOxGRqdr7KXXWp9dJiDe.jpg"   // Replace with the web URL
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
          <h2 className='text-3xl font-semibold text-center mb-4'>Edit Movie</h2>

          {/* Text Inputs */}
          {['name', 'description', 'duration', 'year', 'rating', 'price', 'trailerUrl', 'city'].map(f => (
            <div key={f} className='flex flex-col'>
              <label className='text-gray-600 font-medium mb-1'>{f === 'city' ? 'City / Location' : f.charAt(0).toUpperCase() + f.slice(1)}</label>
              <input
                type='text'
                name={f}
                value={formData[f]}
                onChange={handleChange}
                placeholder={`Enter ${f}`}
                className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200'
                required
              />
            </div>
          ))}

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

          {/* Poster URL */}
          <div>
            <label className='text-gray-600 font-medium mb-1'>Poster URL</label>
            <input
              type='text'
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              placeholder='Enter poster image URL'
              className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200'
              required
            />
          </div>

          {/* Shows */}
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
            Update Movie
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRoom;
