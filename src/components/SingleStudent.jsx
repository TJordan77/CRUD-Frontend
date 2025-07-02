import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleStudent = () => {
  const { studentId } = useParams();
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
      {student.Campus ? (
        <p>
          <Link to={`/campuses/${student.Campus.id}`}>
            {student.Campus.name}{" "}
          </Link>
        </p>
      ) : (
        <p>This student is not enrolled in any campus.</p>
      )}
    </div>
  );
};
export default SingleStudent;
