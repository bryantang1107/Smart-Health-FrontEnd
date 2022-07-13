import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "../axios";
import Loading from "../covid/Loading";
import "./schedule.css";

const Past = () => {
  const { userData, currentUser, userRole } = useAuth();
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState();
  const { id } = useParams();
  useEffect(() => {
    if (userRole === "user") {
      const getPastAppointments = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `/appointment/past-appointment/${userData}`
          );
          if (response.data.appointmentHistory.length < 1) {
            return setLoading(false);
          }
          response.data.appointmentHistory.forEach(async (x) => {
            const doctor = await axios.get(`/find-doctor/${x.doctorInfo}`, {
              headers: {
                Authorization: "Bearer " + currentUser,
              },
            });
            x.doctorInfo = doctor.data;
            setTimeout(() => {
              setHistoryData((prev) => {
                return [...prev, x];
              });
              setLoading(false);
            }, 1500);
          });
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };
      getPastAppointments();
    } else {
      const getPastAppointments = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `/appointment/past-appointment/${id}`
          );
          if (response.data.appointmentHistory.length < 1) {
            return setLoading(false);
          }
          response.data.appointmentHistory.forEach(async (x) => {
            const doctor = await axios.get(`/find-doctor/${x.doctorInfo}`, {
              headers: {
                Authorization: "Bearer " + currentUser,
              },
            });
            x.doctorInfo = doctor.data;
            setTimeout(() => {
              setHistoryData((prev) => {
                return [...prev, x];
              });
              setLoading(false);
            }, 1500);
          });
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };
      getPastAppointments();
    }
  }, []);
  if (loading) {
    return <Loading />;
  }

  if (historyData.length < 1 && userRole === "doctor") {
    return (
      <div className="past">
        <p style={{ marginBottom: "4em" }}>
          This user have not made any appointment in the past.
        </p>
      </div>
    );
  }

  if (historyData.length < 1 && userRole === "user") {
    return (
      <div className="past">
        <p style={{ marginBottom: "4em" }}>
          Oops, It Seems Like you have not made any appointments yet.
        </p>
        <Link
          to="/find-doctor"
          style={{
            color: "#00bbcf",
            fontWeight: "600",
            textDecoration: "underline",
          }}
        >
          Find A Doctor
        </Link>
      </div>
    );
  }
  return (
    <div className="past">
      <Link to="/medical-record" className="medical-link">
        View Medical Record
      </Link>
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
                <p> {x.status}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Past;
