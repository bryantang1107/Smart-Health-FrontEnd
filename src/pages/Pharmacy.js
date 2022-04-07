import React, { useEffect } from "react";
import PharmacyComponent from "../Pharmacy/PharmacyComponent";
import { motion } from "framer-motion";
const Pharmacy = () => {
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
      <PharmacyComponent></PharmacyComponent>
    </motion.div>
  );
};

export default Pharmacy;
