import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { useAuth } from "../../context/AuthContext";
import "./Patient/patient.css";
import Patient from "./Patient/Patient";
import { useHistory } from "react-router-dom";
import NoPatient from "./Patient/NoPatient";
import Search from "./Patient/Search";
import useDebounce from "../../hooks/useDebounce";
import Loading from "../../covid/Loading";
const PatientComponent = () => {
  const { userData } = useAuth();
  const history = useHistory();
  const [error, setError] = useState();
  const [searchTerm, setSearchTerm] = useState();
  const [isSearching, setIsSearching] = useState(false);
  const [data, setData] = useState();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    const getData = async () => {
      try {
        const response = await axios.get(`/user/patient-record/${userData}`);
        const data = new Set();
        response.data.patient.forEach((x) => {
          data.add(x.patientId);
        });
        setData(Array.from(data));
      } catch (error) {
        setError(true);
      }
    };
    getData();
  }, []);
  const getData = async () => {
    try {
      const response = await axios.get(`/user/patient-record/${userData}`);
      const data = new Set();
      response.data.patient.forEach((x) => {
        data.add(x.patientId);
      });
      setData(Array.from(data));
    } catch (error) {
      setError(true);
    }
  };
  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      setTimeout(() => {
        setIsSearching(false);
      }, 1500);
    } else {
      setIsSearching(false);
      setData();
      getData();
    }
  }, [debouncedSearchTerm]);
  const handleClick = (id) => {
    history.push(`/patient/${id}`);
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
      <Search setSearchTerm={setSearchTerm} />
      {isSearching ? (
        <Loading />
      ) : (
        data?.map((x, index) => {
          return (
            <Patient
              key={index}
              x={x}
              handleClick={handleClick}
              debouncedSearchTerm={debouncedSearchTerm}
            />
          );
        })
      )}
    </div>
  );
};

export default PatientComponent;
