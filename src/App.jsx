import React from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route } from "react-router";
import SingleCampus from "./components/SingleCampus";
import SingleStudent from "./components/SingleStudent";
import AllStudents from "./components/AllStudents";
import AllCampuses from "./components/AllCampuses";
import NavBar from "./components/NavBar";
import "./components/AppStyles.css";
import { BrowserRouter as Router } from "react-router";
import Home from "./components/Home";
import StudentList from "./components/StudentList";
import CampusList from "./components/CampusList";
import NewStudent from "./components/NewStudent";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/campuses" element={<CampusList />} />
        <Route path="/campuses/:campusId" element={<SingleCampus />} />
        <Route path="/students/:studentId" element={<SingleStudent />} />
        <Route path="/addStudent" element={<NewStudent fetchAllStudents={AllStudents} />}></Route>
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
