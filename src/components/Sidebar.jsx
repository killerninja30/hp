import { NavLink } from "react-router-dom";
import { FaBox, FaClipboardList, FaFillDrip, FaCheckCircle, FaIndustry, FaHandsHelping, FaOilCan } from "react-icons/fa";
import styles from "../css/Sidebar.module.css";

function Sidebar({ isOpen }) {
  const pages = [
    { name: "Daily Checklist", path: "/daily-checklist", icon: <FaBox /> },
    { name: "Logbook", path: "/logbook", icon: <FaClipboardList /> },
    { name: "Filling", path: "/filling", icon: <FaFillDrip /> },
    { name: "QC", path: "/qc", icon: <FaCheckCircle /> },
    { name: "Manufacturing", path: "/manufacturing", icon: <FaIndustry /> },
    { name: "Tank Services", path: "/tank-services", icon: <FaHandsHelping /> },
    { name: "Support", path: "/support", icon: <FaOilCan /> },
  ];

  const sidebarClass = isOpen ? styles.sidebar : `${styles.sidebar} ${styles.closedSidebar}`;

  return (
    <div className={sidebarClass}>
      {pages.map((page, index) => (
        <NavLink
          key={index}
          to={page.path}
          className={({ isActive }) =>
            isActive ? `${styles.sidebarItem} ${styles.activeItem}` : styles.sidebarItem
          }
        >
          {page.icon}
          {isOpen && <span>{page.name}</span>}
        </NavLink>
      ))}
    </div>
  );
}

export default Sidebar;
