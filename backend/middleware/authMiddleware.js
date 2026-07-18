const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {

    try {

      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) return res.status(401).json({ message: "Account not found" });
      req.effectiveRole = decoded.previewRole || req.user.role;

      next();

    } catch (error) {

      return res.status(401).json({
        message: "Not Authorized",
      });

    }

  }

  if (!token) {

    return res.status(401).json({
      message: "No Token",
    });

  }

};
const admin = (req, res, next) => {

  if (
    req.user &&
    ["admin", "super_admin"].includes(req.effectiveRole || req.user.role)
  ) {

    next();

  } else {

    res.status(403).json({
      message: "Admin Access Only",
    });

  }

};

const allowRoles = (...roles) => (req, res, next) => {
  if (req.user && roles.includes(req.effectiveRole || req.user.role)) return next();
  return res.status(403).json({ message: "You do not have access to this action" });
};

module.exports = {
  protect,
  admin,
  allowRoles,
};
