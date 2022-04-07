import React from "react";
import ReminderComponent from "../Reminder/ReminderComponent";
import { motion } from "framer-motion";

const Reminder = () => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <ReminderComponent></ReminderComponent>
    </motion.div>
  );
};

export default Reminder;
