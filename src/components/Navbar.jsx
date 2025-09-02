import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch user data from public/users.json
  useEffect(() => {
    fetch("/users.json")
      .then((res) => res.json())
      .then((data) => {
        // Example: assuming first user is logged in
        setUser(data[0]);
      })
      .catch((err) => console.error("Error loading user:", err));
  }, []);

  const getInitials = (name) =>
    name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
      : "";

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <h1 className="navbar-brand">Hempel</h1>

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
