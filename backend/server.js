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
const onboardingRoutes = require("./routes/onboardingRoutes");
const restaurantOwnerRoutes = require("./routes/restaurantOwnerRoutes");

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
app.use("/api/onboarding", onboardingRoutes);
app.use("/api/restaurant-owner", restaurantOwnerRoutes);
app.get("/", (req, res) => {
  res.send("🚀 FoodExpress Backend Running...");
});

const PORT = process.env.PORT || 5000;

const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: process.env.CLIENT_URL || "http://localhost:3000", methods: ["GET", "POST"] } });
app.set("io", io);
io.on("connection", (socket) => { socket.on("authenticate", (userId) => userId && socket.join(`user:${userId}`)); socket.on("order:join", (id) => socket.join(`order:${id}`)); });
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(error.status || 500).json({ message: error.message || "Something went wrong" });
});
