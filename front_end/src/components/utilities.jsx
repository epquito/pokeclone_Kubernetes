import axios from "axios";

// Set to http://<minikube-ip>:<nodePort>
const url = "http://192.168.49.2:30001"

export const userApi = axios.create({
    baseURL: `${url}/api/v1/user/`,
  });

export const wildApi = axios.create({
  baseURL: `${url}/api/v1/pokemon/wild/`,
});

export const pokeApi = axios.create({
  baseURL: `${url}/api/v1/pokemon/`,
});

export const teamApi = axios.create({
  baseURL: `${url}/api/v1/team/`,
});

export const pokedexApi = axios.create({
  baseURL: `${url}/api/v1/pokemon/pokedex/`,
});