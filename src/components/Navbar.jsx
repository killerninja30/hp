import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "../css/Nav.css";

function Navbar({ onToggleSidebar }) {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    fetch("/users.json")
      .then((res) => res.json())
      .then((data) => setUser(data[0])) // example: first user
      .catch((err) => console.error("Error loading user:", err));
  }, []);

  const getInitials = (name) =>
    name ? name.split(" ").map((n) => n[0]).join("") : "";

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="navbar">
      {/* Left side: toggle + brand */}
      <div className="navbar-left">
        <button className="menu-toggle" onClick={onToggleSidebar}>
          <FaBars />
        </button>

        <h1 className="navbar-brand">Hempel</h1>
      </div>

      {/* Right side: user profile */}
      {user && (
        <div className="profile-container">
          <div
            className="profile-logo"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {getInitials(user.name)}
          </div>
          {menuOpen && (
            <div className="profile-menu">
              <p onClick={handleLogout}>Logout</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
