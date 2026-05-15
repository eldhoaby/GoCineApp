import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ onClose, onSwitch }) => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    country: '',
    phoneNumber: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const validate = (field, value) => {
    let message = "";

    switch (field) {
      case 'name':
        if (!value.trim()) message = 'Name is required';
        else if (!/^[A-Za-z ]+$/.test(value)) message = 'Only letters allowed';
        break;
      case 'age':
        if (!value.trim()) message = 'Age is required';
        else if (!/^\d+$/.test(value)) message = 'Only numbers allowed';
        break;
      case 'country':
        if (!value.trim()) message = 'Country is required';
        else if (!/^[A-Za-z ]+$/.test(value)) message = 'Only letters allowed';
        break;
      case 'phoneNumber':
        if (!value.trim()) message = 'Phone number is required';
        else if (!/^\d{10}$/.test(value)) message = 'Must be 10-digit number';
        break;
      case 'email':
        if (!value.trim()) message = 'Email is required';
        else if (!/^\S+@\S+\.\S+$/.test(value)) message = 'Invalid email';
        break;
      case 'password':
        if (!value.trim()) message = 'Password is required';
        else if (value.length < 6) message = 'Min 6 characters required';
        break;
      default:
        break;
    }

    return message;
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    const errorMsg = validate(field, value);
    setErrors(prev => ({ ...prev, [field]: errorMsg }));
  };

  const handleRegister = async (e) => {
    if (e) e.preventDefault(); // Prevent default form submission

    const newErrors = {};
    Object.entries(form).forEach(([field, value]) => {
      const error = validate(field, value);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      console.log('Submitting registration form:', form);

      const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';
      const res = await axios.post(`${baseURL}/users/register`, form);

      console.log('Registration response:', res.data);
      alert(res.data?.message || 'Registration successful!');
      onSwitch(); // Switch to login
    } catch (err) {
      console.error('Registration error:', err);
      alert(err.response?.data?.message || err.message || 'Registration failed');
    }
  };

  const renderInput = (label, field, type, placeholder) => (
    <div className="mb-3">
      <label className="block text-sm font-medium mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full border rounded px-3 py-2 ${
          errors[field] ? 'border-red-500' : 'border-gray-300'
        }`}
        value={form[field]}
        onChange={(e) => handleChange(field, e.target.value)}
      />
      {errors[field] && (
        <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/10 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">✖</button>
        <h2 className="text-2xl font-bold text-center mb-1">Create your account</h2>
        <p className="text-center text-sm text-gray-500 mb-4">
          Welcome! Please fill in the details to get started.
        </p>

        <div className="flex items-center gap-2 mb-4">
          <hr className="flex-1" />
          <span className="text-xs text-gray-500">or</span>
          <hr className="flex-1" />
        </div>

        <form onSubmit={handleRegister}>
          {renderInput('Full Name', 'name', 'text', 'Enter your full name')}
          {renderInput('Age', 'age', 'number', 'Enter your age')}
          {renderInput('Country', 'country', 'text', 'Enter your country')}
          {renderInput('Phone Number', 'phoneNumber', 'text', 'Enter your phone number')}
          {renderInput('Email Address', 'email', 'email', 'Enter your email')}
          {renderInput('Password', 'password', 'password', 'Enter your password')}

          <button
            type="submit"
            className="bg-black text-white w-full py-2 rounded mt-4"
          >
            Continue →
          </button>
        </form>

        <p className="text-xs text-center mt-3">
          Already have an account?{' '}
          <span className="text-blue-600 cursor-pointer" onClick={onSwitch}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
