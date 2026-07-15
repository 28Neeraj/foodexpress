const Cart = require("../models/Cart");

// GET CART
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const { foodId, foodName, image, price } = req.body;

    let cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.foodId.toString() === foodId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        foodId,
        foodName,
        image,
        price,
        quantity: 1,
      });
    }

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// UPDATE QUANTITY
const updateQuantity = async (req, res) => {
  try {

    const { foodId, action } = req.body;

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) => item.foodId.toString() === foodId
    );

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    if (action === "increase") {
      item.quantity += 1;
    }

    if (action === "decrease") {

      item.quantity -= 1;

      if (item.quantity <= 0) {
        cart.items = cart.items.filter(
          (i) => i.foodId.toString() !== foodId
        );
      }

    }

    await cart.save();

    res.json(cart);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// REMOVE ITEM
const removeItem = async (req, res) => {

  try {

    const { foodId } = req.body;

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {

      return res.status(404).json({
        message: "Cart not found",
      });

    }

    cart.items = cart.items.filter(
      (item) => item.foodId.toString() !== foodId
    );

    await cart.save();

    res.json(cart);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// CLEAR CART
const clearCart = async (req, res) => {

  try {

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {

      return res.status(404).json({
        message: "Cart not found",
      });

    }

    cart.items = [];

    await cart.save();

    res.json({
      message: "Cart Cleared",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  getCart,
  addToCart,
  updateQuantity,
  removeItem,
  clearCart,
};