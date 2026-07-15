const express = require("express");

const router = express.Router();

const {

  placeOrder,

  getMyOrders,

  getOrderById,

  updateOrderStatus,

} = require("../controllers/orderController");

const {

  protect,

} = require("../middleware/authMiddleware");

router.post(
  "/",
  protect,
  placeOrder
);

router.get(
  "/",
  protect,
  getMyOrders
);

router.get(
  "/:id",
  protect,
  getOrderById
);

router.put(
  "/:id/status",
  protect,
  updateOrderStatus
);

module.exports = router;