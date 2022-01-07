import axios from "axios";
import { ENVIRONMENT } from "../constants";

let API_URL = "";
if (process.env.REACT_APP_API_URL) {
  API_URL = `${process.env.REACT_APP_API_URL}/api/v1/user/`;
} else {
  API_URL = `${ENVIRONMENT.HOST}/api/v1/user/`;
}

const update = (id, name, surname, email, gender, dateOfBirth, phoneNumber, photo, addressId, street, city, zipCode, state, country, token) => {
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
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      localStorage.setItem("updatedUser", JSON.stringify(response.data));
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
