import api from "../api/api";

export const getRestaurants = async () => {

  const res = await api.get("/restaurants");

  return res.data;

};

export const getRestaurant = async (id) => {

  const res = await api.get(`/restaurants/${id}`);

  return res.data;

};

export const getMenu = async (id) => {

  const res = await api.get(`/restaurants/${id}/menu`);

  return res.data;

};