import React, { useState, useEffect } from "react";
import "./video.css";
import AppointmentModal from "./AppointmentModal";
import axios from "../axios";
import { useAuth } from "../context/AuthContext";
import NoAppointment from "./NoAppointment";
import { useHistory } from "react-router-dom";

const DoctorJoin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userData } = useAuth();
  const [appointmentData, setAppointmentData] = useState();
  const [currentData, setCurrentData] = useState();
  const history = useHistory();
  useEffect(() => {
    const getAppointmentData = async () => {
      try {
        const response = await axios.get(`/appointment/${userData}`);
        setAppointmentData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAppointmentData();
  }, []);
  const handleClick = (id) => {
    history.push(`/patient-info/${id}`);
  };
  return (
    <div id="doctor-join-section">
      <div className="reminder-data-container">
        <h2 style={{ textAlign: "center" }}>Appointment</h2>
        <div className="underline"></div>
        {appointmentData && appointmentData.length > 0 ? (
          <ul className="responsive-table">
            <li className="table-header">
              <div className="col col-1">Name:</div>
              <div className="col col-2">Email:</div>
              <div className="col col-3">Gender:</div>
              <div className="col col-3">Day Of Birth:</div>
            </li>
            {appointmentData.map((x, index) => {
              return (
                <div key={index}>
                  <li
                    className="table-row hover-effect"
                    onClick={() => {
                      setIsOpen(true);
                      setCurrentData(x);
                    }}
                  >
                    <div className="col col-1" data-label="Name:">
                      {x.name}
                    </div>
                    <div
                      className="col col-2"
                      data-label="Email:"
                      style={{ textTransform: "lowercase" }}
                    >
                      {x.email}
                    </div>
                    <div className="col col-3" data-label="Gender:">
                      {x.gender}
                    </div>
                    <div className="col col-3" data-label="Day Of Birth:">
                      {x.dob.substring(0, x.dob.indexOf("T"))}
                    </div>
                  </li>
                  <button
                    onClick={() => handleClick(x._id)}
                    className="green btn"
                  >
                    Visit Profile
                  </button>
                </div>
              );
            })}

            <AppointmentModal
              open={isOpen}
              onClose={() => setIsOpen(false)}
              appointmentData={currentData}
            ></AppointmentModal>
          </ul>
        ) : (
          <NoAppointment />
        )}
      </div>
    </div>
  );
};

export default DoctorJoin;
