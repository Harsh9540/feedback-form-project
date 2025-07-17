// backend/routes/formRoutes.js
const express = require("express");
const router = express.Router();

const {
  createForm,
  getAdminForms,
  getFormBySlug,
  deleteForm,
  submitResponse,
} = require("../controllers/formController");

const protect = require("../middlewares/authMiddleware");

// ✅ Create a new form
router.post("/", protect, createForm);

// ✅ Get all forms created by logged-in admin
router.get("/admin", protect, getAdminForms);

// ✅ Get form by slug (public)
router.get("/:slug", getFormBySlug);

// ✅ Delete form by slug
router.delete("/:slug", protect, deleteForm);

// ✅ Submit response to a form
router.post("/responses/:slug", submitResponse);

module.exports = router;
