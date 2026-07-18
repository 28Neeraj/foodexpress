const RestaurantApplication = require("../models/RestaurantApplication");
const DeliveryPartnerProfile = require("../models/DeliveryPartnerProfile");
const Restaurant = require("../models/Restaurant");
const validLocation = (location) => {
  const latitude = Number(location?.latitude);
  const longitude = Number(location?.longitude);
  return Number.isFinite(latitude) && Number.isFinite(longitude) && latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180;
};

exports.applyRestaurant = async (req, res) => {
  const required = ["businessName", "ownerName", "phone", "email", "address", "fssaiNumber"];
  if (required.some((key) => !req.body[key])) return res.status(400).json({ message: "Complete business, contact, address and FSSAI details are required." });
  if (!validLocation(req.body.location)) return res.status(400).json({ message: "Enter a valid location: latitude must be between -90 and 90, and longitude between -180 and 180." });
  const application = await RestaurantApplication.findOneAndUpdate({ applicant: req.user._id, status: "pending" }, { ...req.body, applicant: req.user._id }, { new: true, upsert: true, runValidators: true });
  res.status(201).json({ message: "Restaurant application submitted for verification.", application });
};
exports.applyPartner = async (req, res) => {
  const required = ["phone", "vehicle", "vehicleNumber", "drivingLicense"];
  if (required.some((key) => !req.body[key])) return res.status(400).json({ message: "Complete identity, vehicle and licence details are required." });
  const profile = await DeliveryPartnerProfile.findOneAndUpdate({ user: req.user._id }, { ...req.body, user: req.user._id, status: "pending", isOnline: false }, { new: true, upsert: true, runValidators: true });
  res.status(201).json({ message: "Delivery partner application submitted for approval.", profile });
};
exports.myRestaurant = async (req, res) => res.json(await Restaurant.findOne({ owner: req.user._id }));
exports.myPartnerProfile = async (req, res) => res.json(await DeliveryPartnerProfile.findOne({ user: req.user._id }));
exports.listRestaurantApplications = async (_req, res) => res.json(await RestaurantApplication.find().populate("applicant", "name email").sort({ createdAt: -1 }));
exports.reviewRestaurantApplication = async (req, res) => {
  const application = await RestaurantApplication.findById(req.params.id);
  if (!application) return res.status(404).json({ message: "Application not found" });
  const status = req.body.status;
  if (!["approved", "rejected"].includes(status)) return res.status(400).json({ message: "Invalid review status" });
  application.status = status; application.adminNote = req.body.note || "";
  if (status === "approved" && !application.restaurant) {
    if (!validLocation(application.location)) return res.status(400).json({ message: "This application has invalid coordinates. Ask the owner to correct and resubmit their location." });
    const restaurant = await Restaurant.create({ name: application.businessName, image: req.body.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900", address: application.address, description: req.body.description || "New FoodExpress partner", owner: application.applicant, approvalStatus: "approved", cuisine: application.cuisine || [], fssaiNumber: application.fssaiNumber, gstNumber: application.gstNumber || "", bankDetails: application.bankDetails, location: { type: "Point", coordinates: [Number(application.location?.longitude || 0), Number(application.location?.latitude || 0)] }, menu: [] });
    application.restaurant = restaurant._id;
    await require("../models/User").findByIdAndUpdate(application.applicant, { role: "restaurant_owner" });
  }
  await application.save(); res.json(application);
};
exports.listPartnerApplications = async (_req, res) => res.json(await DeliveryPartnerProfile.find().populate("user", "name email").sort({ createdAt: -1 }));
exports.reviewPartnerApplication = async (req, res) => {
  const profile = await DeliveryPartnerProfile.findById(req.params.id); if (!profile) return res.status(404).json({ message: "Application not found" });
  if (!["approved", "rejected"].includes(req.body.status)) return res.status(400).json({ message: "Invalid review status" });
  profile.status = req.body.status; await profile.save();
  if (profile.status === "approved") await require("../models/User").findByIdAndUpdate(profile.user, { role: "delivery_partner" });
  res.json(profile);
};
