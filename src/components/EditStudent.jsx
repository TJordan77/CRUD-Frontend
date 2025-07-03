import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router";
import axios from "axios";

const API_BASE = "http://localhost:8080/api";

const EditStudent = () => {
  const {id} = useParams();                   
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gpa: "",
    campusId: "",
  });
  const [errors, setErrors] = useState({});
  const [campuses, setCampuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentRes, campusRes] = await Promise.all([
          axios.get(`${API_BASE}/students/${id}`),
          axios.get(`${API_BASE}/campuses`),
        ]);
        const s = studentRes.data;
        setFormData({
          firstName: s.firstName ?? "",
          lastName:  s.lastName  ?? "",
          email:     s.email     ?? "",
          gpa:       s.gpa       ?? "",
          campusId:  s.campusId  ?? "",
        });
        setCampuses(campusRes.data);
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
        if (isNaN(num) || num < 0 || num > 4) msg = "GPA must be 0–4";
        break;
      default:
        break;
    }
    setErrors(prev => ({ ...prev, [field]: msg }));
    return msg === "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validate(name, value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = ["firstName", "lastName", "email", "gpa"];
    const valid = fields.every(f => validate(f, formData[f]));
    if (!valid) return;
    try {
      await axios.put(`${API_BASE}/students/${id}`, formData);
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

  return (
    <div className="mx-auto max-w-xl p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Edit Student</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block font-medium">First Name</label>
          <input
            className="w-full border rounded p-2"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
        </div>

        <div>
          <label className="block font-medium">Last Name</label>
          <input
            className="w-full border rounded p-2"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            className="w-full border rounded p-2"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <label className="block font-medium">GPA (0–4)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="4"
            className="w-full border rounded p-2"
            name="gpa"
            value={formData.gpa}
            onChange={handleChange}
          />
          {errors.gpa && <p className="text-red-500 text-sm">{errors.gpa}</p>}
        </div>

        <div>
          <label className="block font-medium">Campus</label>
          <select
            name="campusId"
            value={formData.campusId}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="">— None —</option>
            {campuses.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
          <button type="button" onClick={() => navigate(-1)} className="border px-4 py-2 rounded">Cancel</button>
          <button type="button" onClick={handleDelete} className="ml-auto bg-red-500 text-white px-4 py-2 rounded">Delete</button>
        </div>
      </form>
    </div>
  );
};

export default EditStudent;
