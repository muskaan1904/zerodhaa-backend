const express = require("express");
const { Signup, signin, verifyToken } = require("../controllers/auth.controller");
const authMiddleware = require("../util/authMiddleware");

const router = express.Router();

// user routes
router.post("/signup", Signup);
router.post("/signin", signin);
router.get("/verify", authMiddleware, verifyToken);

module.exports = router;