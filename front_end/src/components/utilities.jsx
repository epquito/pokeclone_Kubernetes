import axios from "axios";

// Create a base Axios instance with the common baseURL
const axiosInstance = axios.create({
  baseURL: "/api/v1/",
});

// Add a request interceptor to include the Authorization header with the token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Use the axiosInstance to create specific API endpoints
export const userApi = {
  post: (url, data) => axiosInstance.post(`user/${url}`, data),
};

export const wildApi = {
  get: (url) => axiosInstance.get(`pokemon/wild/${url}`),
};

export const pokeApi = {
  get: (url) => axiosInstance.get(`pokemon/${url}`),
};

export const teamApi = {
  get: (url) => axiosInstance.get(`team/${url}`),
  post: (url, data) => axiosInstance.post(`team/${url}`, data),
};

export const pokedexApi = {
  get: () => axiosInstance.get(`pokemon/pokedex/`),
};
