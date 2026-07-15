const express = require("express");

const router = express.Router();

const {

  protect,

  admin,

} = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {
  getDashboardStats,
  getAllUsers,
  getAllRestaurants,
  getAllFoods,
  addFood,
  deleteFood,
  updateFood,
  toggleFoodAvailability,
  getAnalytics,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/adminController");
const sendEmail = require("../utils/sendEmail");

router.get(

  "/dashboard",

  protect,

  admin,

  getDashboardStats

);

router.get(
  "/test-email",
  async (req, res) => {

    try {

      await sendEmail(

        process.env.EMAIL_USER,

        "FoodExpress Test",

        "<h1>Email Working Successfully 🎉</h1>"

      );

      res.json({

        message: "Email Sent Successfully"

      });

    } catch (error) {

      res.status(500).json({

        message: error.message

      });

    }

  }
);

router.put(
  "/orders/:id",
  protect,
  admin,
  updateOrderStatus
);


router.post(
  "/upload",
  protect,
  admin,
  (req, res, next) => {
    upload.single("image")(req, res, (err) => {

      if (err) {
        console.log("UPLOAD ERROR:", err);
        return res.status(500).json(err);
      }

      console.log("FILE:", req.file);

      res.json({
        image: req.file.path,
      });

    });
  }
);


router.get(
  "/orders",
  protect,
  admin,
  getAllOrders
);


router.get(
  "/foods",
  protect,
  admin,
  getAllFoods
);

router.get(

"/analytics",

protect,

admin,

getAnalytics

);



router.post(
  "/foods/:restaurantId",
  protect,
  admin,
  addFood
);

router.delete(
  "/foods/:restaurantId/:foodId",
  protect,
  admin,
  deleteFood
);

router.put(
  "/foods/:restaurantId/:foodId",
  protect,
  admin,
  updateFood
);

router.patch(
  "/foods/:restaurantId/:foodId/availability",
  protect,
  admin,
  toggleFoodAvailability
);


router.get(
  "/restaurants",
  protect,
  admin,
  getAllRestaurants
);
router.get(
  "/users",
  protect,
  admin,
  getAllUsers
);

module.exports = router;