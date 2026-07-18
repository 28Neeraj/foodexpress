import api from "../api/api";
export const updateDeliveryLocation = async (coords, isOnline = true) => (await api.put("/delivery/location", { latitude: coords.latitude, longitude: coords.longitude, isOnline })).data;
export const getMyDeliveries = async () => (await api.get("/delivery/orders")).data;
export const updateDeliveryStatus = async (id, status) => (await api.put(`/delivery/orders/${id}/status`, { status })).data;
export const getOrderTracking = async (id) => (await api.get(`/delivery/tracking/${id}`)).data;
export const respondToDeliveryOffer = async (id, accept) => (await api.put(`/delivery/orders/${id}/respond`, { accept })).data;
