import api from "../api/api";

export const getCart = async () => {
  const res = await api.get("/cart");
  return res.data;
};

export const addToCart = async (food) => {
  const res = await api.post("/cart", {
    foodId: food._id,
    foodName: food.name,
    image: food.image,
    price: food.price,
  });

  return res.data;
};

export const updateQuantity = async (foodId, action) => {
  const res = await api.put("/cart", {
    foodId,
    action,
  });

  return res.data;
};

export const removeItem = async (foodId) => {
  const res = await api.delete("/cart", {
    data: { foodId },
  });

  return res.data;
};

export const clearCart = async () => {
  const res = await api.delete("/cart/clear");
  return res.data;
};