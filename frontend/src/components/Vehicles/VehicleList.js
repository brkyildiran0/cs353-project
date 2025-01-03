import React, { useEffect, useState } from 'react';
import api from '../../api/apiClient';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await api.getVehicles();
        setVehicles(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load vehicles');
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-5 p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Vehicle List</h2>
      {vehicles.length === 0 ? (
        <p>No vehicles available</p>
      ) : (
        <ul>
          {vehicles.map((vehicle) => (
            <li key={vehicle.vehicle_id} className="border-b py-2">
              <strong>{vehicle.make}</strong> - {vehicle.year} - ${vehicle.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VehicleList;
