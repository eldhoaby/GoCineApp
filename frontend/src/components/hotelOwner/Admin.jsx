import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate, Routes, Route } from 'react-router-dom';
import API_BASE_URL from '../../config/api';

import Sidebar from './Sidebar';
import HotelReg from './HotelReg'; // Keep component name
import ListRooms from './ListRooms'; // Keep component name
import Dashboard from './Dashboard';
import EditRoom from './EditRoom';  // Keep component name

const Admin = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const role = localStorage.getItem('role');
    if (user && role === 'admin') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    axios
      .post(`${API_BASE_URL}/admin/login`, credentials) // Keep API endpoint
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data));
        localStorage.setItem('role', 'admin');
        alert('Login successful!');
        setIsAuthenticated(true);
        navigate('/admin/dashboard');
      })
      .catch((err) => {
        console.error("Login failed:", err.response?.data || err.message);
        alert('Invalid email or password');
      });
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    navigate('/admin');
  };

  if (isAuthenticated) {
    return (
      <div className="flex min-h-screen pt-[80px] bg-gray-50">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md fixed h-full z-10">
          <Sidebar onLogout={handleLogout} /> {/* Pass logout */}
        </div>

        {/* Main content */}
        <div className="ml-64 flex-1 p-6 overflow-auto">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            {/* Add new movie */}
            <Route path="add-room" element={<HotelReg />} /> 
            {/* List all movies */}
            <Route path="list-rooms" element={<ListRooms />} /> 
            {/* Edit movie details */}
            <Route path="edit-room/:id" element={<EditRoom />} /> 
          </Routes>
        </div>
      </div>
    );
  }

  // Login screen
  return (
    <div style={{ marginTop: '100px', padding: '20px' }}>
      <Typography variant="h4" style={{ marginBottom: '2em' }}>
        Admin Login - Movie Booking
      </Typography>

      <TextField
        label="Email"
        name="email"
        fullWidth
        value={credentials.email}
        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        style={{ marginBottom: '1em' }}
        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
      />

      <TextField
        label="Password"
        type="password"
        name="password"
        fullWidth
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        style={{ marginBottom: '2em' }}
        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
      />

      <Button
        variant="contained"
        onClick={handleLogin}
        fullWidth
        style={{ padding: '10px', fontSize: '16px' }}
      >
        Login
      </Button>
    </div>
  );
};

export default Admin;
