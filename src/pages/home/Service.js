import React from "react";
import "./home.css";
import { FaHeartbeat, FaPills, FaHospitalUser } from "react-icons/fa";
import { RiHealthBookFill } from "react-icons/ri";
import { MdCoronavirus } from "react-icons/md";
import { BsJournalMedical } from "react-icons/bs";
const Service = () => {
  return (
    <section id="service-section">
      <div className="service-title">
        <h1 className="header">SERVICES</h1>
        <div className="underline"></div>
        <p style={{ letterSpacing: "0.1em", lineHeight: "2em" }}>
          Smart Health Strives To Become The Best Online HealthCare Provider.{" "}
          <br></br>
          <strong>Services That Smart Health Offers:</strong>
        </p>
      </div>
      <div className="service-body">
        <div className="service-item">
          <span className="bg-icon">
            <FaHeartbeat></FaHeartbeat>
          </span>
          <h3>Online Consultation</h3>
          <div className="underline"></div>
          <p>We Offer Free Virtual Consultation For Our User</p>
        </div>
        <div className="service-item">
          <span className="bg-icon">
            <FaPills></FaPills>
          </span>
          <h3>Online Pharmacy</h3>
          <div className="underline"></div>
          <p>
            Get Reliable And Detailed Information Of Medications In Our Online
            Pharmacy
          </p>
        </div>
        <div className="service-item">
          <span className="bg-icon">
            <FaHospitalUser></FaHospitalUser>
          </span>
          <h3>Consult Specialist</h3>
          <div className="underline"></div>
          <p>Smart Health Offers The Best Doctors Across Malaysia</p>
        </div>
        <div className="service-item">
          <span className="bg-icon">
            <RiHealthBookFill></RiHealthBookFill>
          </span>
          <h3>Health Forum</h3>
          <div className="underline"></div>
          <p>
            Get Reliable Information From Health Forum To Get The Latest
            Health-related News
          </p>
        </div>
        <div className="service-item">
          <span className="bg-icon">
            <BsJournalMedical></BsJournalMedical>
          </span>
          <h3>Medical Record</h3>
          <div className="underline"></div>
          <p>
            Easy-access To Your Medical Record. Do Access Your Medical Record
            After Consultation
          </p>
        </div>
        <div className="service-item">
          <span className="bg-icon">
            <MdCoronavirus></MdCoronavirus>
          </span>
          <h3>Covid Tracker & Articles</h3>
          <div className="underline"></div>
          <p>Access To Realtime Built-in Covid Tracking System </p>
        </div>
      </div>
    </section>
  );
};

export default Service;
