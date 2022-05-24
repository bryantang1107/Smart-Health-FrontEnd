import React, { useEffect, useState } from "react";
import Arrow from "../../../Doctor/Arrow";
import { useHistory, Link } from "react-router-dom";
import axios from "../../../axios";
import { useAuth } from "../../../context/AuthContext";
import "./patient.css";
import { motion } from "framer-motion";
import { BiCategory } from "react-icons/bi";
import { BsJournalMedical } from "react-icons/bs";
import { GiMedicines, GiMedicinePills, GiNurseMale } from "react-icons/gi";
import { CgFileDocument } from "react-icons/cg";
import { AiFillFileAdd, AiOutlineFieldTime } from "react-icons/ai";
import { FaViruses } from "react-icons/fa";
import { GoCalendar } from "react-icons/go";
import { useParams } from "react-router-dom";

const PatientItem = () => {
  const history = useHistory();
  const { userData } = useAuth();
  const [patient, setPatient] = useState([]);
  const [appointmentHistory, setAppointmentHistory] = useState([]);
  const [past, setPast] = useState();
  const [upcoming, setUpcoming] = useState(true);
  const [nav, setNav] = useState("diagnosis");
  const { id } = useParams();

  const handleClick = (type) => {
    setNav(type);
    if (type === "past") {
      setPast(true);
      setUpcoming(false);
    } else {
      setPast(false);
      setUpcoming(true);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/user/patient-record/${userData}`);
        const find = response.data.patient.find((x) => {
          return x.patientId === id;
        });
        const filtered = response.data.patient.filter((x) => {
          return x.patientId === id;
        });
        setPatient(filtered);

        const response2 = await axios.get(
          `/appointment/patient-record/${find.patientId}`
        );
        setAppointmentHistory(response2.data.appointmentHistory);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      <Arrow goBack={goBack} />
      {appointmentHistory?.length > 0 && (
        <>
          <div className="patient-information">
            <div className="patient-information-left">
              {appointmentHistory[0]?.gender === "male" ? (
                <div className="patient-image">
                  <img
                    src="https://www.shareicon.net/data/512x512/2015/09/18/103160_man_512x512.png"
                    alt="male-image"
                  />
                </div>
              ) : (
                <div className="patient-image">
                  <img
                    src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png"
                    alt="female-image"
                  />
                </div>
              )}
            </div>
            <div className="patient-information-right">
              <p>
                <strong>Name:</strong> {appointmentHistory[0]?.name}
              </p>
              <p>
                <strong>Gender:</strong> {appointmentHistory[0]?.gender}
              </p>
              <p>
                <strong>Phone Number:</strong> {appointmentHistory[0]?.phone}
              </p>
              <p style={{ textTransform: "none" }}>
                <strong>Email:</strong> {appointmentHistory[0]?.email}
              </p>
              <p>
                <strong>Day-Of-Birth:</strong>
                {appointmentHistory[0]?.dob.split("T")[0]}
              </p>
            </div>
          </div>
          <hr></hr>
          <div className="nav-bar-appointment">
            <span
              onClick={() => {
                handleClick("diagnosis");
              }}
              className={`nav-btn ${upcoming ? "active" : null}`}
            >
              Past Diagnosis
            </span>
            <span
              onClick={() => {
                handleClick("past");
              }}
              className={`nav-btn ${past ? "active" : null}`}
            >
              Past Appointment
            </span>
          </div>
          {nav === "past" && (
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ stiffness: 100 }}
            >
              {appointmentHistory.map((x, index) => {
                return (
                  <div className="patient-medical-info" key={index}>
                    <div className="header">
                      <h3>Patient's Past Appointment</h3>
                    </div>
                    <p className="patient-medical-item">
                      <span className="patient-medical-icon">
                        <FaViruses className="icon" />
                        <strong>Symptoms </strong>
                      </span>
                      {x.symptoms}
                    </p>
                    <p className="patient-medical-item">
                      <span className="patient-medical-icon">
                        <GoCalendar className="icon" />
                        <strong>Appointment Date </strong>
                      </span>
                      {x.date.split("T")[0]}
                    </p>
                    <p className="patient-medical-item">
                      <span className="patient-medical-icon">
                        <AiOutlineFieldTime className="icon" />
                        <strong>Appointment Time </strong>
                      </span>
                      {x.time}
                    </p>
                    <p className="patient-medical-item">
                      <span className="patient-medical-icon">
                        <GiNurseMale className="icon" />
                        <strong>Doctor Consulted </strong>
                      </span>
                      <Link to={`/doctor/${x.doctorInfo}`} className="link">
                        View Doctor Information
                      </Link>
                    </p>
                  </div>
                );
              })}
            </motion.div>
          )}
          {nav === "diagnosis" && (
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ stiffness: 100 }}
            >
              {patient.map((y, index) => {
                return (
                  <div key={index} className="patient-medical-info">
                    <div className="header">
                      <h3>Patient's Past Diagnosis</h3>
                    </div>
                    <p className="patient-medical-item">
                      <span className="patient-medical-icon">
                        <BsJournalMedical className="icon" />
                        <strong>Diagnosis </strong>
                      </span>
                      {y.info.diagnosis}
                    </p>
                    <p className="patient-medical-item">
                      <span className="patient-medical-icon">
                        <BiCategory className="icon" />
                        <strong>Category </strong>
                      </span>
                      {y.info.category}
                    </p>
                    <p className="patient-medical-item">
                      <span className="patient-medical-icon">
                        <GiMedicinePills className="icon" />
                        <strong>Drug Name </strong>
                      </span>

                      {y.info.drug}
                    </p>

                    <p className="patient-medical-item">
                      <span className="patient-medical-icon">
                        <GiMedicines className="icon" />
                        <strong>Administration Route </strong>
                      </span>
                      {y.info.route}
                    </p>
                    <p className="patient-medical-item">
                      <span className="patient-medical-icon">
                        <CgFileDocument className="icon" />
                        <strong>Doctor's Prescription: </strong>
                      </span>
                      {y.info.prescription}
                    </p>
                    <p className="patient-medical-item">
                      <span className="patient-medical-icon">
                        <AiFillFileAdd className="icon" />
                        <strong>Additional Information: </strong>
                      </span>
                      {y.info.additional}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          )}
        </>
      )}
    </>
  );
};

export default PatientItem;
