const router = require("express").Router();
const { protect, allowRoles } = require("../middleware/authMiddleware");
const delivery = require("../controllers/deliveryController");
router.put("/location", protect, allowRoles("delivery_partner"), delivery.updateLocation);
router.get("/orders", protect, allowRoles("delivery_partner"), delivery.getMyDeliveries);
router.put("/orders/:id/status", protect, allowRoles("delivery_partner"), delivery.updateDeliveryStatus);
router.put("/orders/:id/respond", protect, allowRoles("delivery_partner"), delivery.respondToOffer);
router.get("/tracking/:id", protect, delivery.getCustomerTracking);
module.exports = router;
