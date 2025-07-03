import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditCampus = () => {
    const { campusId } = useParams();
    const [campus, setCampus] = useState(null);
    const [form, setForm] = useState({ name: "", address: "", description: "", imageUrl: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    // We'll want to handle enrolled students soon
    const [students, setStudents] = useState([]); // For enrolled students
    const [selectedStudent, setSelectedStudent] = useState("");

    useEffect(() => {
        const fetchCampus = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8080/api/campuses/${campusId}`);
                setCampus(data);
                setForm({
                    name: data.name || "",
                    address: data.address || "",
                    description: data.description || "",
                    imageUrl: data.imageUrl || ""
                });
                setStudents(data.Students || []);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error("Error fetching campus:", error);
            }
        };
        fetchCampus();
    }, [campusId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddStudent = () => {
        if (selectedStudent && !students.some(s => s.id === selectedStudent.id)) {
            setStudents([...students, selectedStudent]);
            setSelectedStudent("");
        }
    };

    const handleRemoveStudent = (id) => {
        setStudents(students.filter(s => s.id !== id));
    };

    if (loading) return <p>Loading...</p>;
    if (!campus) return <p>Campus not found</p>;

    return (
        <div>
            <h2>Edit Campus</h2>
            <form>
                <label>Name:
                    <input name="name" value={form.name} onChange={handleChange} />
                </label>
                <br />
                <label>Address:
                    <input name="address" value={form.address} onChange={handleChange} />
                </label>
                <br />
                <label>Description:
                    <textarea name="description" value={form.description} onChange={handleChange} />
                </label>
                <br />
                <label>Image URL:
                    <input name="imageUrl" value={form.imageUrl} onChange={handleChange} />
                </label>
                <br />
                {/* Enrolled Students List */}
                <h3>Enrolled Students</h3>
                <ul>
                    {students.map((student) => (
                        <li key={student.id}>
                            {student.firstName} {student.lastName}
                            <button type="button" onClick={() => handleRemoveStudent(student.id)} style={{ marginLeft: 8 }}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
                {/* Dropdown for adding students (to be implemented with available students) */}
                {/* <select value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)}>
                    <option value="">Select student to add</option>
                    {/* Map available students here */}
                {/* </select>
                <button type="button" onClick={handleAddStudent}>Add Student</button> */}
            </form>
        </div>
    );
};

export default EditCampus;
