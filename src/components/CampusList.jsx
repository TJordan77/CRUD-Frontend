import React from "react";
import "./CampusListStyle.css";
import { useState, useEffect } from "react";
import axios from "axios";
import NewCampusForm from "./NewCampusForm";

const CampusList = () => {
  const [campus, setCampuses] = useState([]);

const apiUrl = "https://crud-backend-gules-rho.vercel.app";
  async function fetchAllCampuses() {
    try {
      const response = await axios.get(`http://localhost:8080/api/campuses`);
      setCampuses(response.data);
    } catch {
      console.error("Error fetching Campuses", error);
    }
  }

  useEffect(() => {
    fetchAllCampuses();
  }, []);

  return (
    <>
      <h1 className="campus-list-title">All Campuses</h1>
      <div className="campus-container">
        {campus && campus.length > 0 ? (
          campus.map((campuses, index) => (
            <div className="campus-card" key={index}>
              <img
                src={campuses.imageURL}
                alt={campuses.name}
                className="campus-image"
              />
              <h2 className="campus-name">{campuses.name}</h2>
            </div>
          ))
        ) : (
          <p className="error-message">No campuses found.</p>
        )}
      </div>
    </>
  );
};

export default CampusList;
