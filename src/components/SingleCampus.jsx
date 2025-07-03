import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SingleCampus = () => {
  const { campusId } = useParams();
  const navigate = useNavigate();
  const [campus, setCampus] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = "https://crud-backend-gules-rho.vercel.app";
  useEffect(() => {
    const fetchCampus = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/campuses/${campusId}`
        );
        setCampus(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching campus data:", error);
        setLoading(false);
      }
    };

    fetchCampus();
  }, [campusId]);

  if (loading) return <p>Loading....</p>;
  if (!campus) return <p>Campus not found..</p>;

  const enrolled = campus.Students || campus.students || [];

  return (
    <div className="single-campus">
      <h2>{campus.name}</h2>
      <button onClick={() => navigate(`/campuses/${campusId}/edit`)}>
        Edit Campus
      </button>
      <p>
        <strong>Address:</strong>
        {campus.address}
      </p>
      <p>
        <strong>Description:</strong>
        {campus.description}
      </p>

      <h3>Enrolled Students:</h3>
      {enrolled.length ? (
        <ul>
          {enrolled.map((student) => (
            <li key={student.id}>
              <Link to={`/students/${student.id}`}>
                {student.firstName} {student.lastName}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No students currently enrolled at this campus.</p>
      )}
    </div>
  );
};

export default SingleCampus;
