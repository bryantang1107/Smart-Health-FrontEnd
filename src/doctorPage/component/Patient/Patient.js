import React, { useEffect, useState } from "react";
import axios from "../../../axios";

const Patient = ({ x, handleClick, debouncedSearchTerm }) => {
  const [patientData, setPatientData] = useState();
  const [exist, setExist] = useState(true);
  useEffect(() => {
    const getPatientData = async () => {
      try {
        const response = await axios.get(`/appointment/patient-record/${x}`);
        setPatientData(response.data.appointmentHistory);
        getData(response.data.appointmentHistory);
      } catch (error) {
        console.log(error);
      }
    };
    getPatientData();
  }, []);
  const getData = (data) => {
    const filtered = data?.filter((x) => {
      return (
        x.name.toUpperCase().search(debouncedSearchTerm?.toUpperCase()) != -1 ||
        x.email.toUpperCase().search(debouncedSearchTerm?.toUpperCase()) !=
          -1 ||
        x.phone.toUpperCase().search(debouncedSearchTerm?.toUpperCase()) != -1
      );
    });
    if (filtered.length < 1) {
      setExist(false);
    }
  };

  if (!exist) {
    return <></>;
  }
  return (
    <>
      {patientData && (
        <div className="patient-item">
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
          <button className="green btn" onClick={() => handleClick(x)}>
            View Patient
          </button>
        </div>
      )}
    </>
  );
};

export default Patient;
