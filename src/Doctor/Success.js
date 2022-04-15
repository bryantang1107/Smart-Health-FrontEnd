import React from "react";
import { VscVerified } from "react-icons/vsc";
import "./success.css";

const Success = () => {
  return (
    <div className="success-appointment">
      <VscVerified style={{ fontSize: "3rem", color: "#3fbbc0" }} />
      <h3 style={{ margin: "3em auto 0 auto" }}>
        <strong>Successfully booked!</strong>
      </h3>
      <p style={{ margin: "3em auto", lineHeight: "1.5rem" }}>
        Appointment Booked Successfully! Get the room credentials for your
        appointment
        <a href="/join" className="chat-link">
          Here
        </a>
      </p>

      <a href="/" className="done-booking-btn">
        <strong>Done</strong>
      </a>
    </div>
  );
};

export default Success;
