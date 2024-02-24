import axios from "axios";

// Use the environment variable with Vite's import.meta.env, prefixed with VITE_
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://backend-service.pokeclone.svc.cluster.local:8000";

// Create axios instances for different parts of your API using the base URL
export const userApi = axios.create({
  baseURL: `${API_BASE_URL}/api/v1/user/`,
});

export const wildApi = axios.create({
  baseURL: `${API_BASE_URL}/api/v1/pokemon/wild/`,
});

export const pokeApi = axios.create({
  baseURL: `${API_BASE_URL}/api/v1/pokemon/`,
});

export const teamApi = axios.create({
  baseURL: `${API_BASE_URL}/api/v1/team/`,
});

export const pokedexApi = axios.create({
  baseURL: `${API_BASE_URL}/api/v1/pokemon/pokedex/`,
});
