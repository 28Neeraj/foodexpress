import api from "../api/api";

export const getRestaurantReviews = async (restaurantId) => {
  const { data } = await api.get(`/reviews/${restaurantId}`);
  return data;
};

export const saveRestaurantReview = async (restaurantId, review) => {
  const { data } = await api.put(`/reviews/${restaurantId}`, review);
  return data;
};
