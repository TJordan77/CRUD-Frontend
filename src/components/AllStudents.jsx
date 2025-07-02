/*import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllStudents = () => {
  const [students, setStudents] = useState([]);

  const apiUrl = "https://crud-backend-gules-rho.vercel.app";
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/students`)
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Error loading students:", err));
  }, []);

  return (
    <div>
      <h2>All Students</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              <Link to={`/students/${student.id}`}>
                {student.firstName} {student.lastName}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllStudents; */
