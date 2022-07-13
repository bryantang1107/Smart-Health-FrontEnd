import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./schedule.css";
import NoAppointment from "../ChatRoom/NoAppointment";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../axios";
import { useAuth } from "../context/AuthContext";
import {
  faPenToSquare,
  faPen,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../covid/Loading";
toast.configure();
const Upcoming = () => {
  const { id } = useParams();
  const customId = "custom-id-yes";
  const [appointmentData, setAppointmentData] = useState();
  const [doctorData, setDoctorData] = useState();
  const { userData, userRole } = useAuth();
  const [error, setError] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [state, setState] = useState(true);
  const [loading, setLoading] = useState();
  const nameRef = useRef();
  const phoneRef = useRef();
  const dobRef = useRef();
  const symptomsRef = useRef();
  const notify = () => {
    toast.info(
      "If you have consulted your doctor, please wait for the doctor to provide the digital prescription. Do not cancel the appointment!",
      {
        toastId: customId,
        position: toast.POSITION.TOP_RIGHT,
        autoClose: false,
      }
    );
  };
  useEffect(() => {
    if (userRole === "user") {
      const getAppointmentData = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`/appointment/detail/${userData}`);
          setTimeout(() => {
            setLoading(false);
            setAppointmentData(response.data[0]);
            setDoctorData(response.data[1]);
          }, 1500);
        } catch (error) {
          setError(true);
          setLoading(false);
        }
      };
      getAppointmentData();
      notify();
    } else {
      const getAppointmentData = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`/appointment/detail/${id}`);
          setTimeout(() => {
            setLoading(false);
            setAppointmentData(response.data[0]);
            setDoctorData(response.data[1]);
          }, 1500);
        } catch (error) {
          setLoading(false);
          setError(true);
        }
      };
      getAppointmentData();
    }
  }, []);

  const toggle = () => {
    setState(!state);
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

  if (loading) {
    return <Loading />;
  }

  if (error)
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
            {userRole === "user" && (
              <span className="icon" onClick={toggle}>
                <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
              </span>
            )}

            <h4>Appointment Details</h4>
            {appointmentData?.gender === "male" ? (
              <img
                src="https://www.shareicon.net/data/512x512/2015/09/18/103160_man_512x512.png"
                alt="male-image"
                style={{ width: "100px" }}
              />
            ) : (
              <img
                src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png"
                alt="female-image"
                style={{ width: "100px" }}
              />
            )}
            <div className="appointment-item">
              <p>Name: {appointmentData.name}</p>
            </div>
            <div className="appointment-item">
              <p>Gender: {appointmentData.gender}</p>
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
      {userRole !== "doctor" && (
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
          <Link to="/cancel-appointment" className="btn green">
            Cancel
          </Link>
        </div>
      )}

      {doctorData && (
        <>
          <h1 style={{ marginTop: "2em" }}>Doctor Information</h1>
          <div className="underline"></div>
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
        </>
      )}
    </div>
  );
};

export default Upcoming;
