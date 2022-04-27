import React, { useState, useEffect } from "react";
import "./home.css";
import { BsFillHeartFill } from "react-icons/bs";
import { AiOutlineLock, AiOutlineFieldTime } from "react-icons/ai";
import { MdGppGood } from "react-icons/md";
import Review from "./Review";
import HeroComponent from "./HeroComponent";
import HowTo from "./HowTo";
import Service from "./Service";
import Reminder from "./Reminder";
import { motion } from "framer-motion";
import Welcome from "./Welcome";
import { useAuth } from "../../context/AuthContext";
import axios from "../../axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const Home = () => {
  const [reminderData, setReminderData] = useState(false);
  const { userData, currentUser, userRole } = useAuth();
  const [reminderLength, setReminderLength] = useState();
  const notify = () => {
    toast.info("Please Remember to constantly check your reminder !", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: false,
    });
  };
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (currentUser) {
      const getReminder = async () => {
        try {
          const response = await axios.get(
            `/reminder/get-reminder/${userData}`
          );
          if (response.data.length > 0) {
            setReminderLength(response.data.length);
            notify();
            return setReminderData(true);
          }
        } catch (err) {
          setReminderData(false);
        }
      };

      getReminder();
    }
  }, []);
  return (
    <>
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {currentUser && reminderData && userRole !== "doctor" && (
          <Reminder reminderLength={reminderLength}></Reminder>
        )}
        <div className="head-hero">
          <Welcome></Welcome>
        </div>
        <div>
          <section id="hero">
            <HeroComponent></HeroComponent>
          </section>

          <h1 style={{ textAlign: "center", marginTop: "3em" }}>
            Why Choose Us
          </h1>
          <div className="underline"></div>
          <div className="container" style={{ marginBottom: "5em" }}>
            <div className="row">
              <div className="icon-box">
                <div className="icon">
                  <BsFillHeartFill></BsFillHeartFill>
                </div>
                <h4 className="title">Genuine Service</h4>
                <p className="description">
                  We Provide Free & Genuine Consultation.
                </p>
              </div>

              <div className="icon-box">
                <div className="icon">
                  <AiOutlineLock></AiOutlineLock>
                </div>
                <h4 className="title">Secure</h4>
                <p className="description">
                  Have A Safe Consultation With Our Specialists. Medical
                  Information Will Be Kept Confidential.
                </p>
              </div>

              <div className="icon-box">
                <div className="icon">
                  <MdGppGood></MdGppGood>
                </div>
                <h4 className="title">Experienced Specialist</h4>
                <p className="description">
                  Smart Health Provides Experienced Specialists.
                </p>
              </div>

              <div className="icon-box">
                <div className="icon">
                  <AiOutlineFieldTime></AiOutlineFieldTime>
                </div>
                <h4 className="title">Quick Transactions</h4>
                <p className="description">
                  Effective And Fast Transactions. Get Your Digital Prescription
                  Immediately After Consultation.
                </p>
              </div>
            </div>
          </div>
        </div>
        <HowTo></HowTo>
        <Service></Service>
        <Review></Review>
      </motion.div>
    </>
  );
};

export default Home;
