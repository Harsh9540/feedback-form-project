const Form = require("../models/Form");
const Response = require("../models/Response");

const submitResponse = async (req, res) => {
  try {
    const { slug } = req.params;
    const { answers } = req.body;

    const form = await Form.findOne({ slug });

    if (!form) {
      return res.status(404).json({ msg: "Form not found" });
    }

    if (answers.length !== form.questions.length) {
      return res.status(400).json({ msg: "All questions must be answered" });
    }

    const newResponse = new Response({
      form: form._id,
      answers,
    });

    await newResponse.save();

    res.status(201).json({ msg: "Response submitted successfully" });
  } catch (err) {
    console.error("Submit Response Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};


const getFormResponses = async (req, res) => {
  try {
    const { slug } = req.params;

    const form = await Form.findOne({ slug });

    if (!form) {
      return res.status(404).json({ msg: "Form not found" });
    }

    // Check if logged-in user is the admin of the form
    if (form.admin.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    const responses = await Response.find({ form: form._id });

    // ✅ Send questions too
    res.status(200).json({
      responses,
      questions: form.questions,
    });
  } catch (err) {
    console.error("Get Responses Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};


module.exports = { submitResponse, getFormResponses };
