const router = require("express").Router();
const { protect, allowRoles } = require("../middleware/authMiddleware");
const delivery = require("../controllers/deliveryController");
router.put("/location", protect, allowRoles("delivery_partner"), delivery.updateLocation);
router.get("/orders", protect, allowRoles("delivery_partner"), delivery.getMyDeliveries);
router.put("/orders/:id/status", protect, allowRoles("delivery_partner"), delivery.updateDeliveryStatus);
router.get("/tracking/:id", protect, delivery.getCustomerTracking);
module.exports = router;
