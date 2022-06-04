import React from "react";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "../axios";
import { useAuth } from "../context/AuthContext";
import { MdVerifiedUser } from "react-icons/md";
import { FcClock } from "react-icons/fc";
import { FaRegHospital, FaQuoteLeft } from "react-icons/fa";
import { BsTrophy } from "react-icons/bs";
import { GiNurseMale } from "react-icons/gi";
import { GrCertificate } from "react-icons/gr";
import Arrow from "./Arrow";
import "../css/doctor.css";
import { motion } from "framer-motion";
import AppointmentForm from "./AppointmentForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../covid/Loading";

toast.configure();
const customId = "custom-id-yes";
const Doctor = () => {
  const { id } = useParams();
  const { currentUser, userRole, userData } = useAuth();
  const history = useHistory();
  const [Info, setInfo] = useState({});
  const [registry, setRegistry] = useState();
  const [conditions, setConditions] = useState();
  const [service, setService] = useState();
  const [loading, setLoading] = useState();
  const notify = (text, type) => {
    if (type) {
      return toast.error(text, {
        toastId: customId,
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        delay: 1000,
      });
    }
    toast(text, {
      toastId: customId,
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      delay: 1000,
    });
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    const getData = async () => {
      setLoading(true);
      const response = await axios.get(`/authroom/appointment/${userData}`);
      if (response.data) {
        notify(
          "You are only entitled to 1 hour of free consultation per booking."
        );
      } else {
        notify("It Seems Like You Have A Pending Appointment.", "danger");
      }
      setLoading(false);
    };
    getData();
  }, []);

  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    const getDoctor = async (doctorId) => {
      const response = await axios.get(`/find-doctor/${doctorId}`, {
        headers: {
          Authorization: "Bearer " + currentUser,
        },
      });

      const information = response.data;

      const { registry, conditions, service, ...data } = information;

      setInfo(data);
      setRegistry(registry);
      setConditions(conditions);
      setService(service);
    };
    getDoctor(id);
  }, [id, currentUser]);

  if (loading) {
    return <Loading />;
  }

  if (userRole === "doctor")
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <Arrow goBack={goBack}></Arrow>
        <div className="doctor-entire-container doctor-role">
          <div className="doctor-header-container">
            <div className="doctor-header-info">
              <div className="doctor-header-image">
                <img src={Info.image} alt="" />
              </div>
              <div className="doctor-header-name">
                <h1>{Info.name}</h1>
                <h4>{Info.category}</h4>

                <div className="doctor-header-experience">
                  <i
                    className="fa-solid fa-user-doctor"
                    style={{ fontSize: "1.5rem" }}
                  ></i>
                  <h4>{Info.experience}</h4>
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
          <div className="doctor-about-container w-80">
            <h1>About Doctor</h1>
            <p>{Info.about}</p>
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

                <p>{Info.hospital}</p>
              </div>
            </div>
            <div className="doctor-practices">
              <h4>Specialization</h4>
              <div className="doctor-practice-content">
                <GiNurseMale
                  style={{ color: "#000", fontSize: "3rem" }}
                ></GiNurseMale>
                <p>{Info.specialisation}</p>
              </div>
            </div>
            <div className="doctor-practices">
              <h4>Qualification</h4>
              <div className="doctor-practice-content">
                <GrCertificate style={{ fontSize: "3rem" }}></GrCertificate>
                <p>{Info.qualification}</p>
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
              <p>{Info.languages}</p>
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
      </motion.div>
    );
  else {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <Arrow goBack={goBack}></Arrow>
        <div className="doctor-entire-container">
          <div className="doctor-header-container">
            <div className="doctor-header-info">
              <div className="doctor-header-image">
                <img src={Info.image} alt="" />
              </div>
              <div className="doctor-header-name">
                <h1>{Info.name}</h1>
                <h4>{Info.category}</h4>

                <div className="doctor-header-experience">
                  <i
                    className="fa-solid fa-user-doctor"
                    style={{ fontSize: "1.5rem" }}
                  ></i>
                  <h4>{Info.experience}</h4>
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
            <p>{Info.about}</p>
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

                <p>{Info.hospital}</p>
              </div>
            </div>
            <div className="doctor-practices">
              <h4>Specialization</h4>
              <div className="doctor-practice-content">
                <GiNurseMale
                  style={{ color: "#000", fontSize: "3rem" }}
                ></GiNurseMale>
                <p>{Info.specialisation}</p>
              </div>
            </div>
            <div className="doctor-practices">
              <h4>Qualification</h4>
              <div className="doctor-practice-content">
                <GrCertificate style={{ fontSize: "3rem" }}></GrCertificate>
                <p>{Info.qualification}</p>
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
              <p>{Info.languages}</p>
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
          <div className="doctor-appointment-container">
            <AppointmentForm />
          </div>
        </div>
      </motion.div>
    );
  }
};

export default Doctor;
