import React, { useState } from "react";
import { VscVerified } from "react-icons/vsc";
import ReminderDetail from "./ReminderDetail";

const Cancel = () => {
  const [view, setView] = useState();
  return !view ? (
    <section id="reminder-email">
      <div className="subscribe">
        <h2 className="subscribe__title">SMS Appointment Reminder</h2>
        <div className="underline"></div>
        <VscVerified className="verified-icon" />
        <p className="subscribe__copy">
          You have enabled the SMS reminder feature !<br></br>
        </p>
        <span className="green btn" onClick={() => setView(true)}>
          view reminder details
        </span>
      </div>
    </section>
  ) : (
    <ReminderDetail setView={setView} />
  );
};

export default Cancel;
