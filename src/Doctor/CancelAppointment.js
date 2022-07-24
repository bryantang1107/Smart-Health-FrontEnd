import React, { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "../axios";
import { motion } from "framer-motion";
import Arrow from "./Arrow";
import { useHistory } from "react-router-dom";
import { MdVerifiedUser } from "react-icons/md";
import { FcClock } from "react-icons/fc";
import { FaRegHospital, FaQuoteLeft } from "react-icons/fa";
import { BsTrophy } from "react-icons/bs";
import { GiNurseMale } from "react-icons/gi";
import { GrCertificate } from "react-icons/gr";
import { useAuth } from "../context/AuthContext";
import Error from "../pages/Error";
import Loading from "../covid/Loading";
import SuccessCancel from "./SuccessCancel";

const CancelAppointment = () => {
  const history = useHistory();
  const [registry, setRegistry] = useState();
  const [conditions, setConditions] = useState();
  const [service, setService] = useState();
  const [Info, setInfo] = useState({});
  const { userData, userInfo } = useAuth();
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    const getDoctor = async () => {
      try {
        const response = await axios.get(`/user/userDoctor/${userData}`);
        if (!response) return setError(true);
        const information = response.data[0];
        const { registry, conditions, service, ...data } = information;
        setName(response.data[1]);
        setInfo(data);
        setRegistry(registry);
        setConditions(conditions);
        setService(service);
        setError(false);
      } catch (error) {
        setError(true);
      }
    };
    getDoctor();
  }, []);
  const cancel = (e) => {
    e.preventDefault();

    if (name || reason) {
      setLoading(true);
      confirmAlert({
        title: "Are you Sure You want to cancel your appointment?",
        message: `By Clicking "Cancel", you acknowledge that you want to cancel the appointment 
                  and your room credentials will no longer be valid. Please reschedule
                  with your doctor if necessary. Please note that if you have consulted your doctor, 
                  you will not receive your pending digital prescription from your doctor.`,
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              try {
                setLoading(true);
                await axios.delete(`/appointment/${userData}`, {
                  data: {
                    name,
                    email: userInfo._delegate.email,
                    reason,
                  },
                });
                setTimeout(() => {
                  setLoading(false);
                  setSuccess(true);
                }, 3000);
              } catch (err) {
                console.log(err);
              }
            },
            //cancel the appointment here,same as "done appointment" route
          },
          {
            label: "No",
            onClick: () => {
              setLoading(false);
            },
          },
        ],
      });
    }
  };
  const goBack = () => {
    history.goBack();
  };
  if (error) {
    return <Error />;
  }

  if (success) {
    return <SuccessCancel />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Arrow goBack={goBack}></Arrow>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 style={{ textAlign: "center" }}>Cancel Appointment</h1>
          <div className="underline"></div>
          <div className="cancel-appointment-container">
            <p>Do you want to cancel your appointment with {Info.name} ?</p>
            <form className="form" onSubmit={cancel}>
              <h2>Cancel Appointment</h2>

              <p type="Reason of cancellation:" required>
                <input
                  type="text"
                  placeholder="Please tell us your reason of cancellation.."
                  value={reason}
                  style={{ textTransform: "none" }}
                  onChange={(e) => setReason(e.target.value)}
                ></input>
              </p>
              <button type="submit">Cancel</button>
            </form>
          </div>
        </>
      )}

      <div className="doctor-entire-container doctor-role">
        <h2 style={{ textAlign: "center" }}>Doctor Information</h2>
        <div className="underline"></div>
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
              patients and gather together the full array of resources—medical,
              human, social, and spiritual—that will contribute to their
              patients' healing. -- <strong>Smart Health</strong>
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
                    return <p key={index}>Malaysia Medical Council: {item}</p>;
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
};

export default CancelAppointment;
