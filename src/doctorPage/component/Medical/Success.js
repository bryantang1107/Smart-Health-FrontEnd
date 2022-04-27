import React from "react";
import { MdDoneAll } from "react-icons/md";
import "./success.css";

const Success = ({ setState }) => {
  return (
    <div className="success-page">
      <span className="success-logo">
        <MdDoneAll />
      </span>
      <h4>SUCCESS</h4>
      <p>Congratulations, you have uploaded your patient's medical record</p>
      <button className="btn green" onClick={() => setState(true)}>
        Go Back
      </button>
    </div>
  );
};

export default Success;
