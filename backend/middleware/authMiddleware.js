const jwt = require("jsonwebtoken");
const Admins = require("../models/Admin");

const JWT_SECRET = "your_secret_key"; // ⚠️ use .env in real projects

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      // Attach admin to request
      req.admin = await Admins.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Not authorized, token failed", error: error.message });
    }
  } else {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};

module.exports = protect; // ✅ export the function directly
