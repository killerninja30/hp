import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import FillingLineCard from "../components/FillingLineCard";
import fillingLinesData from "../data/fillingLines.json";
import tankDetailsData from "../data/tankDetails.json";
import "./pages.css";

const FillingLines = () => {
  const [lines, setLines] = useState([]);
  const [selectedLine, setSelectedLine] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLines(fillingLinesData);
  }, []);

  const handleLineClick = (lineId) => {
     console.log("Clicked line:", lineId);
    setSelectedLine({
      ...lines.find((line) => line.id === lineId),
      tankDetails: tankDetailsData[lineId]
    });
  };

  const filteredLines = lines.filter((line) =>
    line.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="filling-lines-container">
      <div className="filling-lines-header">
        <h2 className="filling-lines-title">Filling Lines</h2>
        <SearchBar setSearchTerm={setSearchTerm} />
      </div>

      <div className="filling-lines-grid">
        {filteredLines.length > 0 ? (
          filteredLines.map((line) => (
            <FillingLineCard key={line.id} line={line} onClick={() => handleLineClick(line)} />
          ))
        ) : (
          <p>No filling lines found</p>
        )}
      </div>

      {selectedLine && (
        <div className="tank-details">
          <h3>{selectedLine.name} - Tank Info</h3>
          <p>ID: {selectedLine.tankDetails?.tankId}</p>
          <p>Status: {selectedLine.tankDetails?.status}</p>
          <p>Volume: {selectedLine.tankDetails?.volume}</p>
        </div>
      )}
    </div>
  );
};

export default FillingLines;
