import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "../axios";
import "./schedule.css";
import NoAppointment from "../ChatRoom/NoAppointment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Success from "./Success";
import {
  faPenToSquare,
  faPen,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "../covid/Loading";

const ScheduleComponent = () => {
  const { userData } = useAuth();
  const [appointmentData, setAppointmentData] = useState();
  const [doctorData, setDoctorData] = useState();
  const [error, setError] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [state, setState] = useState(true);
  const [loading, setLoading] = useState();
  const [success, setSuccess] = useState();
  const nameRef = useRef();
  const phoneRef = useRef();
  const dobRef = useRef();
  const symptomsRef = useRef();

  useEffect(() => {
    const getAppointmentData = async () => {
      try {
        const response = await axios.get(`/appointment/detail/${userData}`);
        setAppointmentData(response.data[0]);
        setDoctorData(response.data[1]);
      } catch (error) {
        setError(true);
      }
    };
    getAppointmentData();
  }, []);

  const toggle = () => {
    setState(!state);
  };

  const doneAppointment = async (e) => {
    e.preventDefault();
    confirmAlert({
      title: "Appointment Completion",
      message: `By Clicking "Done", you acknowledge that you have successfully consulted your doctor and you will no longer have access to the consultation room. Please wait for your doctor to prescribe the digital prescription.`,
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            setLoading(true);
            await axios.post(`/appointment/done/${userData}`);
            setTimeout(() => {
              setLoading(false);
              setSuccess(true);
            }, 3000);
          },
          //cancel the appointment here,same as "done appointment" route
        },
        {
          label: "No",
          onClick: () => {
            setLoading(false);
          },
        },
      ],
    });
  };
  const saveChanges = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/appointment/updateInfo/${userData}`, {
        name: nameRef.current.value,
        phone: phoneRef.current.value,
        dob: dobRef.current.value,
        symptoms: symptomsRef.current.value,
      });
      window.location.reload(false);
    } catch (error) {
      setErrorMessage("Unable to save your information");
    }
  };
  if (error)
    return (
      <div id="schedule-container">
        <h1>Upcoming Appointment</h1>
        <div className="underline"></div>
        <NoAppointment />
      </div>
    );

  if (success) {
    return <Success />;
  }
  if (loading) {
    return <Loading />;
  }
  if (appointmentData?.complete)
    return (
      <div id="schedule-container">
        <h1>Upcoming Appointment</h1>
        <div className="underline"></div>
        <NoAppointment />
      </div>
    );

  return (
    <div id="schedule-container">
      <h1>Upcoming Appointment</h1>
      <div className="underline"></div>
      {appointmentData && state ? (
        <>
          <div className="appointment-information-container">
            <span className="icon" onClick={toggle}>
              <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
            </span>
            <h4>Appointment Details</h4>
            <div className="appointment-item">
              <p>Name: {appointmentData.name}</p>
            </div>
            <div className="appointment-item">
              <p style={{ textTransform: "none" }}>
                Email: {appointmentData.email}
              </p>
            </div>
            <div className="appointment-item">
              <p>Phone: {appointmentData.phone}</p>
            </div>
            <div className="appointment-item">
              <p>Birth Date: {appointmentData.dob.split("T")[0]}</p>
            </div>
            <div className="appointment-item">
              <p> Symptoms: {appointmentData.symptoms}</p>
            </div>
            <div className="appointment-item">
              <p> Appointment Date: {appointmentData.date}</p>
            </div>
            <div className="appointment-item">
              <p> Appointment Time: {appointmentData.time}</p>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "2em",
              }}
            >
              <button className="btn green" onClick={doneAppointment}>
                Done
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <form
            className="appointment-information-container"
            onSubmit={saveChanges}
          >
            {errorMessage && <p className="alert-primary">{errorMessage}</p>}
            <span className="icon" onClick={toggle}>
              <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
            </span>
            <div className="row-appointment">
              <h4>Appointment Details</h4>
              <h5>name:</h5>
              <div className="input-group input-group-icon">
                <input
                  type="text"
                  placeholder="Full Name"
                  defaultValue={appointmentData?.name}
                  ref={nameRef}
                  autoFocus
                  required
                />
                <div className="input-icon">
                  <i className="fa fa-user"></i>
                </div>
              </div>
            </div>
            <h5>Phone No:</h5>
            <div className="input-group input-group-icon">
              <input
                type="tel"
                placeholder="Phone No"
                defaultValue={appointmentData?.phone}
                ref={phoneRef}
                multiple
              />
              <div className="input-icon">
                <i className="fa fa-phone"></i>
              </div>
            </div>

            <h5>Day Of Birth:</h5>
            <div className="input-group">
              <input
                type="date"
                name="birthdate"
                defaultValue={appointmentData?.dob.split("T")[0]}
                ref={dobRef}
                required
              />
            </div>
            <h5>Symptoms:</h5>
            <div className="input-group input-group-icon bb">
              <textarea
                name="symptoms"
                rows="10"
                required
                ref={symptomsRef}
                defaultValue={appointmentData?.symptoms}
                style={{ resize: "none" }}
              ></textarea>
              <div className="input-icon">
                <i>
                  <FontAwesomeIcon icon={faPen} />
                </i>
              </div>
            </div>
            <div className="appointment-item">
              <p style={{ textTransform: "none" }}>
                Email: {appointmentData?.email}
              </p>
            </div>
            <div className="appointment-item">
              <p> Appointment Date: {appointmentData?.date}</p>
            </div>
            <div className="appointment-item">
              <p> Appointment Time: {appointmentData?.time}</p>
            </div>
            <button
              type="submit"
              className="btn green"
              style={{ marginTop: "2em" }}
              onSubmit={saveChanges}
            >
              Save Changes
            </button>
          </form>
        </>
      )}
      <div
        style={{
          width: "90%",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h4 style={{ marginRight: "1em" }}>
          To Cancel your appointment, Click here:
        </h4>
        <a href="/cancel-appointment" className="btn green">
          Cancel
        </a>
      </div>
      {doctorData && (
        <div className="doctor-information-container">
          <div className="doctor-image">
            <img src={doctorData.image} alt="doctor-image" />
            <h3>Profile</h3>
            <div className="item">
              <p>{doctorData.name}</p>
            </div>
            <div className="item">
              <p>{doctorData.about}</p>
            </div>
            <h3>Category</h3>
            <div className="item">
              <p>{doctorData.category}</p>
            </div>
            <h3>Experience</h3>
            <div className="item">
              <p>{doctorData.experience}</p>
            </div>
          </div>
          <div className="doctor-info">
            <h3>Practices</h3>
            <div className="item">
              <p>{doctorData.hospital}</p>
            </div>
            <h3>Speciality</h3>
            <div className="item bg">
              Services:
              {doctorData.service.map((x, index) => {
                return <p key={index}>{x}</p>;
              })}
            </div>
            <div className="item">
              <p>{doctorData.specialisation}</p>
            </div>
            <h3>Language</h3>
            <div className="item">
              <p>{doctorData.languages}</p>
            </div>
            <h3>Qualification</h3>
            <div className="item">
              <p>{doctorData.qualification}</p>
            </div>

            <h3>Consulted For</h3>
            <div className="item bg">
              Treats:
              {doctorData.conditions.map((x, index) => {
                return <p key={index}>{x}</p>;
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleComponent;
