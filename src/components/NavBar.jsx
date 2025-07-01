import React from "react";
import "./NavBarStyles.css";

const NavBar = () => {
  return <nav className="navbar">{/* Some navbar stuff goes here */}
    <a href="/campuses">All Campuses</a>
    <a href="/students">All Students</a>

  </nav>;
};

export default NavBar;
