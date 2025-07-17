const express = require("express");
const router = express.Router();
const { submitResponse } = require("../controllers/formController");

const {
  createForm,
  getAdminForms,
  getFormBySlug,
  deleteForm,
} = require("../controllers/formController");
const protect = require("../middlewares/authMiddleware");

// ✅ Routes
router.post("/", protect, createForm);
router.get("/admin", protect, getAdminForms);
router.get("/:slug", getFormBySlug);
router.delete("/:slug", protect, deleteForm); // ✅ fixed
router.post("/responses/:slug", submitResponse);

module.exports = router;
