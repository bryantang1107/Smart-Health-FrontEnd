import React from "react";
import "./nodoctor.css";

const Arrow = ({ goBack }) => {
  return (
    <div className="arrow-appointment-container">
      <div className="arrow-appointment" onClick={() => goBack()}></div>
    </div>
  );
};

export default Arrow;
