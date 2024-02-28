import axios from "axios";

export const userApi = axios.create({
  baseURL: "/api/v1/user/"
});

export const wildApi = axios.create({
  baseURL: "/api/v1/pokemon/wild/"
});

export const pokeApi = axios.create({
  baseURL: "api/v1/pokemon/"
});

export const teamApi = axios.create({
  baseURL: "/api/v1/team/"
});

export const pokedexApi = axios.create({
  baseURL: "api/v1/pokemon/pokedex/"
});