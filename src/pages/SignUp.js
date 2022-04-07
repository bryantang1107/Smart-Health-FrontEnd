import React from "react";
import SignUpComponent from "../auth/SignUp";
import { motion } from "framer-motion";

const SignUp = () => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <SignUpComponent></SignUpComponent>
    </motion.div>
  );
};

export default SignUp;
