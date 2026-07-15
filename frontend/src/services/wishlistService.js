import api from "../api/api";

export const getWishlist = async () => {
  const res = await api.get("/wishlist");
  return res.data;
};

export const toggleWishlist = async (food) => {
  const res = await api.post("/wishlist", {
    foodId: food._id,
    foodName: food.name,
    image: food.image,
    price: food.price,
  });

  return res.data;
};