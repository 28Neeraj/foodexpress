const express = require("express");

const router = express.Router();

const {
  getCart,
  addToCart,
  updateQuantity,
  removeItem,
  clearCart,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getCart);

router.post("/", protect, addToCart);

router.put("/", protect, updateQuantity);

router.delete("/", protect, removeItem);

router.delete("/clear", protect, clearCart);

module.exports = router;