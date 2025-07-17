// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

router.get("/test", (req, res) => {
  res.send("Auth route working!");
});
router.post("/register", registerUser);
// Login
router.post("/login", loginUser);
module.exports = router;
