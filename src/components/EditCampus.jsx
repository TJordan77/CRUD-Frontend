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
    // const [students, setStudents] = useState([]); // For enrolled students

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
                // setStudents(data.Students || []); // Save enrolled students for later use
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error("Error fetching campus:", error);
            }
        };
        fetchCampus();
    }, [campusId]);

    if (loading) return <p>Loading...</p>;
    if (!campus) return <p>Campus not found</p>;

    return (
        <div>
            <h2>Edit Campus</h2>
        </div>
    );
};

export default EditCampus;
