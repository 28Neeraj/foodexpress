const Order = require("../models/Order");
const User = require("../models/User");

const deliveryStatuses = ["Preparing", "Out for Delivery", "Delivered"];

exports.updateLocation = async (req, res) => {
  const { latitude, longitude, isOnline = true } = req.body;
  if (!Number.isFinite(Number(latitude)) || !Number.isFinite(Number(longitude))) return res.status(400).json({ message: "Valid latitude and longitude are required" });
  const partner = await User.findByIdAndUpdate(req.user._id, { deliveryLocation: { latitude: Number(latitude), longitude: Number(longitude), isOnline, updatedAt: new Date() } }, { new: true }).select("deliveryLocation name");
  res.json(partner);
};

exports.getMyDeliveries = async (req, res) => {
  const orders = await Order.find({ deliveryPartner: req.user._id, orderStatus: { $ne: "Delivered" } }).populate("user", "name phone").sort({ createdAt: -1 });
  res.json(orders);
};

exports.updateDeliveryStatus = async (req, res) => {
  const { status, note } = req.body;
  if (!deliveryStatuses.includes(status)) return res.status(400).json({ message: "Invalid delivery status" });
  const order = await Order.findOne({ _id: req.params.id, deliveryPartner: req.user._id });
  if (!order) return res.status(404).json({ message: "Assigned order not found" });
  order.orderStatus = status;
  order.statusTimeline.push({ status, note: note || "Updated by delivery partner" });
  await order.save();
  res.json(order);
};

exports.getCustomerTracking = async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, user: req.user._id }).populate("deliveryPartner", "name phone profileImage deliveryLocation");
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json({ orderId: order._id, status: order.orderStatus, estimatedDeliveryAt: order.estimatedDeliveryAt, timeline: order.statusTimeline, partner: order.deliveryPartner });
};
