import React, { useEffect } from "react";
import CovidComponent from "../covid";
import { motion } from "framer-motion";

const Covid = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <CovidComponent></CovidComponent>
      </motion.div>
      {/* add article here */}
    </>
  );
};

export default Covid;
