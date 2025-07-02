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
      const response = await axios.get("http://localhost:8080/api/campuses");
      setCampuses(response.data);
    } catch (error) {
      console.error("Error fetching Campuses", error);
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this campus?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/campuses/${id}`);
      setCampuses((prevCampuses) => prevCampuses.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error deleting campus", error);
    }
  };

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
                src={campuses.imageUrl}
                alt={campuses.name}
                className="campus-image"
              />
              <h2 className="campus-name">{campuses.name}</h2>
              <button className="delete-button" onClick={() => handleDelete(campuses.id)}>
                Delete
              </button>
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
