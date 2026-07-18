const Order = require("../models/Order");
const User = require("../models/User");
const DeliveryPartnerProfile = require("../models/DeliveryPartnerProfile");
const { offerNextPartner } = require("../services/assignmentService");

const deliveryStatuses = ["Preparing", "Out for Delivery", "Delivered"];

exports.updateLocation = async (req, res) => {
  const { latitude, longitude, isOnline = true } = req.body;
  if (!Number.isFinite(Number(latitude)) || !Number.isFinite(Number(longitude))) return res.status(400).json({ message: "Valid latitude and longitude are required" });
  const partner = await User.findByIdAndUpdate(req.user._id, { deliveryLocation: { latitude: Number(latitude), longitude: Number(longitude), isOnline, updatedAt: new Date() } }, { new: true }).select("deliveryLocation name");
  await DeliveryPartnerProfile.findOneAndUpdate({ user: req.user._id }, { isOnline, location: { type: "Point", coordinates: [Number(longitude), Number(latitude)], updatedAt: new Date() } });
  req.app.get("io")?.emit("partner:location", { partnerId: req.user._id, latitude: Number(latitude), longitude: Number(longitude), updatedAt: new Date() });
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
  req.app.get("io")?.to(`order:${order._id}`).emit("order:status", { orderId: order._id, status, timeline: order.statusTimeline });
  res.json(order);
};

exports.respondToOffer = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order || !order.assignment?.offeredTo?.some((id) => String(id) === String(req.user._id))) return res.status(404).json({ message: "Delivery offer not found" });
  if (req.body.accept && !order.deliveryPartner) {
    order.deliveryPartner = req.user._id; order.orderStatus = "Preparing"; order.statusTimeline.push({ status: "Partner assigned", note: "A delivery partner accepted the order" }); await order.save();
    req.app.get("io")?.to(`order:${order._id}`).emit("order:assigned", { orderId: order._id, partnerId: req.user._id }); return res.json(order);
  }
  await offerNextPartner(order, req.app.get("io")); return res.json({ message: "Offer declined; reassigned to the next available partner." });
};

exports.getCustomerTracking = async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, user: req.user._id }).populate("deliveryPartner", "name phone profileImage deliveryLocation");
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json({ orderId: order._id, status: order.orderStatus, estimatedDeliveryAt: order.estimatedDeliveryAt, timeline: order.statusTimeline, partner: order.deliveryPartner });
};
