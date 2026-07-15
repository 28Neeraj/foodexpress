const Review = require("../models/Review");
const Restaurant = require("../models/Restaurant");

exports.listReviews = async (req, res) => {
  const reviews = await Review.find({ restaurant: req.params.restaurantId }).populate("user", "name profileImage").sort({ createdAt: -1 });
  res.json(reviews);
};

exports.upsertReview = async (req, res) => {
  const { rating, comment } = req.body;
  if (!Number.isFinite(Number(rating)) || Number(rating) < 1 || Number(rating) > 5) return res.status(400).json({ message: "Rating must be between 1 and 5" });
  const restaurant = await Restaurant.findById(req.params.restaurantId);
  if (!restaurant) return res.status(404).json({ message: "Restaurant Not Found" });
  const review = await Review.findOneAndUpdate({ user: req.user._id, restaurant: restaurant._id }, { rating, comment }, { new: true, upsert: true, runValidators: true });
  const stats = await Review.aggregate([{ $match: { restaurant: restaurant._id } }, { $group: { _id: null, rating: { $avg: "$rating" } } }]);
  restaurant.rating = Math.round((stats[0]?.rating || 0) * 10) / 10;
  await restaurant.save();
  res.status(201).json(review);
};
