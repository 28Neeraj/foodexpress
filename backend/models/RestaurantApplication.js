const mongoose = require("mongoose");
const applicationSchema = new mongoose.Schema({
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  businessName: { type: String, required: true, trim: true }, ownerName: { type: String, required: true },
  phone: { type: String, required: true }, email: { type: String, required: true },
  address: { type: String, required: true }, cuisine: [String],
  location: { latitude: Number, longitude: Number },
  gstNumber: String, fssaiNumber: String, panNumber: String,
  bankDetails: { accountHolder: String, accountNumber: String, ifsc: String },
  documents: [{ label: String, url: String }],
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending", index: true },
  adminNote: String, restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" }
}, { timestamps: true });
module.exports = mongoose.model("RestaurantApplication", applicationSchema);
