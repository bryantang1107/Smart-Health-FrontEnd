import React from "react";
import { GoCalendar } from "react-icons/go";
import { Link } from "react-router-dom";

const Appointment = ({ appointmentData, doctorData }) => {
  return (
    <div className="upcoming-appointment">
      <div className="appointment">
        <GoCalendar style={{ minWidth: "50px" }} />
        <h4>You have an upcoming appointment</h4>
      </div>
      <div
        className="appointment"
        style={{ flexDirection: "column", alignItems: "start" }}
      >
        <p>
          <strong>Date: </strong>
          {appointmentData?.date}
        </p>
        <p>
          <strong>Time: </strong> {appointmentData?.time}
        </p>
        <p>
          <strong>Name: </strong> {doctorData?.name}
        </p>
        <Link
          to="/schedule-user"
          style={{ color: "#ffbbc0", textDecoration: "underline" }}
        >
          View Appointment Details
        </Link>
      </div>
    </div>
  );
};

export default Appointment;
