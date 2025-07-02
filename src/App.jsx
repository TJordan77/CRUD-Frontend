import React from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import SingleCampus from "./components/SingleCampus";
import SingleStudent from "./components/SingleStudent";
import AllStudents from "./components/AllStudents";
import AllCampuses from "./components/AllCampuses";
import NavBar from "./components/NavBar";
import "./components/AppStyles.css";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home";
const App = () => {
  return (
    <div>
      <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<AllStudents />} />
          <Route path="/campuses" element={<AllCampuses />} />
          <Route path="/campuses/:campusId" element={<SingleCampus />} />
          <Route path="/students/:studentId" element={<SingleStudent />} />
        </Routes>
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
