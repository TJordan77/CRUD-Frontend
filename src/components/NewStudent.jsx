import React, { useEffect, useState } from "react";
import "./newStudentStyle.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = window.location.hostname === "localhost" ? "http://localhost:8080/api" : "https://crud-backend-gules-rho.vercel.app/api";

const NewStudent = () => {
  const [studentInfo, setStudentInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gpa: "",
    imageUrl: "",
    campusId: "",
  });

  const [campuses, setCampuses] = useState([]);
  const [error, setError] = useState(null);

  async function fetchAllCampuses() {
    try {
      const response = await axios.get(`${API_BASE}/campuses`);
      setCampuses(response.data);
    } catch (err) {
      console.log("Error fetching all Campuses!", err);
    }
  }

  useEffect(() => {
    fetchAllCampuses();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(`${API_BASE}/students`, studentInfo);
      if (data && data.id) {
        navigate(`/students/${data.id}`);
      }
    } catch (err) {
      console.log("Error adding a new Student!", err);
      setError("Failed to submit. Please try again.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStudentInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="new-student-form">
          <h1>New Student Form</h1>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            onChange={handleChange}
            value={studentInfo.firstName}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            onChange={handleChange}
            value={studentInfo.lastName}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={studentInfo.email}
            required
          />
          <input
            type="number"
            name="gpa"
            placeholder="GPA"
            onChange={handleChange}
            value={studentInfo.gpa}
            min="0"
            max="4"
            step="0.01"
            required
          />
          <input
            type="url"
            name="imageUrl"
            placeholder="Student Image URL"
            onChange={handleChange}
            value={studentInfo.imageUrl}
          />
          <label htmlFor="campuses">Select a Campus:</label>
          <select
            name="campusId"
            id="campuses"
            value={studentInfo.campusId}
            onChange={handleChange}
            required
          >
            <option value="">-- Select a Campus --</option>
            {campuses.map((campus) => (
              <option key={campus.id} value={campus.id}>
                {campus.name}
              </option>
            ))}
          </select>

          <input type="submit" className="submit-button" />
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default NewStudent;
