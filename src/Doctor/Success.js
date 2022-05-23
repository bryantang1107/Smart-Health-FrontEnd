import React from "react";
import { VscVerified } from "react-icons/vsc";
import { Link } from "react-router-dom";
import "./success.css";

const Success = ({ appointmentData }) => {
  return (
    <div className="success-appointment">
      <VscVerified style={{ fontSize: "3rem", color: "#3fbbc0" }} />
      <h3 style={{ margin: "3em auto 0 auto" }}>
        <strong>Successfully booked!</strong>
      </h3>
      <div className="appointment-details">
        <h4>Appointment Details</h4>
        <h5>Name:</h5>
        <p> {appointmentData.name}</p>
        <h5>Email:</h5>
        <p>{appointmentData.email}</p>
        <h5>Phone:</h5>
        <p>Phone No: {appointmentData.phone}</p>
        <h5>Day Of Birth:</h5>
        <p> {appointmentData.dob}</p>
        <h5>Gender:</h5>
        <p> {appointmentData.gender}</p>
        <h5>Symptoms:</h5>
        <p> {appointmentData.symptoms}</p>
        <h5>Appointment Date:</h5>
        <p> {appointmentData.date}</p>
        <h5>Appointment Time:</h5>
        <p> {appointmentData.time}</p>
        <Link to="/schedule-user" className="btn green">
          Edit Information
        </Link>
      </div>

      <p style={{ margin: "3em auto", lineHeight: "1.5rem" }}>
        Appointment Booked Successfully! Get the room credentials for your
        appointment
        <Link to="/join" className="chat-link">
          Here
        </Link>
      </p>

      <Link to="/reminder" className="btn green">
        <strong>Make Reminder</strong>
      </Link>
    </div>
  );
};

export default Success;
