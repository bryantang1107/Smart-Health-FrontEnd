import React from "react";

import "../css/success.css";
import { motion } from "framer-motion";

const Success = () => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="cardz-container">
        <div className="cardz">
          <div className="cardz-item">
            <i className="checkmark">✓</i>
          </div>
          <h1>Success</h1>
          <p>Account Successfully Updated</p>

          <a href="/" className="button-6" role="button">
            Home
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Success;
