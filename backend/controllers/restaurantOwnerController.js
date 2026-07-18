const Order = require("../models/Order");
const Restaurant = require("../models/Restaurant");

const ownerRestaurant = (userId) => Restaurant.findOne({ owner: userId, approvalStatus: "approved" });
const allowedTransitions = ["Accepted", "Rejected", "Preparing", "Ready for Pickup", "Handed Over"];

exports.getDashboardOrders = async (req, res) => {
  const restaurant = await ownerRestaurant(req.user._id);
  if (!restaurant) return res.status(404).json({ message: "No approved restaurant is linked to this account." });
  const orders = await Order.find({ restaurant: restaurant._id })
    .populate("user", "name phone")
    .populate("deliveryPartner", "name phone profileImage deliveryLocation")
    .sort({ createdAt: -1 });
  res.json({ restaurant: { _id: restaurant._id, name: restaurant.name, isOpen: restaurant.isOpen }, orders });
};

exports.updateRestaurantOrder = async (req, res) => {
  const restaurant = await ownerRestaurant(req.user._id);
  if (!restaurant) return res.status(404).json({ message: "No approved restaurant is linked to this account." });
  const { status, preparationMinutes } = req.body;
  if (!allowedTransitions.includes(status)) return res.status(400).json({ message: "Invalid restaurant order status." });
  const order = await Order.findOne({ _id: req.params.id, restaurant: restaurant._id });
  if (!order) return res.status(404).json({ message: "Order not found for this restaurant." });
  if (status === "Rejected" && order.orderStatus !== "Placed") return res.status(409).json({ message: "Only new orders can be rejected." });
  order.orderStatus = status;
  if (Number.isFinite(Number(preparationMinutes)) && Number(preparationMinutes) >= 0) order.estimatedDeliveryAt = new Date(Date.now() + (Number(preparationMinutes) + 25) * 60000);
  order.statusTimeline.push({ status, note: req.body.note || `Restaurant marked order ${status.toLowerCase()}` });
  await order.save();
  const event = { orderId: order._id, status, timeline: order.statusTimeline, estimatedDeliveryAt: order.estimatedDeliveryAt };
  req.app.get("io")?.to(`order:${order._id}`).emit("order:status", event);
  req.app.get("io")?.to(`user:${order.user}`).emit("order:status", event);
  if (order.deliveryPartner) req.app.get("io")?.to(`user:${order.deliveryPartner}`).emit("order:status", event);
  res.json({ message: `Order marked ${status}.`, order });
};
