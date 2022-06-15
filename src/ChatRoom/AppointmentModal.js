import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../axios";
import { useHistory } from "react-router-dom";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const OVERLAY_STYLES = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
  zIndex: 1000,
};

const AppointmentModal = ({ open, onClose, appointmentData }) => {
  const history = useHistory();
  const [roomId, setRoomId] = useState();
  const [password, setPassword] = useState();
  const [id, setId] = useState();
  const [error, setError] = useState();

  const notify = () => {
    return toast.error(
      "You are in the middle of a consultation, please ensure you leave the room before joining another",
      {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        delay: 1000,
      }
    );
  };

  useEffect(() => {
    const consultBtn = async (roomInfo) => {
      try {
        const response = await axios.get(
          `/authroom/getRoomInfoDoctor/${roomInfo}`
        );

        setRoomId(response.data.room_id);
        setPassword(response.data.password);
        setId(response.data._id);
      } catch (error) {
        setError("You have already consulted this patient");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    };
    if (appointmentData) {
      localStorage.setItem("appointment", JSON.stringify(appointmentData));
      consultBtn(appointmentData.roomInfo);
    }
  }, [appointmentData]);
  const authenticateRoom = async () => {
    if (localStorage.getItem("join")) {
      return notify();
    }
    try {
      localStorage.setItem("room", roomId);
      await axios.post("/authroom/login", {
        id: id,
        room_id: roomId,
        password: password,
      });

      history.push("/join/name");
    } catch (error) {
      setError("You have already consulted this patient");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES}></div>
      <div className="modal">
        <div className="model-header">
          <span
            className="closeModal"
            onClick={() => {
              onClose();
            }}
            data-tooltip="Close"
          >
            <IoIosCloseCircleOutline />
          </span>
        </div>
        <div className="appointment-user-info">
          <h1>Patient Information</h1>
          <div className="underline"></div>
          {appointmentData.gender === "male" ? (
            <img
              src="https://www.shareicon.net/data/512x512/2015/09/18/103160_man_512x512.png"
              alt="male"
            />
          ) : (
            <img
              src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png"
              alt="female"
            />
          )}
          <div className="appointment-item-container">
            <div className="appointment-item">
              <span className="item-logo" data-tooltip="Name">
                <FontAwesomeIcon icon={faIdCard}></FontAwesomeIcon>
              </span>
              <p>{appointmentData.name}</p>
            </div>
            <div className="appointment-item">
              <span className="item-logo" data-tooltip="Email">
                <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
              </span>
              <p style={{ textTransform: "none" }}>{appointmentData.email}</p>
            </div>
            <div className="appointment-item">
              <span className="item-logo" data-tooltip="Phone No">
                <FontAwesomeIcon icon={faSquarePhone}></FontAwesomeIcon>
              </span>
              <p>{appointmentData.phone}</p>
            </div>
            <div className="appointment-item">
              <span className="item-logo" data-tooltip="Day Of Birth">
                <FontAwesomeIcon icon={faCakeCandles}></FontAwesomeIcon>
              </span>
              <p>
                {appointmentData.dob.substring(
                  0,
                  appointmentData.dob.indexOf("T")
                )}
              </p>
            </div>
            <div className="appointment-item">
              <span className="item-logo" data-tooltip="Gender">
                <FontAwesomeIcon icon={faMarsAndVenus}></FontAwesomeIcon>
              </span>
              <p>{appointmentData.gender}</p>
            </div>
            <div className="appointment-item">
              <span className="item-logo" data-tooltip="Symptoms">
                <FontAwesomeIcon icon={faSquareVirus}></FontAwesomeIcon>
              </span>
              <p>{appointmentData.symptoms}</p>
            </div>
            <div className="appointment-item">
              <span className="item-logo" data-tooltip="Appointment Date">
                <FontAwesomeIcon icon={faCalendarDays}></FontAwesomeIcon>
              </span>
              <p>{appointmentData.date}</p>
            </div>
            <div className="appointment-item">
              <span className="item-logo" data-tooltip="Appointment Time">
                <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
              </span>
              <p>{appointmentData.time}</p>
            </div>
          </div>
          {error && <p className="alert-primary">{error}</p>}
          <button
            className="btn green"
            style={{ marginTop: "2em" }}
            onClick={() => authenticateRoom()}
          >
            Consult
          </button>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default AppointmentModal;
