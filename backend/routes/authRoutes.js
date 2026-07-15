const express = require("express");

const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

const {

  registerUser,

  loginUser,

  forgotPassword,

  getMe,

  updateProfile,

  addAddress,

  getAddresses,

  deleteAddress,

  setDefaultAddress,

  verifyOtp,

  resetPassword,

} = require("../controllers/authController");

const {

protect,

} = require("../middleware/authMiddleware");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", protect, getMe);

router.put(
  "/profile",
  protect,
  updateProfile
);

router.post(
  "/reset-password",
  resetPassword
);

router.post(
  "/address",
  protect,
  addAddress
);

router.post(
  "/verify-otp",
  verifyOtp
);

router.post(
  "/forgot-password",
  forgotPassword
);

router.get(
  "/address",
  protect,
  getAddresses
);

router.delete(
  "/address/:id",
  protect,
  deleteAddress
);

router.put(
  "/address/default/:id",
  protect,
  setDefaultAddress
);


router.post(
  "/upload-profile",
  protect,
  (req, res, next) => {
    upload.single("image")(req, res, function (err) {
      if (err) {
        console.error("UPLOAD ERROR:", err);

        return res.status(500).json({
          message: err.message,
          error: err,
        });
      }

      if (!req.file) {
        return res.status(400).json({
          message: "No file uploaded",
        });
      }

      res.json({
        image: req.file.path,
      });
    });
  }
);

module.exports = router;