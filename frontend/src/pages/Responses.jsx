import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFF"];

const Responses = () => {
  const { slug } = useParams();
  const [responses, setResponses] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/responses/${slug}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setResponses(res.data.responses || []);
        setQuestions(res.data.questions || []);
      } catch (err) {
        console.error("❌ Error:", err);
        setError("Failed to load responses");
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, [slug]);

  const renderChart = (index) => {
    const mcqAnswers = responses.map((r) =>
      Array.isArray(r.answers) ? r.answers[index] : null
    );

    const frequency = {};

    mcqAnswers.forEach((ans) => {
      if (ans) {
        frequency[ans] = (frequency[ans] || 0) + 1;
      }
    });

    const chartData = Object.keys(frequency).map((key) => ({
      name: key,
      value: frequency[key],
    }));

    if (chartData.length === 0) {
      return (
        <p className="text-gray-500">No data to display for this question.</p>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            dataKey="value"
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  };

  const handleExportCSV = () => {
    if (!responses.length || !questions.length) return;

    const headers = questions.map((q) => `"${q.questionText}"`).join(",");
    const rows = responses.map((r) =>
      r.answers?.map((a) => `"${a || ""}"`).join(",")
    );
    const csvContent = [headers, ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug}_responses.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white mt-8 shadow rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        📊 Feedback Responses
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading responses...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : responses.length === 0 ? (
        <p className="text-gray-600">No responses submitted yet.</p>
      ) : (
        <>
          <p className="text-gray-600 mb-6">
            Total responses: {responses.length}
          </p>

          <button
            onClick={handleExportCSV}
            className="mb-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            📥 Export Responses as CSV
          </button>

          {/* Chart Section */}
          <div className="space-y-8 mb-12">
            {Array.isArray(questions) &&
              questions.map((q, qIndex) => (
                <div key={qIndex} className="bg-gray-50 border p-4 rounded-md">
                  <h4 className="font-semibold mb-2">
                    Q{qIndex + 1}: {q.questionText}
                  </h4>

                  {q.type === "mcq" ? (
                    renderChart(qIndex)
                  ) : (
                    <ul className="list-disc list-inside text-gray-700">
                      {responses.map((r, i) => (
                        <li key={i}>
                          {r.answers?.[qIndex] || (
                            <span className="text-gray-400">(No answer)</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
          </div>

          {/* Detailed Submissions */}
          <div className="mt-10">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              🧾 Individual Submissions
            </h3>
            <div className="space-y-6">
              {responses.map((r, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg bg-gray-50 p-4 shadow-sm hover:shadow-md transition duration-200"
                >
                  <h4 className="font-semibold text-lg mb-2">
                    Response #{i + 1}
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    {r.answers?.map((ans, index) => (
                      <li key={index}>
                        <strong>Q{index + 1}:</strong>{" "}
                        {questions?.[index]?.questionText || "N/A"}
                        <br />
                        <span className="ml-4 inline-block bg-gray-100 px-2 py-1 rounded text-gray-800">
                          ➡️ <em>{ans || "(No answer)"}</em>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-400 mt-2">
                    Submitted on: {new Date(r.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Responses;
