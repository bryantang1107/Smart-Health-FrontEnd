import React from "react";
import "./success.css";

const Error = ({ error, handleError }) => {
  return (
    <div className="time-slot-error">
      <h3 className="alert-primary">{error}</h3>
      <div class="cloak__wrapper">
        <div class="cloak__container">
          <div class="cloak"></div>
        </div>
      </div>
      <div class="info">
        <button onClick={handleError} className="book-appointment-btn">
          Try Other Slot
        </button>
      </div>
    </div>
  );
};

export default Error;
