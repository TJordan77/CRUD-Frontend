//import "./StudentListStyle.css"
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const StudentList = () => {
  const [students, setStudents] = useState([]);

  async function fetchAllStudents() {
    try {
      const response = axios.get("http://localhost:8080/api/students");
      setStudents(response.data);
    } catch {
      console.error("Error fetching Students", error);
    }
  }

  useEffect(() => {
    fetchAllStudents();
  }, []);

  return (
    <>
      <h1 className="students-list-title">All Students</h1>
      <div className="students-container">
        {students && students.length > 0 ? (
          students.map((student, index) => (
            <div className="students-card" key={index}>
              <h2 className="students-first-name">
                {student.firstName}, {student.lastName}
              </h2>
            </div>
          ))
        ) : (
          <p className="error-message">No Students found.</p>
        )}
      </div>
    </>
  );
};

export default StudentList;
