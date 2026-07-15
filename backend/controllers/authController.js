const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const otpGenerator = require("otp-generator");
const dayjs = require("dayjs");
const sendEmail = require("../utils/sendEmail");
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// REGISTER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User Registered Successfully",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// FORGOT PASSWORD

const forgotPassword = async (req, res) => {

  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        message: "User Not Found",
      });

    }

    const otp = otpGenerator.generate(6, {

      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,

    });

    await User.findByIdAndUpdate(

      user._id,

      {

        resetOtp: otp,

        resetOtpExpiry: dayjs()
          .add(10, "minute")
          .toDate(),

      },

      { new: true }

    );

    res.json({
      message: "OTP page is ready. Your code is being sent by email.",

    });

    // Do not make the user wait for the mail provider before opening the OTP page.
    void sendEmail(
      user.email,
      "FoodExpress Password Reset OTP",
      `<h2>Password Reset</h2><p>Your OTP is:</p><h1>${otp}</h1><p>This OTP is valid for 10 minutes.</p>`
    ).catch((mailError) => {
      console.error("Password reset OTP email failed:", mailError.message);
    });

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};


// VERIFY OTP

const verifyOtp = async (req, res) => {

  try {

    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({

        message: "User Not Found",

      });

    }

    if (user.resetOtp !== otp) {

      return res.status(400).json({

        message: "Invalid OTP",

      });

    }

    if (new Date() > user.resetOtpExpiry) {

      return res.status(400).json({

        message: "OTP Expired",

      });

    }

    res.json({

      message: "OTP Verified Successfully",

    });

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};



// RESET PASSWORD

const resetPassword = async (req, res) => {

  try {

    const {
      email,
      otp,
      password,
    } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        message: "User Not Found",
      });

    }

    if (user.resetOtp !== otp) {

      return res.status(400).json({
        message: "Invalid OTP",
      });

    }

    if (new Date() > user.resetOtpExpiry) {

      return res.status(400).json({
        message: "OTP Expired",
      });

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    user.resetOtp = "";

    user.resetOtpExpiry = null;

    await user.save();

    res.json({

      message: "Password Reset Successfully",

    });

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};



// LOGIN
const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "User Not Found",
      });

    }

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {

      return res.status(400).json({
        message: "Invalid Password",
      });

    }

    const isFirstLogin = user.hasLoggedIn === false;

    if (isFirstLogin) {
      user.hasLoggedIn = true;
      await user.save();
    }

    res.json({

      message: "Login Successful",

      isFirstLogin,

      token: generateToken(user._id),

      user: {

        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// GET LOGGED IN USER
const getMe = async (req, res) => {

  res.json(req.user);

};
// UPDATE PROFILE

const updateProfile = async (req, res) => {

  try {

    const { name, phone, profileImage } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {

      return res.status(404).json({
        message: "User Not Found",
      });

    }

    user.name = name || user.name;

    user.phone = phone || user.phone;

    user.profileImage =
      profileImage || user.profileImage;

    await user.save();

    res.json({

      message: "Profile Updated",

      user,

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// ADD ADDRESS

const addAddress = async (req, res) => {

  try {

    const user = await User.findById(req.user._id);

    if (!user) {

      return res.status(404).json({
        message: "User Not Found",
      });

    }

    user.addresses.push(req.body);

    await user.save();

    res.status(201).json({
      message: "Address Added Successfully",
      addresses: user.addresses,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// GET ADDRESSES

const getAddresses = async (req, res) => {

  try {

    const user = await User.findById(req.user._id);

    if (!user) {

      return res.status(404).json({
        message: "User Not Found",
      });

    }

    res.json(user.addresses);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};
// DELETE ADDRESS

const deleteAddress = async (req, res) => {

  try {

    const user = await User.findById(req.user._id);

    if (!user) {

      return res.status(404).json({
        message: "User Not Found",
      });

    }

    user.addresses = user.addresses.filter(

      (address) =>
        address._id.toString() !== req.params.id

    );

    await user.save();

    res.json({

      message: "Address Deleted Successfully",

      addresses: user.addresses,

    });

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};


// SET DEFAULT ADDRESS

const setDefaultAddress = async (req, res) => {

  try {

    const user = await User.findById(req.user._id);

    if (!user) {

      return res.status(404).json({

        message: "User Not Found",

      });

    }

    user.addresses.forEach((address) => {

      address.isDefault =
        address._id.toString() === req.params.id;

    });

    await user.save();

    res.json({

      message: "Default Address Updated",

      addresses: user.addresses,

    });

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};

module.exports = {

  registerUser,

  loginUser,

  getMe,

  updateProfile,

  addAddress,

  getAddresses,

  deleteAddress,

  setDefaultAddress,

  forgotPassword,

  verifyOtp,

  resetPassword,

};
