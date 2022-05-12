import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { useAuth } from "../../context/AuthContext";
import "./Patient/patient.css";
import Patient from "./Patient/Patient";
import { useHistory } from "react-router-dom";
import NoPatient from "./Patient/NoPatient";
const PatientComponent = () => {
  const { userData } = useAuth();
  const [patient, setPatient] = useState([]);
  const [patientInfo, setPatientInfo] = useState();
  const history = useHistory();
  const [error, setError] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/user/patient-record/${userData}`);
        setPatientInfo(response.data);
        setPatient(Object.keys(response.data));
      } catch (error) {
        setError(true);
      }
    };
    getData();
  }, []);
  const handleClick = (id) => {
    history.push(`/patient-record/${id}`);
  };
  if (error) {
    return (
      <>
        <h1 style={{ textAlign: "center" }}>Patient Record</h1>
        <div className="underline"></div>
        <NoPatient />;
      </>
    );
  }
  return (
    <div className="patient-container">
      <h1 style={{ textAlign: "center" }}>Patient Record</h1>
      <div className="underline"></div>
      {patient?.map((x, index) => {
        //y.date
        return (
          <Patient
            key={index}
            id={x}
            patientInfo={patientInfo}
            handleClick={handleClick}
          />
        );
      })}
    </div>
  );
};

export default PatientComponent;
