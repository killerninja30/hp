import React from "react";

const SearchBar = ({ setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        width: "250px",
      }}
    />
  );
};

export default SearchBar;
