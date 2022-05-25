import React, { useEffect, useState } from "react";
import "../css/doctor.css";
import { MdVerified, MdWork } from "react-icons/md";
import { motion } from "framer-motion";
import Loading from "../covid/Loading";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  FaHandHoldingMedical,
  FaUserGraduate,
  FaLanguage,
} from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";

const DoctorItem = ({ items }) => {
  const [doctorList, setDoctorList] = useState([]);
  const [loading, setLoading] = useState();
  const { userRole } = useAuth();

  const getDoctorPage = (page = 1) => {
    const DOCTOR_LIMIT = 5;
    const startIndex = (page - 1) * DOCTOR_LIMIT;
    const endIndex = page * DOCTOR_LIMIT;
    const doctorArr = items.slice(startIndex, endIndex);
    setDoctorList(doctorArr);
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    const getDoctorPage = (page = 1) => {
      const DOCTOR_LIMIT = 5;
      const startIndex = (page - 1) * DOCTOR_LIMIT;
      const endIndex = page * DOCTOR_LIMIT;
      const doctorArr = items.slice(startIndex, endIndex);
      setDoctorList(doctorArr);
    };

    getDoctorPage();
  }, [items]);

  const pages = Math.ceil(items.length / 5);

  if (loading) {
    return <Loading></Loading>;
  }

  const ButtonList = () => {
    const buttonContainer = [];
    for (let i = 0; i < pages; i++) {
      buttonContainer.push(
        <button
          key={i}
          className="page-btn"
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              getDoctorPage(i + 1);
              setLoading(false);
            }, 500);
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }}
        >
          {i + 1}
        </button>
      );
    }
    return buttonContainer;
  };

  return (
    <div className="doctor-item-container">
      {doctorList.map((item) => {
        const {
          _id,
          name,
          image,
          experience,
          specialisation,
          qualification,
          languages,
          conditions,
        } = item;
        return (
          <motion.div
            key={_id}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div key={_id} className="doctor-item">
              <img src={image} alt={name} className="photo"></img>
              <div className="doctor-item-info">
                <div className="doctor-name">
                  <BsPersonFill
                    className="doctor-icon"
                    style={{ color: "#329ea8" }}
                  ></BsPersonFill>
                  <p>
                    <strong>Name</strong> : {name}
                  </p>
                </div>

                <div className="doctor-specialty">
                  <MdVerified
                    className="doctor-icon"
                    style={{ color: "#36bf58" }}
                  ></MdVerified>
                  <p>
                    <strong>Specialisation</strong> : {specialisation}
                  </p>
                </div>
                <div className="doctor-consult">
                  <FaHandHoldingMedical
                    className="doctor-icon"
                    style={{ color: "#c73124" }}
                  ></FaHandHoldingMedical>
                  <p>
                    <strong>Consulted For</strong> :{" "}
                    {conditions.map((condition) => condition + ", ")}
                  </p>
                </div>
              </div>

              <div className="doctor-additional-info">
                <div className="doctor-education">
                  <FaUserGraduate
                    className="doctor-icon"
                    style={{ color: "#1c42a3" }}
                  ></FaUserGraduate>
                  <p>
                    <strong>Education Level</strong> : {qualification}
                  </p>
                </div>
                <div className="doctor-language">
                  <FaLanguage
                    className="doctor-icon"
                    style={{ color: "#6fa31c" }}
                  ></FaLanguage>
                  <p>
                    <strong>Language</strong> : {languages}
                  </p>
                </div>
                <div className="doctor-experience">
                  <MdWork
                    className="doctor-icon"
                    style={{ color: "#911ca3" }}
                  ></MdWork>
                  <p>{experience}</p>
                </div>
              </div>
              {userRole === "doctor" ? (
                <Link to={`/doctor/${_id}`} className="doctor-consult-btn">
                  View
                </Link>
              ) : (
                <Link to={`/doctor/${_id}`} className="doctor-consult-btn">
                  Consult
                </Link>
              )}
            </div>
          </motion.div>
        );
      })}
      <div className="button-container">
        <ButtonList></ButtonList>
      </div>
    </div>
  );
};

export default DoctorItem;
