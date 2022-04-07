import React, { useEffect } from "react";
import { motion } from "framer-motion";
import HealthForumComponent from "../Health/HealthForumComponent";

const Medical = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <HealthForumComponent />
    </motion.div>
  );
};

export default Medical;
