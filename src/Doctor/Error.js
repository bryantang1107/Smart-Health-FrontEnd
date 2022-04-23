import React from "react";
import "./success.css";

const Error = ({ error, handleError }) => {
  return (
    <div className="time-slot-error">
      <h3 className="alert-primary">{error}</h3>
      <div className="cloak__wrapper">
        <div className="cloak__container">
          <div className="cloak"></div>
        </div>
      </div>
      <div className="info">
        <button onClick={handleError} className="book-appointment-btn">
          Try Other Slot
        </button>
      </div>
    </div>
  );
};

export default Error;
