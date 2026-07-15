const express = require("express");

const router = express.Router();
const {
  protect,
  admin,
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
  admin,
  updateRestaurant
);

router.delete(
  "/:id",
  protect,
  admin,
  deleteRestaurant
);
router.post(
  "/:id/menu",
  protect,
  admin,
  addFood
);

router.put(
  "/:id/menu/:foodId",
  protect,
  admin,
  updateFood
);

router.delete(
  "/:id/menu/:foodId",
  protect,
  admin,
  deleteFood
);

module.exports = router;