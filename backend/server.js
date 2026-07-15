require("dotenv").config();
// Secrets from .env are intentionally never logged.
const authRoutes = require("./routes/authRoutes");
const express = require("express");
const cors = require("cors");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");

const connectDB = require("./config/db");
const restaurantRoutes = require("./routes/restaurantRoutes");

const app = express();

connectDB();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/delivery", deliveryRoutes);
app.get("/", (req, res) => {
  res.send("🚀 FoodExpress Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
