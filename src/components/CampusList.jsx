import React from "react";
import "./CampusListStyle.css";
import { useState, useEffect } from "react";
import axios from "axios";
import NewCampusForm from "./NewCampusForm";
import { Link } from "react-router-dom";

const CampusList = () => {
  const [campuses, setCampuses] = useState([]);

  const API_BASE = window.location.hostname === "localhost" ? "http://localhost:8080/api" : "https://crud-backend-gules-rho.vercel.app/api";


  async function fetchAllCampuses() {
    try {
      const response = await axios.get(`${API_BASE}/campuses`);
      console.log("Campus API Response:", response.data);
      setCampuses(response.data);
    } catch (error) {
      console.error("Error fetching Campuses", error);
    }
  }

  useEffect(() => {
    fetchAllCampuses();
  }, []);

  return (
    <>
      <h1 className="campus-list-title">All Campuses</h1>
      <div className="link-container" style={{ marginBottom: "1.5rem" }}>
        <Link className="add-campus-button" to="/addCampus">
          + Add Campus
        </Link>
      </div>
      <div className="campus-container">
        {campuses && campuses.length > 0 ? (
          campuses.map((campus) => (
            <Link
              to={`/campuses/${campus.id}`}
              key={campus.id}
              className="campus-card-link"
            >
              <div className="campus-card">
                <img
                  src={campus.imageUrl}
                  alt={campus.name}
                  className="campus-image"
                />
                <h2 className="campus-name">{campus.name}</h2>
              </div>
            </Link>
          ))
        ) : (
          <p className="error-message">No campuses found.</p>
        )}
      </div>
    </>
  );
};

export default CampusList;
