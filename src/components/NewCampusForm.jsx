import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NewCampusForm.css";
import axios from "axios";

const NewCampusForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
    imageUrl: "",
  });

  const [error, setError] = useState({
    name: "",
    address: "",
    description: "",
    imageUrl: "",
  });

  const [apiError, setApiError] = useState("");
  const [students, setStudents] = useState([]);
  const [enrolled, setEnrolled] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/api/students");
        setStudents(data);
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };
    fetchStudents();
  }, []);

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

  const handleStudentSelect = (e) => {
    const studentId = e.target.value;
    if (studentId && !enrolled.some((student) => student.id === studentId)) {
      const studentObj = students.find((s) => String(s.id) === studentId);
      if (studentObj) setEnrolled((prev) => [...prev, studentObj]);
    }
    setSelectedStudent("");
  };

  const handleRemoveStudent = (id) => {
    setEnrolled((prev) => prev.filter((student) => student.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.address) {
      setError({
        ...error,
        name: formData.name ? "" : "Name is required",
        address: formData.address ? "" : "Address is required",
      });
      return;
    }

    try {
      setApiError("");
      // Send campus data with enrolled student IDs
      await axios.post("http://localhost:8080/api/campuses", {
        ...formData,
        studentIds: enrolled.map((s) => s.id),
      });
      setFormData({
        name: "",
        address: "",
        description: "",
        imageUrl: "",
      });
      setEnrolled([]);
      navigate("/campuses");
    } catch (err) {
      setApiError("Error adding campus. Please try again.");
      console.error("Error adding campus:", err);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="new-campus-form">
        <h1>New Campus Form</h1>
        <input
          type="text"
          name="name"
          placeholder="Campus Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {error.name && <p className="error">{error.name}</p>}

        <input
          type="text"
          name="address"
          placeholder="Campus Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        {error.address && <p className="error">{error.address}</p>}

        <textarea
          name="description"
          placeholder="Campus Description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          style={{ resize: "vertical", marginBottom: "1rem" }}
        />
        {error.description && <p className="error">{error.description}</p>}

        <input
          type="url"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
        />
        {error.imageUrl && <p className="error">{error.imageUrl}</p>}

        <label htmlFor="student-select">
          <strong>Enroll Students:</strong>
        </label>
        <select
          id="student-select"
          value={selectedStudent}
          onChange={(e) => {
            setSelectedStudent(e.target.value);
            handleStudentSelect(e);
          }}
        >
          <option value="">-- Select a Student --</option>
          {students
            .filter((s) => !enrolled.some((e) => e.id === s.id))
            .map((student) => (
              <option key={student.id} value={student.id}>
                {student.firstName} {student.lastName} ({student.email})
              </option>
            ))}
        </select>

        {enrolled.length > 0 && (
          <div style={{ marginTop: "1rem" }}>
            <strong>Enrolled Students:</strong>
            <ul style={{ paddingLeft: "1.2rem" }}>
              {enrolled.map((student) => (
                <li key={student.id} style={{ marginBottom: "0.3rem" }}>
                  {student.firstName} {student.lastName} ({student.email}){" "}
                  <button
                    type="button"
                    onClick={() => handleRemoveStudent(student.id)}
                    style={{
                      marginLeft: "0.5rem",
                      color: "#fff",
                      background: "#e63946",
                      border: "none",
                      borderRadius: "4px",
                      padding: "2px 8px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {apiError && <p className="error">{apiError}</p>}
        <input type="submit" className="submit-button" value="Add Campus" />
      </form>
    </div>
  );
};

export default NewCampusForm;
