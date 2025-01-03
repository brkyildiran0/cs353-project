import React from 'react';
import VehicleList from '../components/Vehicles/VehicleList';

const VehiclesPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-5">Available Vehicles</h1>
      <VehicleList />
    </div>
  );
};

export default VehiclesPage;
