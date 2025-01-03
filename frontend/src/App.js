import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import VehiclesPage from './pages/VehiclesPage';
import AddVehiclePage from './pages/AddVehiclePage';

// Role-based Access Control Wrapper
const ProtectedRoute = ({ element, allowedRole }) => {
  const userRole = localStorage.getItem('role');
  return userRole === allowedRole ? element : <Navigate to="/login" />;
};

function App() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to={role === 'admin' ? '/admin-dashboard' : '/dashboard'} />}
        />
        <Route
          path="/register"
          element={!token ? <Register /> : <Navigate to={role === 'admin' ? '/admin-dashboard' : '/dashboard'} />}
        />

        {/* Admin Routes */}
        <Route
          path="/admin-dashboard"
          element={<ProtectedRoute element={<AdminDashboard />} allowedRole="admin" />}
        />

        {/* User Routes */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} allowedRole="user" />}
        />
        <Route
          path="/vehicles"
          element={<ProtectedRoute element={<VehiclesPage />} allowedRole="user" />}
        />
        <Route
          path="/add-vehicle"
          element={<ProtectedRoute element={<AddVehiclePage />} allowedRole="user" />}
        />

        {/* Catch-All Route */}
        <Route path="*" element={<Navigate to={token ? (role === 'admin' ? '/admin-dashboard' : '/dashboard') : '/login'} />} />
      </Routes>
    </Router>
  );
}

export default App;
