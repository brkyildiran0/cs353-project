import React, { useState } from 'react';
import api from '../../api/apiClient';

const AddVehicle = () => {
  const [formData, setFormData] = useState({
    make: '',
    year: '',
    mileage: '',
    price: '',
    fuel_type: '',
    transmission: '',
    color: '',
    condition: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.addVehicle(formData);
      setSuccess('Vehicle added successfully!');
      setError('');
      setFormData({
        make: '',
        year: '',
        mileage: '',
        price: '',
        fuel_type: '',
        transmission: '',
        color: '',
        condition: '',
      });
    } catch (err) {
      setError('Failed to add vehicle');
      setSuccess('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-5 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Vehicle</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="make"
          placeholder="Make"
          value={formData.make}
          onChange={handleChange}
          className="w-full mb-2 px-4 py-2 border rounded-md"
        />
        <input
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          className="w-full mb-2 px-4 py-2 border rounded-md"
        />
        <input
          name="mileage"
          placeholder="Mileage"
          value={formData.mileage}
          onChange={handleChange}
          className="w-full mb-2 px-4 py-2 border rounded-md"
        />
        <input
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full mb-2 px-4 py-2 border rounded-md"
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
          Add Vehicle
        </button>
      </form>
    </div>
  );
};

export default AddVehicle;
