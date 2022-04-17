import React, { useEffect } from "react";
import Question from "../support/Question";
import { motion } from "framer-motion";

const Qna = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Question></Question>
    </motion.div>
  );
};

export default Qna;
