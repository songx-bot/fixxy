// frontend/src/utils/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,  // Important: sends cookies automatically
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;