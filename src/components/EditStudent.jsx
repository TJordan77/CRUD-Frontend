import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import "./EditStudentStyles.css"

const API_BASE = window.location.hostname === "localhost" ? "http://localhost:8080/api" : "https://crud-backend-gules-rho.vercel.app/api";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [campus, setCampus] = useState(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", gpa: "", imageUrl: "", campusId: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [availableCampuses, setAvailableCampuses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentRes, campusesRes] = await Promise.all([
          axios.get(`${API_BASE}/students/${id}`),
          axios.get(`${API_BASE}/campuses`),
        ]);

        const s = studentRes.data;
        setStudent(s);
        setForm({
          firstName: s.firstName ?? "",
          lastName: s.lastName ?? "",
          email: s.email ?? "",
          gpa: s.gpa ?? "",
          imageUrl: s.imageUrl ?? "",
          campusId: s.campusId ?? "",
        });

        const campusList = campusesRes.data;
        setAvailableCampuses(campusList);
        setCampus(campusList.find(c => c.id === s.campusId) || null);
      } catch (err) {
        console.error("Failed to load student:", err);
        navigate("/students");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  const validate = (field, value) => {
    let msg = "";
    switch (field) {
      case "firstName":
      case "lastName":
        if (!value.trim()) msg = "Required";
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) msg = "Invalid email";
        break;
      case "gpa":
        if (value === "") break;
        const num = parseFloat(value);
        if (isNaN(num) || num < 0 || num > 4) msg = "GPA 0–4";
        break;
      case "imageUrl":
        if (!value.trim()) msg = "Required";
        break;
      default:
        break;
    }
    setErrors(prev => ({ ...prev, [field]: msg }));
    return msg === "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    validate(name, value);
    if (name === "campusId") {
      const c = availableCampuses.find(cam => cam.id === Number(value));
      setCampus(c || null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const required = ["firstName", "lastName", "email", "gpa", "imageUrl"];
    const ok = required.every(f => validate(f, form[f]));
    if (!ok) return;
    try {
      await axios.put(`${API_BASE}/students/${id}`, form);
      navigate(`/students/${id}`);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update student");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this student?")) return;
    try {
      await axios.delete(`${API_BASE}/students/${id}`);
      navigate("/students");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete student");
    }
  };

  if (loading) return <p>Loading…</p>;
  if (!student) return <p>Student not found</p>;

  return (
    <div className="edit-student-container">
      <h2 className="edit-student-title">Edit Student</h2>

      {campus && (
        <p style={{ textAlign: "center", marginBottom: "1rem" }}>
          Currently enrolled in: <strong>{campus.name}</strong>
        </p>
      )}

      <form className="student-form" onSubmit={handleSubmit}>
        {form.imageUrl && (
          <div>
            <img
              src={form.imageUrl}
              alt="Student Avatar"
              className="student-image-preview"
            />
          </div>
        )}

        <label>
          First Name:
          <input name="firstName" value={form.firstName} onChange={handleChange} />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </label>

        <label>
          Last Name:
          <input name="lastName" value={form.lastName} onChange={handleChange} />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>

        <label>
          GPA (0–4):
          <input
            type="number"
            step="0.01"
            min="0"
            max="4"
            name="gpa"
            value={form.gpa}
            onChange={handleChange}
          />
          {errors.gpa && <span className="error">{errors.gpa}</span>}
        </label>

        <label>
          Image URL:
          <input name="imageUrl" value={form.imageUrl} onChange={handleChange} />
          {errors.imageUrl && <span className="error">{errors.imageUrl}</span>}
        </label>

        <label>
          Campus:
          <select name="campusId" value={form.campusId} onChange={handleChange}>
            <option value="">— None —</option>
            {availableCampuses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <div className="student-form-buttons">
          <button type="submit">Save</button>
          <button type="button" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="button" className="delete-student-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </form>
    </div>

  );
};

export default EditStudent;
