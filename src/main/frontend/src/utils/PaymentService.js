import { ENVIRONMENT } from "../constants";
import axios from "axios";

let API_URL = "";
if (process.env.REACT_APP_API_URL) {
  API_URL = process.env.REACT_APP_API_URL;
} else {
  API_URL = ENVIRONMENT.HOST;
}

export const processPayment = async (token, itemId, amount, paymentMethod) => {
    return axios.post(`${API_URL}/api/v1/payment`, {
      itemId,
      amount,
      paymentMethod
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      return res.data;
    });
};