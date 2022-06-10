import React, { useState, useEffect } from "react";
import "./video.css";
import axios from "../axios";
import { useAuth } from "../context/AuthContext";
import Loading from "../covid/Loading";
import Filter from "./Filter";

const DoctorJoin = () => {
  const { userData } = useAuth();
  const [appointmentData, setAppointmentData] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    const getAppointmentData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/appointment/${userData}`);
        setAppointmentData(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.log(error);
      }
    };
    getAppointmentData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div id="doctor-join-section">
      <div className="reminder-data-container">
        <h2 style={{ textAlign: "center" }}>Appointment</h2>
        <div className="underline"></div>
        <Filter
          appointmentData={appointmentData}
          setAppointmentData={setAppointmentData}
        />
      </div>
    </div>
  );
};

export default DoctorJoin;
