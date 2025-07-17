const Form = require("../models/Form");
const { v4: uuidv4 } = require("uuid");

// ✅ Create a new form
const createForm = async (req, res) => {
  try {
    const { title, questions } = req.body;

    if (!title || !questions || questions.length < 3) {
      return res.status(400).json({ msg: "Title and minimum 3 questions required" });
    }

    const newForm = new Form({
      title,
      questions,
      admin: req.user.id,
      slug: uuidv4(),
    });

    await newForm.save();

    res.status(201).json({
      msg: "Form created successfully",
      slug: newForm.slug,
    });
  } catch (err) {
    console.error("Create Form Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Get all forms of current admin
const getAdminForms = async (req, res) => {
  try {
    const forms = await Form.find({ admin: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ forms });
  } catch (err) {
    console.error("Get Forms Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Get a single form by slug
const getFormBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;
    const form = await Form.findOne({ slug });

    if (!form) {
      return res.status(404).json({ msg: "Form not found" });
    }

    res.status(200).json({ form });
  } catch (err) {
    console.error("Get Form Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Delete a form by slug (admin only)
const deleteForm = async (req, res) => {
  try {
    const slug = req.params.slug;

    const form = await Form.findOneAndDelete({ slug, admin: req.user.id });

    if (!form) {
      return res.status(404).json({ msg: "Form not found or unauthorized" });
    }

    res.status(200).json({ msg: "Form deleted successfully" });
  } catch (err) {
    console.error("Delete Form Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Submit form response (public access)
const submitResponse = async (req, res) => {
  const { slug } = req.params;
  const { answers } = req.body;

  try {
    const form = await Form.findOne({ slug });

    if (!form) {
      return res.status(404).json({ msg: "Form not found" });
    }

    form.responses.push({ answers });
    await form.save();

    res.status(200).json({ msg: "Response submitted successfully" });
  } catch (err) {
    console.error("Submit Response Error:", err.message);
    res.status(500).json({ msg: "Server error while submitting response" });
  }
};

module.exports = {
  createForm,
  getAdminForms,
  getFormBySlug,
  deleteForm,
  submitResponse, // ✅ Exported here
};
