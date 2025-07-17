const express = require("express");
const router = express.Router();
const { submitResponse, getFormResponses } = require("../controllers/responseController");
const protect = require("../middlewares/authMiddleware");

router.post("/:slug", submitResponse);
router.get("/:slug", protect, getFormResponses); // ✅ protected
module.exports = router;
