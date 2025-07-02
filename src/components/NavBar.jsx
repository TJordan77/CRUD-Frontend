import React from "react";
import { Link } from "react-router";
import "./NavBarStyles.css";

const NavBar = () => {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>
        Home
      </Link>
      <Link to="/campuses" style={styles.link}>
        Campuses
      </Link>
      <Link to="/students" style={styles.link}>
        Students
      </Link>
      <Link to="/addStudent" style={styles.link}>
        Add Students
      </Link>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: "#282c34",
    padding: "1rem",
    display: "flex",
    gap: "1rem",
  },
  link: {
    color: "#61dafb",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
};

export default NavBar;
