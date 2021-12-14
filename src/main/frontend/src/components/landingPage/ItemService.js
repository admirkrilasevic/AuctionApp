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

export const fetchItemsByCategories = async (page, size, sort, direction, categoryIds) => {
  const items = await fetch(`http://${ENVIRONMENT.HOST}/api/v1/items/categories?page=${page}&size=${size}&sort=${sort}&direction=${direction}&categoryIds=${categoryIds}`);
  return items.json();
};

export const fetchItemsByCategoriesAndSubcategories = async (page, size, sort, direction, categoryIds, subcategoryIds) => {
  const items = await fetch(`http://${ENVIRONMENT.HOST}/api/v1/items/categoriesandsubcategories?page=${page}&size=${size}&sort=${sort}&direction=${direction}&categoryIds=${categoryIds}&subcategoryIds=${subcategoryIds}`);
  return items.json();
};

export const fetchFilteredItems = async (page, size, sort, direction, categoryIds, subcategoryIds, minPrice, maxPrice) => {
  const items = await fetch(`http://${ENVIRONMENT.HOST}/api/v1/items/filtered?page=${page}&size=${size}&sort=${sort}&direction=${direction}&categoryIds=${categoryIds}&subcategoryIds=${subcategoryIds}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
  return items.json();
};

export const fetchItemById = async (itemId) => {
  return axios.get(`http://${ENVIRONMENT.HOST}/api/v1/items/${itemId}`)
  .then((res) => {
    return res.data;
  })
};

export const placeBid = async (token, itemId, amount) => {
  return axios.post(`http://${ENVIRONMENT.HOST}/api/v1/bid`, {
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
  return axios.get(`http://${ENVIRONMENT.HOST}/api/v1/categories`)
  .then((res) => {
    return res.data;
  })
};

export const fetchCategoryById = async (categoryId) => {
  return axios.get(`http://${ENVIRONMENT.HOST}/api/v1/categories/${categoryId}`)
  .then((res) => {
    return res.data;
  })
};

export const getMaxPrice = async (itemIds) => {
  return axios.get(`http://${ENVIRONMENT.HOST}/api/v1/items/maxprice?itemIds=${itemIds}`)
  .then((res) => {
    return res.data;
  })
};

export const getMinPrice = async (itemIds) => {
  return axios.get(`http://${ENVIRONMENT.HOST}/api/v1/items/minprice?itemIds=${itemIds}`)
  .then((res) => {
    return res.data;
  })
};
