const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controllers");

router.post("/register", authControllers.register);
router.post("/login", authControllers.login);
router.get("/get", authControllers.users);

module.exports = router;
