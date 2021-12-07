import { ENVIRONMENT } from "../../constants";
import axios from "axios";
import { requestHandler } from "./RequestHandler";

export const fetchItems = async (page, size, sort, direction) => {
  const items = await fetch(`http://${ENVIRONMENT.HOST}/api/v1/items/search?page=${page}&size=${size}&sort=${sort}&direction=${direction}`);
  return items.json();
};

export const fetchItemsByCategory = async (page, size, sort, direction, categoryId) => {
  const items = await fetch(`http://${ENVIRONMENT.HOST}/api/v1/items/category/${categoryId}?page=${page}&size=${size}&sort=${sort}&direction=${direction}`);
  return items.json();
};

export const fetchItemById = async (itemId) => {
  return axios
  .get(`http://${ENVIRONMENT.HOST}/api/v1/items/${itemId}`
  )
  .then((res) => {
    return res.data;
  })
};

export const placeBid = async (token, itemId, amount) => {
  return axios
  .post(`http://${ENVIRONMENT.HOST}/api/v1/bid`, {
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
  return axios
  .get(`http://${ENVIRONMENT.HOST}/api/v1/categories`
  )
  .then((res) => {
    return res.data;
  })
};
