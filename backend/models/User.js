const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({

  fullName: String,

  mobile: String,

  house: String,

  area: String,

  city: String,

  state: String,

  pincode: String,

  landmark: String,

  isDefault: {
    type: Boolean,
    default: false,
  },

});

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
  type: String,
  enum: ["user", "admin", "super_admin", "restaurant_owner", "delivery_partner"],
  default: "user",
},

  savedRestaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" }],

  deliveryLocation: {
    latitude: Number,
    longitude: Number,
    updatedAt: Date,
    isOnline: { type: Boolean, default: false },
  },

  phone: {
    type: String,
    default: "",
  },

  profileImage: {
    type: String,
    default: "",
  },

  hasLoggedIn: {
    type: Boolean,
    default: false,
  },

  addresses: [addressSchema],
  resetOtp: {
  type: String,
  default: "",
},

resetOtpExpiry: {
  type: Date,
},

}, {
  timestamps: true,
});

module.exports = mongoose.model("User", userSchema);
