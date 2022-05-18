import React, { useState, useEffect } from "react";
import axios from "../axios";
import { useAuth } from "../context/AuthContext";
import "./medical.css";
import Modal from "./Modal";

import MedicalItem from "./MedicalItem";

import NoMedicalRecord from "../doctorPage/component/Medical/NoMedicalRecord";
const MedicalComponent = () => {
  const { userData } = useAuth();
  const [medicalRecord, setMedicalRecord] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [doctorId, setDoctorId] = useState();

  useEffect(() => {
    const getMedicalRecord = async () => {
      try {
        const response = await axios.get(`/user/medical-record/${userData}`);
        setMedicalRecord(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMedicalRecord();
  }, []);

  if (medicalRecord.length < 1) {
    return (
      <div className="medical-record-container">
        <h1 style={{ textAlign: "center" }}>Medical Record</h1>
        <div className="underline"></div>
        <NoMedicalRecord />
      </div>
    );
  }

  return (
    <div className="medical-record-container">
      <h1>Medical Record</h1>
      <ul className="responsive-table">
        {medicalRecord?.map((m, index) => {
          return (
            <MedicalItem
              key={index}
              m={m}
              index={index}
              setDoctorId={setDoctorId}
              setIsOpen={setIsOpen}
            />
          );
        })}
      </ul>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        doctorId={doctorId}
      ></Modal>
    </div>
  );
};

export default MedicalComponent;
