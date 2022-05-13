import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import { MdVerifiedUser } from "react-icons/md";
import { FcClock } from "react-icons/fc";
import { FaRegHospital, FaQuoteLeft } from "react-icons/fa";
import { BsTrophy } from "react-icons/bs";
import { GiNurseMale } from "react-icons/gi";
import { GrCertificate } from "react-icons/gr";
import axios from "../axios";

const OVERLAY_STYLES = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
  zIndex: 1000,
};
const Modal = ({ open, onClose, doctorId }) => {
  const { userRole, currentUser } = useAuth();
  const [doctorInfo, setDoctorInfo] = useState();
  const [registry, setRegistry] = useState();
  const [conditions, setConditions] = useState();
  const [service, setService] = useState();
  useEffect(() => {
    const getUserData = async () => {
      const doctorData = await axios.get(`/find-doctor/${doctorId}`, {
        headers: {
          Authorization: "Bearer " + currentUser,
        },
      });
      const { registry, conditions, service, ...data } = doctorData.data;
      setDoctorInfo(data);
      setRegistry(registry);
      setConditions(conditions);
      setService(service);
    };
    if (doctorId) getUserData();
  }, [doctorId]);
  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES}></div>
      <div className="modal">
        <div className="model-header">
          <span
            className="closeModal"
            onClick={() => {
              onClose();
            }}
            data-tooltip="Close"
          >
            <IoIosCloseCircleOutline />
          </span>
        </div>
        {userRole === "user" && doctorInfo && (
          <div className="doctor-role ">
            <div className="doctor-header-container">
              <div className="doctor-header-info">
                <div className="doctor-header-image">
                  <img src={doctorInfo.image} alt="" />
                </div>
                <div className="doctor-header-name">
                  <h1>{doctorInfo.name}</h1>
                  <h4>{doctorInfo.category}</h4>

                  <div className="doctor-header-experience">
                    <i
                      className="fa-solid fa-user-doctor"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                    <h4>{doctorInfo.experience}</h4>
                    <div className="doctor-header-verified">
                      <MdVerifiedUser
                        style={{ color: "#99FF99", fontSize: "1.5rem" }}
                      ></MdVerifiedUser>

                      <p>Verified</p>
                    </div>
                  </div>
                  <div className="doctor-info-rating">
                    <h4>Rating:</h4>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                  </div>
                </div>
              </div>
              <hr />

              <div className="doctor-info-container">
                <div className="doctor-info-rating">
                  <i
                    className="fa-solid fa-thumbs-up"
                    style={{ fontSize: "1.5rem", color: "#ffde34" }}
                  ></i>
                  <h4>Highly Recommended</h4>
                </div>
                <div className="doctor-info-rating">
                  <FcClock style={{ fontSize: "1.5rem" }}></FcClock>{" "}
                  <h4>Excellent Wait Time</h4>
                </div>
                <div className="doctor-info-rating">
                  <BsTrophy style={{ fontSize: "1.5rem" }}></BsTrophy>
                  <h4> Good Performance</h4>
                </div>
              </div>
            </div>
            <div className="doctor-about-container">
              <h1>About Doctor</h1>
              <p>{doctorInfo.about}</p>
              <div className="doctor-about-good">
                <FaQuoteLeft></FaQuoteLeft>
                <p style={{ lineHeight: "2em" }}>
                  Good doctors are humble doctors, willing to listen to their
                  patients and gather together the full array of
                  resources—medical, human, social, and spiritual—that will
                  contribute to their patients' healing. --{" "}
                  <strong>Smart Health</strong>
                </p>
              </div>

              <div className="doctor-practices">
                <h4>Practices</h4>
                <div className="doctor-practice-content">
                  <FaRegHospital
                    style={{ color: "	#000", fontSize: "3rem" }}
                  ></FaRegHospital>

                  <p>{doctorInfo.hospital}</p>
                </div>
              </div>
              <div className="doctor-practices">
                <h4>Specialization</h4>
                <div className="doctor-practice-content">
                  <GiNurseMale
                    style={{ color: "#000", fontSize: "3rem" }}
                  ></GiNurseMale>
                  <p>{doctorInfo.specialisation}</p>
                </div>
              </div>
              <div className="doctor-practices">
                <h4>Qualification</h4>
                <div className="doctor-practice-content">
                  <GrCertificate style={{ fontSize: "3rem" }}></GrCertificate>
                  <p>{doctorInfo.qualification}</p>
                </div>
              </div>
              <div className="doctor-other-info">
                <h4>Medical Registry</h4>
                <div className="registry-item">
                  {registry &&
                    registry.map((item, index) => {
                      if (index === 0) {
                        return (
                          <p key={index}>Malaysia Medical Council: {item}</p>
                        );
                      }
                      return (
                        <p key={index}>National Specialist Register: {item}</p>
                      );
                    })}
                </div>
              </div>
              <div className="doctor-other-info">
                <h4>Languages</h4>
                <p>{doctorInfo.languages}</p>
              </div>
              <div className="doctor-other-info">
                <h4>Conditions Consulted</h4>
                <div className="registry-item">
                  {conditions &&
                    conditions.map((item, index) => {
                      return <p key={index}>{item}</p>;
                    })}
                </div>
              </div>
              <div className="doctor-other-info">
                <h4>Services Consulted</h4>
                <div className="registry-item">
                  {service &&
                    service.map((item, index) => {
                      return <p key={index}>{item}</p>;
                    })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
