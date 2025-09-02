import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import "../App.css";

function Dashboard() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-layout">
        <Sidebar />
        <div className="content">
          <Outlet /> {/* Renders the selected route's page */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
