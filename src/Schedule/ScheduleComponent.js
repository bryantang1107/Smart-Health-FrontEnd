import React, { useState } from "react";
import Upcoming from "./Upcoming";
import Past from "./Past";
import { motion } from "framer-motion";

import "./schedule.css";

const ScheduleComponent = () => {
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

  return (
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
  );
};

export default ScheduleComponent;
