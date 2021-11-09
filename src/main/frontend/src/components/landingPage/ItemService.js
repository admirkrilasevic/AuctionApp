export const fetchNewArrivals = async (page, size) => {
  const items = await (
    await fetch(`http://${ENVIRONMENT.HOST}/api/v1/items/getnewarrivals?page=${page}&size=${size}`)
  ).json();
  return items;
};

export const fetchLastChance = async (page, size) => {
  const items = await (
    await fetch(`http://${ENVIRONMENT.HOST}/api/v1/items/getlastchance?page=${page}&size=${size}`)
  ).json();
  return items;
};
