import axios from "axios";
import { ENVIRONMENT } from "../../constants";

let API_URL = "";
if (process.env.REACT_APP_API_URL) {
  API_URL = `${process.env.REACT_APP_API_URL}/api/v1/auth/`;
} else {
  API_URL = `${ENVIRONMENT.HOST}/api/v1/auth/`;
}

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

const update = (id, name, surname, email, gender, dateOfBirth, phoneNumber) => {
  return axios.put(API_URL + "update", {
    id,
    name,
    surname,
    email,
    gender,
    dateOfBirth,
    phoneNumber
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
  getCurrentUser,
  update
};
