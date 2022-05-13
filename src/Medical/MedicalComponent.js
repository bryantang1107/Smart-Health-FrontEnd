import React, { useState, useEffect } from "react";
import axios from "../axios";
import { useAuth } from "../context/AuthContext";
import "./medical.css";
import Modal from "./Modal";
import { BsCloudDownload } from "react-icons/bs";
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
  const getFormatDate = (date) => {
    const d = new Date(date);
    return (
      d.getDate().toString() +
      " " +
      d.toLocaleString("default", { month: "long" }) +
      " " +
      d.getFullYear().toString()
    );
  };
  return (
    <div className="medical-record-container">
      <h1>Medical Record</h1>
      <ul className="responsive-table">
        {medicalRecord?.map((m, index) => {
          return (
            <div className="medical-record-item" key={index}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h3>Date -{getFormatDate(m.date)}</h3>
                <span className="download" data-tooltip="Download">
                  <BsCloudDownload />
                </span>
              </div>

              <div className="medical-record">
                <li className="table-header">
                  <div className="col col-1">Diagnosis</div>
                  <div className="col col-3">Drug Name</div>
                  <div className="col col-3">Drug Category</div>
                  <div className="col col-3">Administration Route</div>
                  <div className="col col-3">Prescription</div>
                </li>
                <li className="table-row hover-effect" key={index}>
                  <div className="col col-1" data-label="Diagnosis:">
                    {m.diagnosis}
                  </div>
                  <div className="col col-3" data-label="Drug Name:">
                    {m.drug}
                  </div>
                  <div className="col col-3" data-label="Drug Category:">
                    {m.category}
                  </div>
                  <div className="col col-3" data-label="Administration Route:">
                    {m.route}
                  </div>

                  <div className="col col-3" data-label="Prescription:">
                    {m.prescription}
                  </div>
                </li>

                <button
                  className="btn green"
                  onClick={() => {
                    setDoctorId(m.doctorConsulted);
                    setIsOpen(true);
                  }}
                >
                  View Doctor Information
                </button>
              </div>
            </div>
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
