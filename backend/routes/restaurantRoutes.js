const express = require("express");

const router = express.Router();
const {
  protect,
  admin, allowRoles,
} = require("../middleware/authMiddleware");
const {

  getRestaurants,

  getRestaurantById,

  getRestaurantMenu,
  addRestaurant,

updateRestaurant,

deleteRestaurant,
  addFood,

updateFood,

deleteFood,

} = require("../controllers/restaurantController");

router.get("/", getRestaurants);

router.get("/:id", getRestaurantById);

router.get("/:id/menu", getRestaurantMenu);
router.post(
  "/",
  protect,
  admin,
  addRestaurant
);

router.put(
  "/:id",
  protect,
  allowRoles("admin", "restaurant_owner"),
  updateRestaurant
);

router.delete(
  "/:id",
  protect,
  admin,
  deleteRestaurant
);
router.post("/:id/menu", protect, allowRoles("admin", "restaurant_owner"), addFood);

router.put("/:id/menu/:foodId", protect, allowRoles("admin", "restaurant_owner"), updateFood);

router.delete("/:id/menu/:foodId", protect, allowRoles("admin", "restaurant_owner"), deleteFood);

module.exports = router;
