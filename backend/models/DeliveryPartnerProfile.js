const mongoose = require("mongoose");
const deliveryPartnerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true, required: true },
  phone: { type: String, required: true }, identity: { type: String, number: String, documentUrl: String },
  vehicle: { type: String, enum: ["bicycle", "bike", "scooter", "car"], required: true }, vehicleNumber: String,
  drivingLicense: String, bank: { accountHolder: String, accountNumber: String, ifsc: String },
  availability: { type: String, default: "flexible" },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending", index: true },
  isOnline: { type: Boolean, default: false },
  location: { type: { type: String, enum: ["Point"], default: "Point" }, coordinates: { type: [Number], default: [0, 0] }, updatedAt: Date },
  earnings: { type: Number, default: 0 }
}, { timestamps: true });
deliveryPartnerSchema.index({ location: "2dsphere", status: 1, isOnline: 1 });
module.exports = mongoose.model("DeliveryPartnerProfile", deliveryPartnerSchema);
