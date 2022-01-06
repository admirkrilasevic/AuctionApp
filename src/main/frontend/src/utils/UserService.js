import axios from "axios";
import { ENVIRONMENT } from "../constants";

let API_URL = "";
if (process.env.REACT_APP_API_URL) {
  API_URL = `${process.env.REACT_APP_API_URL}/api/v1/auth/`;
} else {
  API_URL = `${ENVIRONMENT.HOST}/api/v1/auth/`;
}

const update = (id, name, surname, email, gender, dateOfBirth, phoneNumber, photo, addressId, street, city, zipCode, state, country) => {
    return axios.put(API_URL + "update", {
      id,
      name,
      surname,
      email,
      gender,
      dateOfBirth,
      phoneNumber,
      photo,
      addressId,
      street,
      city,
      zipCode,
      state,
      country
    });
  };
  
const deactivate = (token) => {
    return axios.put(API_URL + "deactivate", {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
};

export default {
    update, 
    deactivate
};