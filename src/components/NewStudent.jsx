import React, { useState } from 'react'
import "./newStudentStyle.css"
import axios from 'axios'

const NewStudent = () => {
    const [studentInfo, setStudentInfo] = useState({
        firstName: "",
        lastName: "",
        email: ""
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(studentInfo)
        try {
            await axios.post("http://localhost:8080/api/students", {
                studentInfo,
            })
        } catch (err) {
            console.log("Error adding a new Student!", err)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setStudentInfo((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <>
            <h1 className="newStudent-title">New Student Form</h1>
            <div className="form-container">

                <form onSubmit={handleSubmit} className='student-form'>
                    <input type="text" name="firstName" placeholder="First name" onChange={handleChange} value={studentInfo.firstName} required />
                    <input type="text" name="lastName" placeholder="Last name" onChange={handleChange} value={studentInfo.lastName} required />
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} value={studentInfo.email} required />

                    <input type="submit" className='submit-button' />
                </form>
            </div>
        </>
    )
}

export default NewStudent
