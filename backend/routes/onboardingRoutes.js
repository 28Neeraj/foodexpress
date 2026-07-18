const router = require("express").Router();
const { protect, admin } = require("../middleware/authMiddleware"); const controller = require("../controllers/onboardingController");
router.post("/restaurant", protect, controller.applyRestaurant); router.post("/delivery-partner", protect, controller.applyPartner);
router.get("/restaurant/me", protect, controller.myRestaurant); router.get("/delivery-partner/me", protect, controller.myPartnerProfile);
router.get("/admin/restaurants", protect, admin, controller.listRestaurantApplications); router.put("/admin/restaurants/:id", protect, admin, controller.reviewRestaurantApplication);
router.get("/admin/partners", protect, admin, controller.listPartnerApplications); router.put("/admin/partners/:id", protect, admin, controller.reviewPartnerApplication);
module.exports = router;
