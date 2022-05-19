import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import NoPatient from "./NoPatient";

const Patient = ({ id, handleClick }) => {
  const [patientData, setPatientData] = useState();
  const [error, setError] = useState(false);
  useEffect(() => {
    const getPatientData = async () => {
      try {
        const response = await axios.get(`/appointment/patient-record/${id}`);
        setPatientData(response.data.appointmentHistory);
      } catch (error) {
        setError(true);
      }
    };
    getPatientData();
  }, []);

  if (patientData?.length < 1 || error) {
    return <NoPatient />;
  }

  return (
    <div className="patient-item">
      {patientData && (
        <div className="patient-info">
          <p>
            <strong>Name:</strong>
            {patientData[0]?.name}
          </p>
          <p style={{ textTransform: "none" }}>
            <strong>Email:</strong>
            {patientData[0]?.email}
          </p>
          <p>
            <strong>Gender:</strong>
            {patientData[0]?.gender}
          </p>
          <p>
            <strong>Phone Number:</strong>
            {patientData[0]?.phone}
          </p>
          <p>
            <strong>Day-Of-Birth:</strong>
            {patientData[0]?.dob.split("T")[0]}
          </p>
        </div>
      )}

      <button className="green btn" onClick={() => handleClick(id)}>
        View Patient
      </button>
    </div>
  );
};

export default Patient;
