import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllCampuses = () => {
  const [campuses, setCampuses] = useState([]);

const apiUrl = "https://crud-backend-gules-rho.vercel.app";
  useEffect(() => {
    axios.get(`http://localhost:8080/api/campuses`)
      .then((res) => setCampuses(res.data))
      .catch((err) => console.error("Error loading campuses:", err));
  }, []);

  return (
    <div>
      <h2>All Campuses</h2>
      {campuses.length === 0 ? (
        <p>No campuses found.</p>
      ) : (
        <ul>
          {campuses.map((campus) => (
            <li key={campus.id}>
              <Link to={`/campuses/${campus.id}`}>
                <img src={campus.imageUrl} alt={campus.name} width="100" />
                <br />
                {campus.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllCampuses;
