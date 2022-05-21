import React, { useState, useEffect } from "react";
import Upcoming from "../Schedule/Upcoming";
import Past from "../Schedule/Past";
import { motion } from "framer-motion";

const PatientInfoComponent = () => {
  const [nav, setNav] = useState("upcoming");
  const [past, setPast] = useState();
  const [upcoming, setUpcoming] = useState(true);

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
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <div className="user-entire-container">
        <div className="appointment-container">
          <div className="nav-bar-appointment">
            <span
              onClick={() => {
                handleClick("upcoming");
              }}
              className={`nav-btn ${upcoming ? "active" : null}`}
            >
              Upcoming Appointment
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
              <div className="appointment-details">
                <Past />
              </div>
            </motion.div>
          )}
          {nav === "upcoming" && (
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ stiffness: 100 }}
            >
              <div className="appointment-details">
                <Upcoming />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default PatientInfoComponent;
