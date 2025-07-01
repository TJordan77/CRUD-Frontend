import React from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import SingleCampus from "./components/SingleCampus";
import SingleStudent from "./components/SingleStudent";
import AllStudents from "./components/AllStudents";
import AllCampuses from "./components/AllCampuses";
import "./AppStyles.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router } from "react-router";
import Home from "./components/Home";
const App = () => {
  return (
    <div>
      <NavBar />
      <div className="app">
        <h1>Hello React!</h1>
        <img className="react-logo" src="/react-logo.svg" alt="React Logo" />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<AllStudents />} />
          <Route path="/campuses" element={<AllCampuses />} />
          <Route path="/campuses/:campusId" element={<SingleCampus />} />
          <Route path="/students/:studentId" element={<SingleStudent />} />
        </Routes>
      </div>
    </div>
  );
};

// We're using React Router to handle the navigation between pages.
// It's important that the Router is at the top level of our app,
// and that we wrap our entire app in it. With this in place, we can
// declare Routes, Links, and use useful hooks like useNavigate.
const root = createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
