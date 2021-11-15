import axios from "axios";
import { Redirect } from "react-router";

const API_URL = "http://localhost:8080/api/v1/auth/";

const register = (name, surname, email, password) => {
  return axios.post(API_URL + "register", {
    name,
    surname,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser
};
