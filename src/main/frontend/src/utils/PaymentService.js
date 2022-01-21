import { ENVIRONMENT } from "../constants";
import axios from "axios";
import { requestHandler } from "./RequestHandler";

let API_URL = "";
if (process.env.REACT_APP_API_URL) {
  API_URL = process.env.REACT_APP_API_URL;
} else {
  API_URL = ENVIRONMENT.HOST;
}

export const processPayment = async (token, amount) => {
    return axios.post(`${API_URL}/api/v1/payment`, {
      amount,
      token
    })
    .then((res) => {
      return true;
    })
    .catch((error) => {
      return false;
    });
};