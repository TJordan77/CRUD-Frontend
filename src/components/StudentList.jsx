import "./StudentListStyle.css";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import NewStudent from "./NewStudent";

const API_BASE = window.location.hostname === "localhost" ? "http://localhost:8080/api" : "https://crud-backend-gules-rho.vercel.app/api";

const StudentList = () => {
  const [students, setStudents] = useState([]);

  async function fetchAllStudents() {
    try {
      const response = await axios.get(`${API_BASE}/students`);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching Students", error);
    }
  }

  useEffect(() => {
    fetchAllStudents();
  }, []);

  return (
    <>
      <h1 className="students-list-title">All Students</h1>
      <div className="link-container">
        <Link className="add-student-button" to={"/addStudent"}>
          + Add Student
        </Link>
      </div>
      <div className="students-container">
        {students && students.length > 0 ? (
          students.map((student) => (
            <Link
              to={`/students/${student.id}`}
              key={student.id}
              className="students-card-link"
            >
              <div className="students-card">
                <img src={student.imageUrl} alt="Student Image" />
                <h2 className="students-first-name">
                  {student.firstName}, {student.lastName}
                </h2>
                <p className="campuses-attending">
                  {student.campus?.name || "No Campus Assigned"}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="error-message">No Students found.</p>
        )}
      </div>
    </>
  );
};

export default StudentList;
