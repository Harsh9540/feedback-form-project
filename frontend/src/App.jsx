import React from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import FillForm from "./pages/FillForm";
import Responses from "./pages/Responses";
import CreateForm from "./pages/CreateForm";
import ThankYou from "./pages/ThankYou";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
         <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/form/:slug" element={<FillForm />} />
          <Route path="/responses/:slug" element={<Responses />} />
          <Route path="/create-form" element={<CreateForm />} />
          <Route path="/thank-you" element={<ThankYou />} />
        {/* Baad me: dashboard, form-create, public-form routes yahan add karenge */}
      </Routes>
    </Router>
  );
};

export default App;
