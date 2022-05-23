import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
const HowTo = () => {
  return (
    <section className="how-to-section">
      <div className="how-to-body">
        <h1>How To Use Our Features</h1>
        <p>
          Connect to Malaysian Medical Council registed doctors and get the care
          you need in 4 simple steps
        </p>
        <div className="steps">
          <h1>01</h1>
          <h2>Register</h2>
          <p>Sign up or Log In to Smart Health</p>
        </div>
        <div className="steps">
          <h1>02</h1>
          <h2>Choose your desired doctor</h2>
          <p>Book your appointments with them</p>
        </div>
        <div className="steps">
          <h1>03</h1>
          <h2 style={{ lineHeight: "1.3em" }}>
            Receive room ID and password after booking appointment
          </h2>
          <p>Use the credentials to log in to the consultation room</p>
        </div>
        <div className="steps">
          <h1>04</h1>
          <h2>After Consultation</h2>
          <p>Receive Advice and Prescriptions From Specialists</p>
        </div>
        <div className="steps">
          <h1>05</h1>
          <h2>Medical Record</h2>
          <p>Review Your Medical Record</p>
        </div>
        <div className="steps">
          <h1>06</h1>
          <h2>Online Pharmacy</h2>
          <p>Browse for information of the prescription provided</p>
        </div>
      </div>
      <Link to="/find-doctor" className="how-to-btn">
        Make An Appointment
      </Link>
      <p style={{ marginTop: "3em", fontSize: "0.7rem" }}>
        Struggling to use our website? Contact our admin for real-time customer
        support by clicking on the "Hello" button at the bottom right of the
        browser
      </p>
    </section>
  );
};

export default HowTo;
