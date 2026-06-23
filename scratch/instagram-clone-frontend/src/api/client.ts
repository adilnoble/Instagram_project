import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // Timeout after 5 seconds
});

// Request Interceptor: Attach authentication token if stored in local storage
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ig_auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Basic error handling formatter
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Return structured error message if API fails
    const message = error.response?.data?.detail || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);
