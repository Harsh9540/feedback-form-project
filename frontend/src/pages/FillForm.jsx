import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import toast from "react-hot-toast";

const FillForm = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState([]);
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
      toast.success("Submitted Successfully");

      // ✅ Redirect to thank you page after 1 second
      setTimeout(() => {
        navigate("/thank-you");
      }, 1000);
    } catch (err) {
      toast.error("Failed to submit response");
    }
  };

  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;
  if (!form) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#f6f3fc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Form Title Block */}
        <div className="bg-white rounded-t-xl border-t-8 border-[#673AB7] p-6 shadow-md mb-3">
          <h2 className="text-3xl font-bold text-gray-900">{form.title}</h2>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {form.questions.map((q, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md p-5 rounded-md border border-gray-200"
            >
              <label className="block text-gray-900 font-semibold mb-2">
                {q.questionText} <span className="text-red-500">*</span>
              </label>

              {q.type === "text" ? (
                <input
                  type="text"
                  value={answers[idx]}
                  onChange={(e) => handleChange(e.target.value, idx)}
                  required
                  className="w-full border-b border-gray-400 outline-none py-1 placeholder-gray-400"
                  placeholder="Your answer"
                />
              ) : (
                <div className="space-y-2">
                  {q.options.slice(0, 4).map((opt, i) => (
                    <div key={i} className="flex items-center">
                      <input
                        type="radio"
                        id={`q${idx}_opt${i}`}
                        name={`question_${idx}`}
                        value={opt}
                        checked={answers[idx] === opt}
                        onChange={() => handleChange(opt, idx)}
                        className="mr-2"
                      />
                      <label htmlFor={`q${idx}_opt${i}`} className="text-gray-800">
                        {opt}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#673AB7] text-white font-semibold py-3 rounded-md hover:bg-[#5e35b1] transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FillForm;
