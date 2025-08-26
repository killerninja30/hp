import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import "../App.css";

function Dashboard() {
  const [selectedItem, setSelectedItem] = useState("");

  return (
    <div className="app-container">
      <Navbar />
      <div className="main-layout">
        <Sidebar onSelect={setSelectedItem} />
        <Content selectedItem={selectedItem} />
      </div>
    </div>
  );
}

export default Dashboard;
