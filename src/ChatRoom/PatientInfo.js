import React from "react";
import {
  faIdCard,
  faEnvelope,
  faSquarePhone,
  faCalendarDays,
  faMarsAndVenus,
  faSquareVirus,
  faCakeCandles,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import "./video.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PatientInfo = () => {
  const data = JSON.parse(localStorage.getItem("appointment"));

  return (
    <div className="appointment-user-info">
      <h1>Patient Information</h1>
      <div className="underline"></div>
      {data && data.gender === "male" ? (
        <img
          src="https://www.shareicon.net/data/512x512/2015/09/18/103160_man_512x512.png"
          alt="male-image"
        />
      ) : (
        <img
          src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png"
          alt="female-image"
        />
      )}
      <div className="appointment-item-container">
        <div className="appointment-item">
          <span className="item-logo" data-tooltip="Name">
            <FontAwesomeIcon icon={faIdCard}></FontAwesomeIcon>
          </span>
          <p>{data.name}</p>
        </div>
        <div className="appointment-item">
          <span className="item-logo" data-tooltip="Email">
            <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
          </span>
          <p style={{ textTransform: "none" }}>{data.email}</p>
        </div>
        <div className="appointment-item">
          <span className="item-logo" data-tooltip="Phone No">
            <FontAwesomeIcon icon={faSquarePhone}></FontAwesomeIcon>
          </span>
          <p>{data.phone}</p>
        </div>
        <div className="appointment-item">
          <span className="item-logo" data-tooltip="Day Of Birth">
            <FontAwesomeIcon icon={faCakeCandles}></FontAwesomeIcon>
          </span>
          <p>{data.dob.substring(0, data.dob.indexOf("T"))}</p>
        </div>
        <div className="appointment-item">
          <span className="item-logo" data-tooltip="Gender">
            <FontAwesomeIcon icon={faMarsAndVenus}></FontAwesomeIcon>
          </span>
          <p>{data.gender}</p>
        </div>
        <div className="appointment-item">
          <span className="item-logo" data-tooltip="Symptoms">
            <FontAwesomeIcon icon={faSquareVirus}></FontAwesomeIcon>
          </span>
          <p>{data.symptoms}</p>
        </div>
        <div className="appointment-item">
          <span className="item-logo" data-tooltip="Appointment Date">
            <FontAwesomeIcon icon={faCalendarDays}></FontAwesomeIcon>
          </span>
          <p>{data.date}</p>
        </div>
        <div className="appointment-item">
          <span className="item-logo" data-tooltip="Appointment Time">
            <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
          </span>
          <p>{data.time}</p>
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;
