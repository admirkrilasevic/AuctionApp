import { ENVIRONMENT } from "../constants";
import axios from "axios";
import { requestHandler } from "./RequestHandler";

let API_URL = "";
if (process.env.REACT_APP_API_URL) {
  API_URL = process.env.REACT_APP_API_URL;
} else {
  API_URL = ENVIRONMENT.HOST;
}

export const fetchItems = async (page, size, sort, direction) => {
  const items = await fetch(`${API_URL}/api/v1/items/search?page=${page}&size=${size}&sort=${sort}&direction=${direction}`);
  return items.json();
};

export const fetchFilteredItems = async (page, size, sort, direction, categoryIds, subcategoryIds, minPrice, maxPrice) => {
  const items = await fetch(`${API_URL}/api/v1/items/filtered?page=${page}&size=${size}&sort=${sort}&direction=${direction}&categoryIds=${categoryIds}&subcategoryIds=${subcategoryIds}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
  return items.json();
};

export const fetchItemById = async (itemId) => {
  return axios.get(`${API_URL}/api/v1/items/${itemId}`)
  .then((res) => {
    return res.data;
  })
};

export const placeBid = async (token, itemId, amount) => {
  return axios.post(`${API_URL}/api/v1/bid`, {
    itemId,
    amount
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
  .then((res) => {
    return res.data;
  })
  .catch((error) => {
    requestHandler(error.response);
  });
};

export const fetchAllCategories = async () => {
  return axios.get(`${API_URL}/api/v1/categories`)
  .then((res) => {
    return res.data;
  })
};

export const fetchCategoryById = async (categoryId) => {
  return axios.get(`${API_URL}/api/v1/categories/${categoryId}`)
  .then((res) => {
    return res.data;
  })
};

export const fetchItemsByUserId = async (userId) => {
  return axios.get(`${API_URL}/api/v1/items/user/${userId}`)
  .then((res) => {
    return res.data;
  })
};

export const fetchItemsByBidUserId = async (userId) => {
  return axios.get(`${API_URL}/api/v1/items/user/bid/${userId}`)
  .then((res) => {
    return res.data;
  })
};

export const fetchAllItems = async () => {
  return axios.get(`${API_URL}/api/v1/items`)
  .then((res) => {
    return res.data;
  })
};
