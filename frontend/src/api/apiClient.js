import axios from 'axios';

// Base URL Configuration
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend API URL
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // 5 seconds timeout
});

// Attach JWT Token to Requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Handle API Responses
apiClient.interceptors.response.use(
  (response) => {
    return response.data; // Return only the data from the response
  },
  (error) => {
    if (error.response) {
      // Backend responded with an error
      console.error('Response Error:', error.response.data.message || error.response.statusText);

      // Handle Unauthorized Access (e.g., Token Expired)
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }

      return Promise.reject(error.response.data || error.response.statusText);
    } else if (error.request) {
      // Request was made but no response was received
      console.error('No Response:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// API Endpoints (Reusable Functions)
const api = {
  // Auth Endpoints
  login: (credentials) => apiClient.post('/auth/login', credentials),
  register: (credentials) => apiClient.post('/auth/register', credentials),

  // Vehicle Endpoints
  getVehicles: () => apiClient.get('/vehicles'),
  addVehicle: (vehicleData) => apiClient.post('/vehicles', vehicleData),

  // Listing Endpoints
  getListings: () => apiClient.get('/listings'),
  addListing: (listingData) => apiClient.post('/listings', listingData),

  // User Endpoints
  getUserProfile: () => apiClient.get('/user/profile'),
  updateUserProfile: (userData) => apiClient.put('/user/profile', userData),

  // Message Endpoints
  sendMessage: (messageData) => apiClient.post('/messages', messageData),
  getMessages: (conversationId) => apiClient.get(`/messages/${conversationId}`),
};

export default api;
