/// <reference types="vite/client" />

import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token to every request
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// Optional: Handle global responses (e.g., token expiry)
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or unauthorized
      localStorage.removeItem("token");

      // Optional: redirect to login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;
