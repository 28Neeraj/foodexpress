import api from "../api/api";

export const getDashboardStats = async () => {
  const { data } = await api.get("/admin/dashboard");
  return data;
};

export const getAllUsers = async () => {
  const { data } = await api.get("/admin/users");
  return data;
};

export const updateRestaurant = async (id, restaurant) => {

  const { data } = await api.put(
    `/restaurants/${id}`,
    restaurant
  );

  return data;

};

export const addRestaurant = async (restaurant) => {

  const { data } = await api.post(
    "/restaurants",
    restaurant
  );

  return data;

};

export const updateFood = async (restaurantId, foodId, food) => {

  const { data } = await api.put(
    `/admin/foods/${restaurantId}/${foodId}`,
    food
  );

  return data;

};

export const deleteFood = async (restaurantId, foodId) => {

  const { data } = await api.delete(
    `/admin/foods/${restaurantId}/${foodId}`
  );

  return data;

};

export const getAnalytics = async () => {

  const { data } = await api.get("/admin/analytics");

  return data;

};

export const toggleFoodAvailability = async (
  restaurantId,
  foodId
) => {

  const { data } = await api.patch(
    `/admin/foods/${restaurantId}/${foodId}/availability`
  );

  return data;

};

export const addFood = async (restaurantId, food) => {

  const { data } = await api.post(
    `/admin/foods/${restaurantId}`,
    food
  );

  return data;

};
export const getAllFoods = async () => {

  const { data } = await api.get("/admin/foods");

  return data;

};

export const updateOrderStatus = async (id, status) => {

  const { data } = await api.put(
    `/admin/orders/${id}`,
    { status }
  );

  return data;

};

export const getAllOrders = async () => {
  const { data } = await api.get("/admin/orders");
  return data;
};

export const getAllRestaurants = async () => {
  const { data } = await api.get("/admin/restaurants");
  return data;
};

export const deleteRestaurant = async (id) => {
  const { data } = await api.delete(`/restaurants/${id}`);
  return data;
};