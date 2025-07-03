import React from "react";
import { createRoot } from "react-dom/client";
import SingleCampus from "./components/SingleCampus";
import SingleStudent from "./components/SingleStudent";
import NewCampusForm from "./components/NewCampusForm";
import NavBar from "./components/NavBar";
import "./components/AppStyles.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home";
import StudentList from "./components/StudentList";
import CampusList from "./components/CampusList";
import NewStudent from "./components/NewStudent";
import EditCampus from "./components/EditCampus";
import EditStudent from "./components/EditStudent";



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
        <Route path="/addStudent" element={<NewStudent />} />
        <Route path="/addCampus" element={<NewCampusForm />} />
        <Route path="/campuses/:campusId/edit" element={<EditCampus />} />
        <Route path="/students/:id/edit" element={<EditStudent />} />
      </Routes>
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
