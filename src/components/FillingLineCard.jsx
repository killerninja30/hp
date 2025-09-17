import React from "react";
import fillingImage from "../assets/filling.png";
import "../css/FLcard.css";

const FillingLineCard = ({ line, onClick }) => {
  return (
    <div className="filling-line-card" onClick={onClick}>
      <h3 className="j">{line.name}</h3>
      <img src={fillingImage} alt="Filling Line" className="filling-line-img" />
      <p className="line_n">Line Number: {line.id}</p>
    </div>
  );
};

export default FillingLineCard;
