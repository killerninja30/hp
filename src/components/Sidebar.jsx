import { NavLink } from "react-router-dom";
import { FaBox, FaClipboardList, FaFillDrip, FaCheckCircle, FaIndustry, FaHandsHelping, FaOilCan } from "react-icons/fa";

function Sidebar() {
  const pages = [
    { name: "Daily Checklist", path: "/daily-checklist", icon: <FaBox /> },
    { name: "Logbook", path: "/logbook", icon: <FaClipboardList /> },
    { name: "Filling", path: "/filling", icon: <FaFillDrip /> },
    { name: "QC", path: "/qc", icon: <FaCheckCircle /> },
    { name: "Manufacturing", path: "/manufacturing", icon: <FaIndustry /> },
    { name: "Tank Services", path: "/tank-services", icon: <FaHandsHelping /> },
    { name: "Support", path: "/support", icon: <FaOilCan /> },
  ];

  return (
    <div className="sidebar">
      {pages.map((page, index) => (
        <NavLink 
          key={index}
          to={page.path}
          className={({ isActive }) => isActive ? "sidebar-item active" : "sidebar-item"}
        >
          {page.icon} <span style={{ marginLeft: "8px" }}>{page.name}</span>
        </NavLink>
      ))}
    </div>
  );
}

export default Sidebar;
