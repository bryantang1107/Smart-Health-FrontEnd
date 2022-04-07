import React from "react";
import Question from "../support/Question";
import { motion } from "framer-motion";

const Qna = () => {
  return;
  <motion.div
    animate={{ opacity: 1 }}
    initial={{ opacity: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1 }}
  >
    <Question></Question>
  </motion.div>;
};

export default Qna;
