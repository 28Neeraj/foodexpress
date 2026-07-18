const DeliveryPartnerProfile = require("../models/DeliveryPartnerProfile");
const Order = require("../models/Order");

exports.offerNextPartner = async (order, io) => {
  if (!order.restaurant) return null;
  const Restaurant = require("../models/Restaurant");
  const restaurant = await Restaurant.findById(order.restaurant).select("location");
  const coordinates = restaurant?.location?.coordinates;
  if (!coordinates || coordinates.length !== 2 || coordinates[0] === 0) return null;
  const profiles = await DeliveryPartnerProfile.find({ status: "approved", isOnline: true, user: { $nin: order.assignment?.offeredTo || [] }, location: { $near: { $geometry: { type: "Point", coordinates }, $maxDistance: 12000 } } }).limit(1);
  const profile = profiles[0];
  if (!profile) return null;
  order.assignment = order.assignment || { attempts: 0, offeredTo: [] };
  order.assignment.offeredTo.push(profile.user);
  order.assignment.attempts += 1;
  order.assignment.expiresAt = new Date(Date.now() + 30000);
  await order.save();
  io?.to(`user:${profile.user}`).emit("delivery:offer", { orderId: order._id, expiresAt: order.assignment.expiresAt });
  return profile;
};

exports.assignOrQueue = async (order, io) => exports.offerNextPartner(order, io);
