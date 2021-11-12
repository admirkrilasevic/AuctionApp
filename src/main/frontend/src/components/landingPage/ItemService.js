import * as Constants from "../../constants";

export const fetchItems = async (page, size, sort, direction) => {
  const items = await fetch(`http://${Constants.ENVIRONMENT.HOST}/api/v1/items/search?page=${page}&size=${size}&sort=${sort}&direction=${direction}`);
  return items.json();
};
