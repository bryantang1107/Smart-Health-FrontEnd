import React from "react";
import "./nodoctor.css";

const Arrow = ({ goBack }) => {
  return (
    <div className="arrow-appointment-container">
      <div className="arrow-appointment" onClick={() => goBack()}></div>
      <p
        className="alert-primary"
        style={{ backgroundColor: "#3fbbc0", color: "#f6f6f6" }}
      >
        Disclaimer: You are only entitled to 1 hour of free consultation per
        booking. To extend your consultation, please book the consultation with
        the same doctor again.
      </p>
    </div>
  );
};

export default Arrow;
