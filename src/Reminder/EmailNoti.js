import React from "react";
import axios from "../axios";

const EmailNoti = () => {
  //check for user if they have already entered, only render if user have not yet subscribe
  //allow user to cancel the reminder only if they have already entered
  return (
    <section id="reminder-email">
      <div className="subscribe">
        <h2 className="subscribe__title">Reminder Notification</h2>
        <div className="underline"></div>
        <p className="subscribe__copy">
          Enter Your Email to receive daily reminder to visit Smart Health. We
          promise the email you receive will only be limited to once a day !
          <br></br>
          <br></br>
          <strong>
            We recommend that you only enter your email if you have added any
            reminder in the reminder list.
          </strong>
        </p>
        <div className="form">
          <input
            type="email"
            className="form__email"
            placeholder="Enter your email address"
          />
          <button className="form__button">Submit</button>
        </div>
        <div className="notice">
          <input type="checkbox" required />
          <span className="notice__copy">
            I agree to my email address being stored and uses to recieve daily
            reminder.<br></br>
            <strong>
              Note: If you did not add any reminder, You will still receive an
              email regardless.
            </strong>
          </span>
        </div>
      </div>
    </section>
  );
};

export default EmailNoti;
