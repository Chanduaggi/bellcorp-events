import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://bellcorp-events-1rjv.onrender.com/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
};

// Events API
export const eventsAPI = {
  getEvents: (params) => api.get('/events', { params }),
  getEventById: (id) => api.get(`/events/${id}`),
  getCategories: () => api.get('/events/meta/categories'),
  getLocations: () => api.get('/events/meta/locations'),
};

// Registrations API
export const registrationsAPI = {
  register: (eventId) => api.post(`/registrations/${eventId}`),
  cancel: (eventId) => api.delete(`/registrations/${eventId}`),
  getMyEvents: () => api.get('/registrations/my-events'),
  checkRegistration: (eventId) => api.get(`/registrations/check/${eventId}`),
};

export default api;
