import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditCampus.css";

const API_BASE = window.location.hostname === "localhost" ? "http://localhost:8080/api" : "https://crud-backend-gules-rho.vercel.app/api";

const EditCampus = () => {
    const { campusId } = useParams();
    const navigate = useNavigate();
    const [campus, setCampus] = useState(null);
    const [form, setForm] = useState({ name: "", address: "", description: "", imageUrl: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]); // For enrolled students
    const [selectedStudentId, setSelectedStudentId] = useState("");
    const [availableStudents, setAvailableStudents] = useState([]); // Students without a campus

    useEffect(() => {
        const fetchCampus = async () => {
            try {
                const { data } = await axios.get(`${API_BASE}/campuses/${campusId}`);
                setCampus(data);
                setForm({
                    name: data.name || "",
                    address: data.address || "",
                    description: data.description || "",
                    imageUrl: data.imageUrl || ""
                });
                setStudents(data.Students || data.students || []);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error("Error fetching campus:", error);
            }
        };
        const fetchAvailableStudents = async () => {
            try {
                const { data } = await axios.get(`${API_BASE}/students`);
                setAvailableStudents(data.filter(s => !s.campusId));
            } catch (error) {
                console.error("Error fetching available students:", error);
            }
        };
        fetchCampus();
        fetchAvailableStudents();
    }, [campusId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddStudent = async () => {
        if (!selectedStudentId) return;
        try {
            await axios.put(`${API_BASE}/students/${selectedStudentId}`, { campusId: Number(campusId) });
            const addedStudent = availableStudents.find(s => s.id === Number(selectedStudentId));
            setStudents(prev => [...prev, addedStudent]);
            setAvailableStudents(prev => prev.filter(s => s.id !== Number(selectedStudentId)));
            setSelectedStudentId("");
        } catch (error) {
            console.error("Error assigning student:", error);
        }
    };

    const handleRemoveStudent = async (id) => {
        try {
            await axios.put(`${API_BASE}/students/${id}`, { campusId: null });
            const removedStudent = students.find(s => s.id === id);
            setStudents(students.filter(s => s.id !== id));
            setAvailableStudents([...availableStudents, removedStudent]);
        } catch (error) {
            console.error("Error removing student from campus:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        Object.keys(form).forEach((key) => {
            if (!form[key].trim()) newErrors[key] = `${key} is required`;
        });
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;
        try {
            await axios.put(`${API_BASE}/campuses/${campusId}`, form);
            navigate(`/campuses/${campusId}`);
        } catch (error) {
            console.error("Error updating campus:", error);
        }
    };

    const handleDeleteCampus = async () => {
        if (window.confirm("Are you sure you want to delete this campus?")) {
            try {
                await axios.delete(`${API_BASE}/campuses/${campusId}`);
                navigate("/campuses");
            } catch (error) {
                console.error("Error deleting campus:", error);
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!campus) return <p>Campus not found</p>;

    return (
        <div className="edit-container">
            <h2 className="edit-title">Edit Campus</h2>
            <form onSubmit={handleSubmit} className='campus-form'>
                {form.imageUrl && (
                    <div>
                        <img src={form.imageUrl} alt="Campus" className="campus-image-preview" />
                    </div>
                )}
                <label>Name:
                    <input name="name" value={form.name} onChange={handleChange} />
                    {errors.name && <span className="error">{errors.name}</span>}
                </label>
                <br />
                <label>Address:
                    <input name="address" value={form.address} onChange={handleChange} />
                    {errors.address && <span className="error">{errors.address}</span>}
                </label>
                <br />
                <label>Description:
                    <textarea name="description" value={form.description} onChange={handleChange} />
                    {errors.description && <span className="error">{errors.description}</span>}
                </label>
                <br />
                <label>Image URL:
                    <input name="imageUrl" value={form.imageUrl} onChange={handleChange} />
                    {errors.imageUrl && <span className="error">{errors.imageUrl}</span>}
                </label>
                <br />
                <h3>Enrolled Students</h3>
                <div className="enrolled-students-list">
                    {students.length === 0 ? (
                        <div className="student-bar">No students currently enrolled.</div>
                    ) : (
                        students.map((student) => (
                            <div className="student-bar" key={student.id}>
                                <img src={student.imageUrl} alt={student.firstName} className="student-bar-image" />
                                <div className="student-bar-info">
                                    <span className="student-bar-name">{student.firstName} {student.lastName}</span>
                                    <span className="student-bar-email">{student.email}</span>
                                    <span className="student-bar-gpa">GPA: {student.gpa ?? 'N/A'}</span>
                                </div>
                                <button type="button" className="student-bar-remove" onClick={() => handleRemoveStudent(student.id)}>
                                    Remove
                                </button>
                            </div>
                        ))
                    )}
                </div>
                <label>Add Student:
                    <select value={selectedStudentId} onChange={e => setSelectedStudentId(e.target.value)}>
                        <option value="">Select student to add</option>
                        {availableStudents.map((student) => (
                            <option key={student.id} value={student.id}>
                                {student.firstName} {student.lastName}
                            </option>
                        ))}
                    </select>
                    <button type="button" onClick={handleAddStudent} disabled={!selectedStudentId} style={{ marginLeft: 8 }}>
                        Add
                    </button>
                </label>
                <br />
                <button type="submit">Save Changes</button>
                <button type="button" className="delete-campus-btn" onClick={handleDeleteCampus}>
                    Delete Campus
                </button>
            </form>
        </div>
    );
};

export default EditCampus;
