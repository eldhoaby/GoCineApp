import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";

import Login from "./components/Login";
import Register from "./components/Register";

import Home from "./pages/Home";
import MyBookings from "./pages/MyBookings";
import AllRooms from "./pages/AllRooms";
import RoomDetails from "./pages/RoomDetails";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";

// Admin layout with nested routes (Dashboard, Add Room, List Rooms)
import Admin from "./components/hotelOwner/Admin";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null);

  const isAdminPath = location.pathname.startsWith("/admin");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleSwitchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  return (
    <div>
      {/* Show unified NavBar for all routes */}
      <NavBar onLoginClick={() => setShowLogin(true)} user={user} />

      {/* Main content */}
      <div className="min-h-[70vh]">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms setUser={setUser} />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/confirmation" element={<Confirmation />} />

          {/* Auth Routes */}
          <Route
            path="/login"
            element={
              <Login
                onClose={() => navigate("/")}
                onSwitch={handleSwitchToRegister}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                onClose={() => navigate("/")}
                onSwitch={handleSwitchToLogin}
              />
            }
          />

          {/* Admin Layout with nested routes inside Admin.jsx */}
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </div>

      {/* Auth Modals */}
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onSwitch={handleSwitchToRegister}
          onLoginSuccess={(userData) => {
            setUser(userData);
            setShowLogin(false); // ✅ Close login modal

            const role = localStorage.getItem("role");
            if (role === "admin") {
              navigate("/admin");
            } else {
              navigate("/rooms"); // Or "/"
            }
          }}
        />
      )}

      {showRegister && (
        <Register
          onClose={() => setShowRegister(false)}
          onSwitch={handleSwitchToLogin}
        />
      )}

      {/* Footer only for non-admin pages */}
      {/* <Footer /> */}
    </div>
  );
};

export default App;
