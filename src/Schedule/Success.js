import React from "react";
import { MdDoneAll } from "react-icons/md";
const Success = () => {
  return (
    <div className="success-page">
      <span className="success-logo">
        <MdDoneAll />
      </span>
      <h4>SUCCESS</h4>
      <p>Congratulations, you have completed your appointment!</p>
      <p>Thank you for using Smart Health !</p>
      <a href="/" className="btn green">
        Home
      </a>
    </div>
  );
};

export default Success;
