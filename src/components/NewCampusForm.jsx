import React, { useState } from "react";
import "./NewCampusForm.css";
import axios from "axios";

const NewCampusForm = ({ onCampusAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
  });

  const [error, setError] = useState({
    name: "",
    address: "",
  });

  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (value.trim() === "") {
      setError((prev) => ({
        ...prev,
        [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
      }));
    } else {
      setError((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.address) {
      setError({
        name: formData.name ? "" : "Name is required",
        address: formData.address ? "" : "Address is required",
      });
      return;
    }

    try {
      setApiError("");
      const { data } = await axios.post(
        "http://localhost:8080/api/campuses",
        formData
      );
      if (onCampusAdded) onCampusAdded(data);
      setFormData({
        name: "",
        address: "",
      });
    } catch (err) {
      setApiError("Error adding campus. Please try again.");
      console.error("Error adding campus:", err);
    }
  };

  return (
    <>
      <h1 className="newCampus-title">New Campus Form</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="campus-form">
          <input
            type="text"
            name="name"
            placeholder="Campus Name"
            value={formData.name}
            onChange={handleChange}
            className="input"
            required
          />
          {error.name && <p className="error-message">{error.name}</p>}

          <input
            type="text"
            name="address"
            placeholder="Campus Address"
            value={formData.address}
            onChange={handleChange}
            className="input"
            required
          />
          {error.address && <p className="error-message">{error.address}</p>}

          {apiError && <p className="error-message">{apiError}</p>}

          <input type="submit" className="submit-button" value="Add Campus" />
        </form>
      </div>
    </>
  );
};

export default NewCampusForm;
