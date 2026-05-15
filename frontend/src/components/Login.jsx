import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config/api';

const Login = ({
  onClose = () => {},
  onSwitch = () => {},
  onLoginSuccess = () => {},
}) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@gmail\.com$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      const res = await axios.post(`${API_BASE_URL}/users/login`, {
        email,
        password,
      });

      const user = res.data;

      localStorage.setItem('user', JSON.stringify(user));
      if (user.role) {
        localStorage.setItem('role', user.role);
      }

      onLoginSuccess(user);
      onClose();

      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/rooms');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/10 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
          ✖
        </button>
        <h2 className="text-2xl font-bold text-center mb-1">Sign in to GoCine</h2>
        <p className="text-center text-sm text-gray-500 mb-4">
          Welcome back! Please sign in to continue
        </p>

        <div className="flex items-center gap-2 mb-4">
          <hr className="flex-1" />
          <span className="text-xs text-gray-500">or</span>
          <hr className="flex-1" />
        </div>

        <label className="block text-sm font-medium mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          className={`w-full border rounded px-3 py-2 ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}

        <label className="block text-sm font-medium mt-4 mb-1">
          Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            className={`w-full border rounded px-3 py-2 pr-10 ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {/* Password toggle icons can remain commented */}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}

        <button
          onClick={handleLogin}
          className="bg-black text-white w-full py-2 rounded mt-5"
        >
          Continue →
        </button>

        <p className="text-xs text-center mt-3">
          Don’t have an account?{' '}
          <span className="text-blue-600 cursor-pointer" onClick={onSwitch}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
