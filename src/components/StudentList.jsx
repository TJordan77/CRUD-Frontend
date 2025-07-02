import "./StudentListStyle.css"
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Link } from "react-router";
import NewStudent from "./NewStudent";


const StudentList = () => {
    const [students, setStudents] = useState([]);

    const apiUrl = "https://crud-backend-gules-rho.vercel.app";
    async function fetchAllStudents() {
        try {
            const response = await axios.get(`http://localhost:8080/api/students`);
            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching Students", error);
        }
    }

    useEffect(() => {
        fetchAllStudents();
    }, []);



    return (
        <>
            <h1 className="students-list-title">All Students</h1>
            <div className="link-container">
                <Link className="add-student-button" to={'/addStudent'}>+ Add Student</Link>
            </div>
            <div className="students-container">
                {students && students.length > 0 ? (
                    students.map((student, index) => (
                        <div className="students-card" key={index}>
                            <h2 className="students-first-name">
                                {student.firstName}, {student.lastName}
                            </h2>
                        </div>
                    ))
                ) : (
                    <p className="error-message">No Students found.</p>
                )}
            </div>
        </>
    );
};

export default StudentList;
