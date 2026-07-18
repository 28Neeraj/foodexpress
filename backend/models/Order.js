const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        foodId: mongoose.Schema.Types.ObjectId,

        foodName: String,

        image: String,

        price: Number,

        quantity: Number,
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },
    pricing: { baseSubtotal: Number, platformCommission: Number, gst: Number, deliveryFee: Number, platformFee: Number, packagingCharge: Number, discount: Number, total: Number },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
    assignment: { attempts: { type: Number, default: 0 }, offeredTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], expiresAt: Date },

    deliveryPartner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    couponCode: { type: String, default: "" },
    discountAmount: { type: Number, default: 0 },
    paymentId: { type: String, default: "" },
    estimatedDeliveryAt: Date,
    statusTimeline: [{ status: String, note: String, at: { type: Date, default: Date.now } }],

    deliveryAddress: {
      type: String,
      default: "",
    },

    paymentMethod: {
      type: String,
      default: "COD",
    },

    paymentStatus: {
      type: String,
      default: "Pending",
    },

    orderStatus: {
      type: String,
      default: "Placed",
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Order",
  orderSchema
);
