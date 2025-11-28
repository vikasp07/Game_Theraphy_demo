import axios from "axios";

// const API_URL = "http://localhost:5000/api/auth";
const API_URL = "http://localhost:5000/api/auth";

// Axios interceptor to add token to all requests
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");
  
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  if (userRole) {
    config.headers["x-user-role"] = userRole;
  }
  
  return config;
});

export const registerUser = async (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

export const loginUser = async (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};

export const getDemoUser = (role = "player") => {
  const users = {
    player: {
      _id: "67b01d7596d45b9e9566d3cf",
      name: "vikasss",
      email: "vikasss@gmail.com",
      role: "player",
      guardian: "67b01cae96d45b9e9566d3c5",
    },
    doctor: {
      _id: "67a5c7598becf8fd6cdc8339",
      name: "bigbulll",
      email: "bigbull@gmail.com",
      role: "doctor",
    },
    guardian: {
      _id: "67b01cae96d45b9e9566d3c5",
      name: "vikass",
      email: "vikass@gmail.com",
      role: "guardian",
      guardian: null,
    },
  };
  return users[role] || users.player;
};
