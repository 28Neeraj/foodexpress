import api from "../api/api";
export const applyRestaurant = async (data) => (await api.post("/onboarding/restaurant", data)).data;
export const applyPartner = async (data) => (await api.post("/onboarding/delivery-partner", data)).data;
export const getMyRestaurant = async () => (await api.get("/onboarding/restaurant/me")).data;
export const getMyPartnerProfile = async () => (await api.get("/onboarding/delivery-partner/me")).data;
export const getRestaurantApplications = async () => (await api.get("/onboarding/admin/restaurants")).data;
export const reviewRestaurantApplication = async (id, data) => (await api.put(`/onboarding/admin/restaurants/${id}`, data)).data;
export const getPartnerApplications = async () => (await api.get("/onboarding/admin/partners")).data;
export const reviewPartnerApplication = async (id, data) => (await api.put(`/onboarding/admin/partners/${id}`, data)).data;
