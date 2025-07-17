import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import toast from "react-hot-toast";

const CreateForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", type: "text", options: [] },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", type: "text", options: [] },
    ]);
  };

  const removeQuestion = (index) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  const handleChange = (index, key, value) => {
    const updated = [...questions];
    updated[index][key] = value;
    if (key === "type" && value === "text") updated[index].options = [];
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const addOption = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].options.push("");
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validate at least 3 valid questions
    const validQuestions = questions.filter((q) => {
      if (!q.questionText.trim()) return false;
      if (q.type === "mcq" && (!q.options || q.options.length === 0)) return false;
      return true;
    });

    if (validQuestions.length < 3) {
      toast.error("Minimum 3 valid questions required (MCQs must have options)");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "/forms",
        { title, questions: validQuestions },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("🎉 Form created successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Create Error:", err);
      toast.error("Failed to create form");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 mt-10 bg-gradient-to-br from-white to-gray-100 shadow-2xl rounded-2xl border border-gray-200">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2">
        📝 Create New Feedback Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Enter form title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        {questions.map((q, index) => (
          <div
            key={index}
            className="relative border border-gray-300 p-6 rounded-xl bg-white shadow-md space-y-4"
          >
            <label className="block font-semibold text-gray-700">
              Question {index + 1}
            </label>
            <input
              type="text"
              placeholder="Enter question text"
              value={q.questionText}
              onChange={(e) =>
                handleChange(index, "questionText", e.target.value)
              }
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <select
              value={q.type}
              onChange={(e) => handleChange(index, "type", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="text">Text (Open-ended)</option>
              <option value="mcq">Multiple Choice (MCQ)</option>
            </select>

            {q.type === "mcq" &&
              q.options.map((opt, oIndex) => (
                <input
                  key={oIndex}
                  type="text"
                  value={opt}
                  placeholder={`Option ${oIndex + 1}`}
                  onChange={(e) =>
                    handleOptionChange(index, oIndex, e.target.value)
                  }
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              ))}

            {q.type === "mcq" && (
              <button
                type="button"
                onClick={() => addOption(index)}
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                ➕ Add Option
              </button>
            )}

            {questions.length > 1 && (
              <button
                type="button"
                onClick={() => removeQuestion(index)}
                className="absolute top-3 right-4 text-red-500 hover:text-red-700 text-lg"
              >
                ❌
              </button>
            )}
          </div>
        ))}

        <div className="flex flex-wrap gap-4 justify-end">
          <button
            type="button"
            onClick={addQuestion}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg shadow-lg transition"
          >
            ➕ Add Question
          </button>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-lg transition"
          >
            ✅ Save Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
