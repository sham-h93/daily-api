const jwt = require("jsonwebtoken");
const constants = require("../constants/constants");
const User = require("../models/user");
const auth = async (req, res, next) => {
  try {
    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.split(" ")[1]
    ) {
      const token = req.headers.authorization.split(" ")[1];
      const decode = await jwt.verify(token, constants.SECRET_KEY);
      const user = await User.findOne({ _id: decode.user._id });
      if (!user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
    }
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
module.exports = auth;
