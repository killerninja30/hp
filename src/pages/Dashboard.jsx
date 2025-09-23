import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import "../App.css";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="app-container">
      <Navbar onToggleSidebar={handleToggleSidebar} />
      <div className="main-layout">
        <Sidebar isOpen={sidebarOpen} />
        <div
          className={`content ${
            sidebarOpen ? "sidebar-open" : "sidebar-closed"
          }`}
        >
          <Outlet /> {/* Renders the selected route's page */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
