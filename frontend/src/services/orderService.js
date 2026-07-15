import api from "../api/api";

export const placeOrder = async (orderData) => {
  const { data } = await api.post("/orders", orderData);
  return data;
};

export const getMyOrders = async () => {
  const { data } = await api.get("/orders");
  return data;
};

export const getOrderById = async (id) => {
  const { data } = await api.get(`/orders/${id}`);
  return data;
};

export const updateOrderStatus = async (id, status, note) => {
  const { data } = await api.put(`/orders/${id}/status`, { status, note });
  return data;
};
