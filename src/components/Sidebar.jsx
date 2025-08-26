import { useDispatch } from "react-redux";
import { setSelectedItem } from "../redux/pageSlice";
//import { RxTextAlignJustify } from "react-icons/rx";
import {FaBox,FaClipboardList,FaFillDrip,FaCheckCircle,FaIndustry,FaHandsHelping,FaOilCan} from "react-icons/fa";
function Sidebar() {
  const dispatch = useDispatch();
  

    const pageIcons = {
    "Daily Checklist": <FaBox />,
    "Logbook": <FaClipboardList />,
    "Filling": <FaFillDrip />,
    "QC": <FaCheckCircle />,
    "Manufacturing": <FaIndustry />,
    "Tank Services": <FaHandsHelping />,
    "Support": <FaOilCan />,
  };

const pages = Object.keys(pageIcons);

  return (
    <div className="sidebar">
      <div className="sidebarhead">
       
        {pages.map((page, index) => (
          <div
            key={index}
            className="sidebar-item"
            onClick={() => dispatch(setSelectedItem(page))}
          >
            {pageIcons[page]} <span style={{ marginLeft: "8px" }}>{page}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Sidebar;
