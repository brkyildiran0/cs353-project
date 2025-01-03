import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/apiClient';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    forename: '',
    surname: '',
    notification_preference: 'yes',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.register(formData);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleRegister}>
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" placeholder="Password" onChange={handleChange} />
        <input name="forename" placeholder="Forename" onChange={handleChange} />
        <input name="surname" placeholder="Surname" onChange={handleChange} />
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
