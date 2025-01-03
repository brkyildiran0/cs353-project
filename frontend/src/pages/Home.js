import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Vehicle Marketplace</h1>
      <Link to="/login" className="text-blue-500 underline mr-4">Login</Link>
      <Link to="/register" className="text-green-500 underline">Register</Link>
    </div>
  );
};

export default Home;
