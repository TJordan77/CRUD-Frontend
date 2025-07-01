import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import NavBar from "./NavBar";

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to the Campus Management System</h1>
      <p>
        This is a simple application to manage campuses and students. You can
        view details of individual campuses and students by clicking on the
        links above on the NavBar.
      </p>
    </div>
  );
};
export default Home;
