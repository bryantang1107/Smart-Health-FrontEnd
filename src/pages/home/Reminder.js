import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Reminder = ({ reminderLength }) => {
  return (
    <section className="reminder-section">
      <div className="reminder-container">
        {reminderLength > 1 ? (
          <h1>You have {reminderLength} reminders</h1>
        ) : (
          <h1>You have {reminderLength} reminder</h1>
        )}

        <div className="underline"></div>
        <div className="reminder-info">
          <object
            data="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Doctor_with_Nurse_Cartoon.svg/1024px-Doctor_with_Nurse_Cartoon.svg.png"
            width="300"
            height="200"
            className="reminder-image"
          ></object>
        </div>
        <Link to="/reminder" className="link-reminder">
          View Reminder Details
        </Link>
      </div>
    </section>
  );
};

export default Reminder;
