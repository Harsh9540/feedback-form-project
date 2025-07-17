import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import toast from "react-hot-toast";

const FillForm = () => {
  const { slug } = useParams();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await axios.get(`/forms/${slug}`);
        setForm(res.data.form);
        setAnswers(new Array(res.data.form.questions.length).fill(""));
      } catch (err) {
        toast.error("Form not found");
        setError("Form not found");
      }
    };
    fetchForm();
  }, [slug]);

  const handleChange = (value, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/responses/${slug}`, { answers });
      setMsg("Feedback submitted successfully!");
      toast.success("Feedback submitted successfully!");
    } catch (err) {
      setError("Failed to submit feedback");
      toast.error("Failed to submit feedback");
    }
  };

  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;
  if (!form) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white mt-8 shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{form.title}</h2>
      <form onSubmit={handleSubmit}>
        {form.questions.map((q, idx) => (
          <div key={idx} className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">
              {q.questionText}
            </label>

            {q.type === "text" ? (
              <input
                type="text"
                value={answers[idx]}
                onChange={(e) => handleChange(e.target.value, idx)}
                className="w-full p-2 border rounded"
                required
              />
            ) : (
              <select
                value={answers[idx]}
                onChange={(e) => handleChange(e.target.value, idx)}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">-- Select --</option>
                {q.options.map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Submit
        </button>
      </form>

      {msg && (
        <p className="mt-4 text-green-600 text-center font-medium">{msg}</p>
      )}
    </div>
  );
};

export default FillForm;
