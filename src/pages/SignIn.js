import React from "react";
import SignInComponent from "../auth/SignIn";
import { motion } from "framer-motion";

const SignIn = () => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <SignInComponent></SignInComponent>
    </motion.div>
  );
};

export default SignIn;
