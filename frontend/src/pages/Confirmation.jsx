// // 

// import React, { useRef } from "react";
// import { useLocation, Link } from "react-router-dom";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// const Confirmation = () => {
//   const location = useLocation();
//   const { booking } = location.state || {};
//   const pdfRef = useRef();

//   if (!booking || !booking._id) {
//     return (
//       <div className="min-h-screen flex justify-center items-center bg-gray-100">
//         <p className="text-xl text-red-600">No booking found.</p>
//       </div>
//     );
//   }

//   const { room = {}, guests, totalPrice, selectedSeats, isPaid, showDate, showtime } = booking;

//   // Helper to format show date & time
//   const formatShowDateTime = (date, time) => {
//     if (!date || !time) return "N/A";

//     const [hour24, minute] = time.split(":").map(Number);
//     const dt = new Date(date);
//     dt.setHours(hour24, minute);

//     const dateStr = dt.toLocaleDateString(undefined, {
//       weekday: "long",
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });

//     const timeStr = dt.toLocaleTimeString(undefined, {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });

//     return `${dateStr} - ${timeStr}`;
//   };


//   const handleDownload = async () => {
//   if (!pdfRef.current) return;

//   const element = pdfRef.current;

//   // Convert the div to canvas
//   const canvas = await html2canvas(element, { scale: 2 });
//   const imgData = canvas.toDataURL("image/png");

//   const pdf = new jsPDF("p", "pt", "a4");
//   const imgProps = pdf.getImageProperties(imgData);
//   const pdfWidth = pdf.internal.pageSize.getWidth();
//   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//   pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//   pdf.save("GoCine-Ticket.pdf");
// };



//   // const handleDownload = () => {
//   //   const doc = new jsPDF("p", "pt", "a4");
//   //   doc.setFontSize(18);
//   //   doc.setTextColor(30, 30, 120);
//   //   doc.text("🎟️ GoCine Ticket", 40, 40);

//   //   doc.setFontSize(14);
//   //   doc.setTextColor(0, 0, 0);
//   //   doc.text(`Movie: ${room.name || "N/A"}`, 40, 70);
//   //   doc.text(`Seats: ${selectedSeats?.map(s => s.row + s.number).join(", ") || "N/A"}`, 40, 90);
//   //   doc.text(`Number of Tickets: ${guests}`, 40, 110);
//   //   doc.text(`Show: ${formatShowDateTime(showDate, showtime)}`, 40, 130);
//   //   doc.text(`Total Paid: ₹${totalPrice}`, 40, 150);
//   //   doc.text(`Status: ${isPaid ? "Paid ✅" : "Unpaid ❌"}`, 40, 170);

//   //   doc.save("GoCine-Ticket.pdf");
//   // };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 flex flex-col items-center px-4 pt-28 pb-16">
//       <div
//         ref={pdfRef}
//         className="bg-white shadow-2xl rounded-2xl w-full max-w-md border border-gray-200 relative overflow-hidden"
//       >
//         <div className="bg-blue-700 text-white text-center py-4">
//           <h1 className="text-2xl font-bold">🎟️ GoCine</h1>
//           <p className="text-sm mt-1">Booking Confirmation</p>
//         </div>

//         <div className="p-6 space-y-3 text-gray-800">
//           <p><strong>Movie:</strong> {room.name}</p>
//           <p><strong>Seats:</strong> {selectedSeats?.map(s => s.row + s.number).join(", ")}</p>
//           <p><strong>Number of Tickets:</strong> {guests}</p>
//           <p><strong>Show:</strong> {formatShowDateTime(showDate, showtime)}</p>
//           <p><strong>Total Paid:</strong> ₹{totalPrice}</p>
//           <p><strong>Status:</strong> {isPaid ? "Paid ✅" : "Unpaid ❌"}</p>
//         </div>

//         <div className="border-t border-dashed border-gray-300 mt-3"></div>

//         <div className="text-center py-4">
//           <button
//             onClick={handleDownload}
//             className="px-6 py-2 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-800 transition-all"
//           >
//             Download Ticket PDF
//           </button>
//         </div>
//       </div>

//       <p className="mt-6 text-gray-700 text-center">
//         Go back to <Link to="/rooms" className="text-blue-600 underline hover:text-blue-800">Movies</Link> page
//       </p>
//     </div>
//   );
// };
// export default Confirmation;
// 








// import React, { useRef } from "react";
// import { useLocation, Link } from "react-router-dom";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import QRCode from "react-qr-code";

// const Confirmation = () => {
//   const location = useLocation();
//   const { booking } = location.state || {};
//   const pdfRef = useRef();

//   if (!booking || !booking._id) {
//     return (
//       <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#eff6ff" }}>
//         <p style={{ fontSize: "1.25rem", color: "#dc2626" }}>No booking found.</p>
//       </div>
//     );
//   }

//   const { room = {}, guests, totalPrice, selectedSeats, isPaid, showDate, showtime } = booking;

//   // Format show date & time
//   const formatShowDateTime = (date, time) => {
//     if (!date || !time) return { dateStr: "N/A", timeStr: "N/A" };

//     const [hour24, minute] = time.split(":").map(Number);
//     const dt = new Date(date);
//     dt.setHours(hour24, minute);

//     const dateStr = dt.toLocaleDateString(undefined, {
//       weekday: "long",
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });

//     const timeStr = dt.toLocaleTimeString(undefined, {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });

//     return { dateStr, timeStr };
//   };

//   const { dateStr, timeStr } = formatShowDateTime(showDate, showtime);

//   // Download PDF
//   const handleDownload = async () => {
//     try {
//       if (!pdfRef.current) return;
//       const element = pdfRef.current;

//       const canvas = await html2canvas(element, {
//         scale: 3,
//         useCORS: true,
//         backgroundColor: "#ffffff",
//       });
//       const imgData = canvas.toDataURL("image/png");

//       const pdf = new jsPDF("p", "pt", "a4");
//       const imgProps = pdf.getImageProperties(imgData);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//       pdf.save("GoCine-Ticket.pdf");
//     } catch (error) {
//       console.error("PDF download error:", error);
//     }
//   };

//   return (
//     <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", padding: "7rem 1rem 4rem 1rem", background: "linear-gradient(135deg, #dbeafe, #d1fae5)" }}>
//       {/* Ticket Card */}
//       <div
//         ref={pdfRef}
//         style={{
//           backgroundColor: "#ffffff",
//           boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
//           borderRadius: "16px",
//           border: "1px solid #e5e7eb",
//           width: "100%",
//           maxWidth: "400px",
//           padding: "24px",
//         }}
//       >
//         {/* Header */}
//         <div style={{ backgroundColor: "#1e40af", color: "#ffffff", textAlign: "center", padding: "16px", borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}>
//           <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>🎟️ GoCine</h1>
//           <p style={{ fontSize: "0.875rem", marginTop: "4px" }}>Booking Confirmation</p>
//         </div>

//         {/* Ticket Details */}
//         <div style={{ marginTop: "16px", color: "#1f2937", display: "flex", flexDirection: "column", gap: "8px" }}>
//           <p><strong>Movie:</strong> {room.name}</p>
//           <p><strong>Seats:</strong> {selectedSeats?.map(s => s.row + s.number).join(", ")}</p>
//           <p><strong>Number of Tickets:</strong> {guests}</p>
//           <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//             <strong>Show:</strong>
//             <span style={{ backgroundColor: "#e5e7eb", borderRadius: "6px", padding: "4px 8px" }}>{dateStr}</span>
//             <span style={{ backgroundColor: "#e5e7eb", borderRadius: "6px", padding: "4px 8px" }}>{timeStr}</span>
//           </div>
//           <p><strong>Total Paid:</strong> ₹{totalPrice}</p>
//           <p><strong>Status:</strong> {isPaid ? "Paid ✅" : "Unpaid ❌"}</p>
//         </div>

//         {/* QR Code */}
//         <div style={{ textAlign: "center", marginTop: "24px" }}>
//           <QRCode
//             value={`BookingID:${booking._id}-Movie:${room.name}-Seats:${selectedSeats?.map(s => s.row + s.number).join(",")}`}
//             size={100}
//           />
//           <p style={{ fontSize: "0.75rem", marginTop: "4px", color: "#6b7280" }}>Scan for verification</p>
//         </div>

//         {/* Download Button */}
//         <div style={{ textAlign: "center", marginTop: "24px" }}>
//           <button
//             onClick={handleDownload}
//             style={{ padding: "8px 24px", backgroundColor: "#1e40af", color: "#ffffff", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
//           >
//             Download Ticket PDF
//           </button>
//         </div>
//       </div>

//       {/* Back Link */}
//       <p style={{ marginTop: "24px", color: "#374151", textAlign: "center" }}>
//         Go back to <Link to="/rooms" style={{ color: "#1d4ed8", textDecoration: "underline" }}>Movies</Link> page
//       </p>
//     </div>
//   );
// };

// export default Confirmation;






// import React, { useRef } from "react";
// import { useLocation, Link } from "react-router-dom";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import QRCode from "react-qr-code";

// const Confirmation = () => {
//   const location = useLocation();
//   const { booking } = location.state || {};
//   const pdfRef = useRef();

//   if (!booking || !booking._id) {
//     return (
//       <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#eff6ff" }}>
//         <p style={{ fontSize: "1.25rem", color: "#dc2626" }}>No booking found.</p>
//       </div>
//     );
//   }

//   const { room = {}, guests, totalPrice, selectedSeats, isPaid, showDate, showtime } = booking;

//   const formatShowDateTime = (date, time) => {
//     if (!date || !time) return { dateStr: "N/A", timeStr: "N/A" };

//     const [hour24, minute] = time.split(":").map(Number);
//     const dt = new Date(date);
//     dt.setHours(hour24, minute);

//     const dateStr = dt.toLocaleDateString(undefined, {
//       weekday: "long",
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });

//     const timeStr = dt.toLocaleTimeString(undefined, {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });

//     return { dateStr, timeStr };
//   };

//   const { dateStr, timeStr } = formatShowDateTime(showDate, showtime);

//   const handleDownload = async () => {
//     try {
//       if (!pdfRef.current) return;
//       const element = pdfRef.current;

//       const canvas = await html2canvas(element, {
//         scale: 3,
//         useCORS: true,
//         backgroundColor: "#ffffff",
//       });
//       const imgData = canvas.toDataURL("image/png");

//       const pdf = new jsPDF("p", "pt", "a4");
//       const imgProps = pdf.getImageProperties(imgData);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//       pdf.save("GoCine-Ticket.pdf");
//     } catch (error) {
//       console.error("PDF download error:", error);
//     }
//   };

//   return (
//     <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", padding: "7rem 1rem 4rem 1rem", background: "linear-gradient(135deg, #dbeafe, #d1fae5)" }}>
//       {/* Ticket Card */}
//       <div
//         ref={pdfRef}
//         style={{
//           backgroundColor: "#ffffff",
//           width: "100%",
//           maxWidth: "400px",
//           borderRadius: "16px",
//           overflow: "hidden",
//           border: "1px solid #e5e7eb",
//           boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
//         }}
//       >
//         {/* Colored Header */}
//         <div style={{ backgroundColor: "#1e40af", padding: "16px", color: "#ffffff", textAlign: "center" }}>
//           <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>🎟️ GoCine</h1>
//           <p style={{ fontSize: "0.875rem", marginTop: "4px" }}>Booking Confirmation</p>
//         </div>

//         {/* Ticket Info */}
//         <div style={{ display: "flex", padding: "16px", gap: "16px" }}>
//           {/* Left Info */}
//           <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: "8px", color: "#1f2937" }}>
//             <p><strong>Movie:</strong> {room.name}</p>
//             <p><strong>Seats:</strong> {selectedSeats?.map(s => s.row + s.number).join(", ")}</p>
//             <p><strong>Tickets:</strong> {guests}</p>
//             <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
//               <strong>Show:</strong>
//               <span style={{ backgroundColor: "#e5e7eb", borderRadius: "6px", padding: "4px 8px" }}>{dateStr}</span>
//               <span style={{ backgroundColor: "#e5e7eb", borderRadius: "6px", padding: "4px 8px" }}>{timeStr}</span>
//             </div>
//             <p><strong>Total Paid:</strong> ₹{totalPrice}</p>
//             <p><strong>Status:</strong> {isPaid ? "Paid ✅" : "Unpaid ❌"}</p>
//           </div>

//           {/* QR Code on Right */}
//           <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
//             <QRCode
//               value={`BookingID:${booking._id}-Movie:${room.name}-Seats:${selectedSeats?.map(s => s.row + s.number).join(",")}`}
//               size={100}
//             />
//           </div>
//         </div>

//         {/* Dashed Cut Line */}
//         <div style={{ borderTop: "2px dashed #9ca3af", margin: "0 16px" }}></div>

//         {/* Footer */}
//         <div style={{ backgroundColor: "#1e3a8a", padding: "12px", color: "#ffffff", textAlign: "center" }}>
//           <p style={{ margin: 0, fontSize: "0.875rem" }}>Scan the QR code at entry</p>
//         </div>

//         {/* Download Button */}
//         <div style={{ textAlign: "center", padding: "16px" }}>
//           <button
//             onClick={handleDownload}
//             style={{ padding: "8px 24px", backgroundColor: "#1e40af", color: "#ffffff", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
//           >
//             Download Ticket PDF
//           </button>
//         </div>
//       </div>

//       {/* Back Link */}
//       <p style={{ marginTop: "24px", color: "#374151", textAlign: "center" }}>
//         Go back to <Link to="/rooms" style={{ color: "#1d4ed8", textDecoration: "underline" }}>Movies</Link> page
//       </p>
//     </div>
//   );
// };

// export default Confirmation;











import React, { useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import QRCode from "react-qr-code";
import { FaFilm, FaChair, FaCalendarAlt, FaClock, FaTicketAlt } from "react-icons/fa";

const Confirmation = () => {
  const location = useLocation();
  const { booking } = location.state || {};
  const pdfRef = useRef();

  if (!booking || !booking._id) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#eff6ff" }}>
        <p style={{ fontSize: "1.25rem", color: "#dc2626" }}>No booking found.</p>
      </div>
    );
  }

  const { room = {}, guests, totalPrice, selectedSeats, isPaid, showDate, showtime } = booking;

  const formatShowDateTime = (date, time) => {
    if (!date || !time) return { dateStr: "N/A", timeStr: "N/A" };

    const [hour24, minute] = time.split(":").map(Number);
    const dt = new Date(date);
    dt.setHours(hour24, minute);

    const dateStr = dt.toLocaleDateString(undefined, {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const timeStr = dt.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return { dateStr, timeStr };
  };

  const { dateStr, timeStr } = formatShowDateTime(showDate, showtime);

  const handleDownload = async () => {
    try {
      if (!pdfRef.current) return;
      const element = pdfRef.current;

      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "pt", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("GoCine-Ticket.pdf");
    } catch (error) {
      console.error("PDF download error:", error);
    }
  };

  const pillStyle = {
    backgroundColor: "#f3f4f6",
    borderRadius: "12px",
    padding: "4px 10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "0.875rem",
    fontWeight: "500",
  };

  const seatStyle = {
    display: "inline-block",
    width: "28px",
    height: "28px",
    margin: "2px",
    borderRadius: "6px",
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    fontSize: "0.75rem",
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: "28px",
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", padding: "7rem 1rem 4rem 1rem", background: "linear-gradient(135deg, #dbeafe, #d1fae5)" }}>
      {/* Ticket Card */}
      <div
        ref={pdfRef}
        style={{
          backgroundColor: "#ffffff",
          width: "100%",
          maxWidth: "450px",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid #e5e7eb",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        }}
      >
        {/* Header */}
        <div style={{ backgroundColor: "#1e40af", padding: "16px", color: "#ffffff", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>🎟️ GoCine</h1>
          <p style={{ fontSize: "0.875rem", marginTop: "4px" }}>Booking Confirmation</p>
        </div>

        {/* Ticket Info */}
        <div style={{ display: "flex", padding: "16px", gap: "16px" }}>
          {/* Left Info */}
          <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: "10px", color: "#1f2937" }}>
            <p style={{ display: "flex", alignItems: "center", gap: "6px" }}><FaFilm color="#1e40af" /> <strong>Movie:</strong> {room.name}</p>
            <p style={{ display: "flex", alignItems: "center", gap: "6px" }}><FaTicketAlt color="#1e40af" /> <strong>Tickets:</strong> {guests}</p>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <FaCalendarAlt color="#1e40af" /> 
              <span style={pillStyle}>{dateStr}</span>
              <FaClock color="#1e40af" />
              <span style={pillStyle}>{timeStr}</span>
            </div>
            <p><strong>Total Paid:</strong> ₹{totalPrice}</p>
            <p><strong>Status:</strong> {isPaid ? "Paid ✅" : "Unpaid ❌"}</p>

            {/* Seat layout */}
            <div>
              <strong>Seats:</strong>
              <div style={{ display: "flex", flexWrap: "wrap", marginTop: "4px" }}>
                {selectedSeats?.map((s, idx) => (
                  <div key={idx} style={seatStyle}>{s.row}{s.number}</div>
                ))}
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <QRCode
              value={`BookingID:${booking._id}-Movie:${room.name}-Seats:${selectedSeats?.map(s => s.row + s.number).join(",")}`}
              size={100}
            />
          </div>
        </div>

        {/* Dashed Line */}
        <div style={{ borderTop: "2px dashed #9ca3af", margin: "0 16px" }}></div>

        {/* Footer */}
        <div style={{ backgroundColor: "#1e3a8a", padding: "12px", color: "#ffffff", textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: "0.875rem" }}>Scan the QR code at entry</p>
        </div>

        {/* Download Button */}
        <div style={{ textAlign: "center", padding: "16px" }}>
          <button
            onClick={handleDownload}
            style={{ padding: "8px 24px", backgroundColor: "#1e40af", color: "#ffffff", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
          >
            Download Ticket PDF
          </button>
        </div>
      </div>

      {/* Back Link */}
      <p style={{ marginTop: "24px", color: "#374151", textAlign: "center" }}>
        Go back to <Link to="/rooms" style={{ color: "#1d4ed8", textDecoration: "underline" }}>Movies</Link> page
      </p>
    </div>
  );
};

export default Confirmation;
