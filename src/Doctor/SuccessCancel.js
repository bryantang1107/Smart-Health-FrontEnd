import React from "react";
import "./success.css";
import { VscVerified } from "react-icons/vsc";

const SuccessCancel = () => {
  return (
    <div
      className="success-appointment"
      style={{
        marginTop: "5em",
        marginBottom: "5em",
        minHeight: "70vh",
      }}
    >
      <VscVerified style={{ fontSize: "3rem", color: "#3fbbc0" }} />
      <h3 style={{ margin: "3em auto 0 auto" }}>
        <strong>Successfully Cancelled!</strong>
      </h3>
      <p style={{ margin: "3em auto", lineHeight: "1.5rem" }}>
        Appointment Cancelled Successfully! Thank You For Using smart Health !
      </p>

      <a href="/" className="btn green">
        <strong>Done</strong>
      </a>
    </div>
  );
};

export default SuccessCancel;
