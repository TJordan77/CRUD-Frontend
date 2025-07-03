import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SingleStudent = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = "https://crud-backend-gules-rho.vercel.app";
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8080/api/students/${studentId}`);
        setStudent(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching student data:", error);
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId]);
  if (loading) return <p>Loading....</p>;
  if (!student) return <p>Student not found..</p>;

  return (
    <div>
      <img src={student.imageUrl} alt="Student Image" />
      <h2>
        {student.firstName} {student.lastName}
      </h2>
      <p>
        <strong>Email:</strong> {student.email}
      </p>
      <p>
        <strong>GPA:</strong> {student.gpa}
      </p>

      <h3>Enrolled Campus:</h3>
      {student.campus ? (
        <p>
          <Link to={`/campuses/${student.campus.id}`}>
            {student.campus.name}
          </Link>
        </p>
      ) : (
        <p>This student is not enrolled in any campus.</p>
      )}
      <button onClick={() => navigate(`/students/${student.id}/edit`)}>
        Edit Student
      </button>

    </div>
  );
};
export default SingleStudent;
