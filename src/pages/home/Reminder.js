import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Reminder = ({ data }) => {
  return (
    <section className="reminder-section">
      <div className="reminder-container">
        <h1>Upcoming Schedule</h1>
        <div className="underline"></div>
        <div className="reminder-info">
          <table className="reminder-content">
            <thead>
              <tr>
                <th>Label</th>
                <th>Meeting Platform</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                const { label, platform, description } = item;
                return (
                  <tr>
                    <td>{label}</td>
                    <td>{platform}</td>
                    <td>{description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <object
            data="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Doctor_with_Nurse_Cartoon.svg/1024px-Doctor_with_Nurse_Cartoon.svg.png"
            width="300"
            height="200"
            className="reminder-image"
          ></object>
        </div>
        <Link to="/reminder" className="link-reminder">
          View Appointment Details
        </Link>
      </div>
    </section>
  );
};

export default Reminder;
