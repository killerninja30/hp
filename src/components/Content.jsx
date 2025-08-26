import React from "react";
import FillingLines from "../pages/FillingLines";
import Daily from "../pages/Daily";
import Logbook from "../pages/Logbook";
import QC from "../pages/QC";
import Manufacturing from "../pages/Manufacturing";
import TankServices from "../pages/TankServices";
import { useSelector } from "react-redux";

import Support from "../pages/Support";

const pageComponents = {
  "Daily Checklist": Daily,
  "Logbook": Logbook,
  "Filling": FillingLines,
  "QC": QC,
  "Manufacturing": Manufacturing,
  "Tank Services": TankServices,
  "Support": Support,
};



function Content() {
  const selectedItem = useSelector((state) => state.page.selectedItem);
  const PageToRender = pageComponents[selectedItem];
  return (
    <div className="content">
      {PageToRender ? <PageToRender /> : <h2>Select a page from Sidebar</h2>}
    </div>
  );
}

export default Content;
