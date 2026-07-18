const router = require("express").Router();
const { protect, allowRoles } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const owner = require("../controllers/restaurantOwnerController");
router.get("/orders", protect, allowRoles("restaurant_owner"), owner.getDashboardOrders);
router.put("/orders/:id", protect, allowRoles("restaurant_owner"), owner.updateRestaurantOrder);
router.post("/upload", protect, allowRoles("restaurant_owner"), (req, res, next) => upload.single("image")(req, res, (error) => {
  if (error) return next(error);
  if (!req.file) return res.status(400).json({ message: "Choose an image to upload." });
  res.status(201).json({ image: req.file.path });
}));
module.exports = router;
