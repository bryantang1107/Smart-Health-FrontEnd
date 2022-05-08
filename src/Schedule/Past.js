import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "../axios";
import "./schedule.css";

const Past = () => {
  const { userData, currentUser } = useAuth();
  const [historyData, setHistoryData] = useState([]);
  useEffect(() => {
    const getPastAppointments = async () => {
      const response = await axios.get(
        `/appointment/past-appointment/${userData}`
      );

      response.data.appointmentHistory.forEach(async (x) => {
        const doctor = await axios.get(`/find-doctor/${x.doctorInfo}`, {
          headers: {
            Authorization: "Bearer " + currentUser,
          },
        });
        x.doctorInfo = doctor.data;
        setHistoryData((prev) => {
          return [...prev, x];
        });
      });
    };
    getPastAppointments();
  }, []);
  if (historyData.length < 1) {
    return (
      <div className="past">
        <p style={{ marginBottom: "4em" }}>
          Oops, It Seems Like you have not made any appointments yet.
        </p>
        <a
          href="/find-doctor"
          style={{
            color: "#00bbcf",
            fontWeight: "600",
            textDecoration: "underline",
          }}
        >
          Find A Doctor
        </a>
      </div>
    );
  } else {
    return (
      <div className="past">
        <a href="/medical-record" className="medical-link">
          View Medical Record
        </a>
        <h1 style={{ marginTop: "3em" }}>Past Appointment</h1>
        <div className="underline"></div>
        <div className="past-appointment-container">
          {historyData?.map((x, index) => {
            return (
              <div className="appointment-item" key={index}>
                <div className="doctor-info">
                  <h3> {x.date}</h3>
                  <p>
                    {x.time} - {parseInt(x.time) + 1 + ":00"}
                  </p>
                </div>
                <div className="doctor-info">
                  <h3>Doctor</h3>
                  <p> {x.doctorInfo.name}</p>
                </div>
                <div className="doctor-info">
                  <h3>Status</h3>
                  <p> Completed</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default Past;
