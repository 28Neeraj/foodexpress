const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");
const { listReviews, upsertReview } = require("../controllers/reviewController");
router.get("/:restaurantId", listReviews);
router.put("/:restaurantId", protect, upsertReview);
module.exports = router;
