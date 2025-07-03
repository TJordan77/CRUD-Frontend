import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = window.location.hostname === "localhost" ? "http://localhost:8080/api" : "https://crud-backend-gules-rho.vercel.app/api";

const SingleCampus = () => {
  const { campusId } = useParams();
  const Navigate = useNavigate();
  const [campus, setCampus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampus = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/campuses/${campusId}`);
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
      {campus.imageUrl && (
        <img
          src={campus.imageUrl}
          alt={campus.name}
          className="campus-image-preview"
        />
      )}
      <h2>{campus.name}</h2>
      <p>
        <strong>Address:</strong>
        {campus.address}
      </p>
      <p>
        <strong>Description:</strong>
        {campus.description}
      </p>

      <h3>
        Enrolled Students: <span>{enrolled.length}</span>
      </h3>
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
      <button
        onClick={() => Navigate(`/campuses/${campusId}/edit`)}
        className="edit-campus-btn"
      >
        Edit Campus
      </button>
    </div>
  );
};

export default SingleCampus;
