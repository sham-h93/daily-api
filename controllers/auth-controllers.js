const User = require("../models/user");
const bcrypt = require("bcrypt");
const rounds = 10;
const jwt = require("jsonwebtoken");
const consts = require("../constants/constants");

exports.users = async (req, res) => {
  const users = await User.find().exec();
  res.status(200).json(users);
};

exports.register = async (req, res) => {
  console.log(req.body);
  try {
    if (
      !req.body ||
      !req.body.username ||
      !req.body.email ||
      !req.body.password
    ) {
      res.status(400).json({ message: "require parameters is missing" });
      return;
    }
    const user = req.body;
    const userExist = await User.findOne({ email: user.email });
    if (userExist) {
      res.status(409).json({ message: "user already exists" });
      return;
    }
    const password = await bcrypt.hash(user.password, rounds);
    const newUser = { ...user, password: password };
    await User.create(newUser).then(
      res.status(201).json({ message: "successfully registered", newUser })
    );
  } catch (err) {
    res.status(500).json(err.message);
  }
};
exports.login = async (req, res) => {
  try {
    if (!req.body || !req.body.email || !req.body.password) {
      res.status(400).json({ message: "require parameters is missing" });
      return;
    }
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json({ message: "user not found" });
      return;
    }
    const passwordIsCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordIsCorrect) {
      res.status(404).json({ error: "incorrect password" });
      return;
    }
    const token = jwt.sign({ user }, consts.SECRET_KEY);
    res
      .status(200)
      .json({ message: "successfully logedin", user, token: token });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
