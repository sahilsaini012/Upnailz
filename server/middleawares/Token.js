const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err || user.email !== "admin@gmail.com") {
      return res.status(403).json({ message: "Forbidden: Admin only" });
    }
    req.user = user;
    next();
  });
};
module.exports = { verifyToken };
