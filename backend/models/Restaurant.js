const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  isVeg: {
    type: Boolean,
    default: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  }
});

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  delivery: {
    type: String,
    default: "20-30 min",
  },
  deliveryFee: {
    type: Number,
    default: 40,
  },
  offer: {
    type: String,
    default: "40% OFF",
  },
  address: {
    type: String,
    required: true,
  },
  menu: [menuSchema]
});

module.exports = mongoose.model("Restaurant", restaurantSchema);