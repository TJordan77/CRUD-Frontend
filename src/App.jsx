import React from "react";
import { createRoot } from "react-dom/client";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import CampusList from "./components/CampusList";
import StudentList from "./components/StudentList";


const App = () => {
  return (
    <div>
      <NavBar />
      <div>
        <Routes>{/* Currently, we don't have any routes defined */}
          <Route path="/campuses" element={<CampusList />}></Route>
          <Route path="/students" element={<StudentList />}></Route>
        </Routes>
      </div>
    </div>
  );
};

// We're using React Router to handle the navigation between pages.
// It's important that the Router is at the top level of our app,
// and that we wrap our entire app in it. With this in place, we can
// declare Routes, Links, and use useful hooks like useNavigate.
const root = createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
