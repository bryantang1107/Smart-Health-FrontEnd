import React, { useState } from "react";
import { VscVerified } from "react-icons/vsc";
import axios from "../axios";
import { useAuth } from "../context/AuthContext";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Cancel = () => {
  const [error, setError] = useState();
  const { userData } = useAuth();
  const cancelEmail = async (e) => {
    e.preventDefault();
    confirmAlert({
      title: "Are you Sure You want to cancel the daily reminder?",
      message: `If you would like to subscribe to the daily reminder again in the future, please enter your email again!`,
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await axios.delete("/reminder/cancel-email-reminder", {
                data: {
                  userData,
                },
              });
              window.location.reload(false);
            } catch (error) {
              setError(error);
            }
          },
          //cancel the appointment here,same as "done appointment" route
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <section id="reminder-email">
      <div className="subscribe">
        <h2 className="subscribe__title">Reminder Notification</h2>
        <div className="underline"></div>
        <VscVerified className="verified-icon" />
        <p className="subscribe__copy">
          You have activated the daily e-mail reminder feature !<br></br>
          <br></br>
          <strong>
            If you wish to stop receiving the daily email reminder, please click
            the "Cancel" button below
          </strong>
        </p>
        <form className="form">
          <button className="form__button" onClick={cancelEmail} type="submit">
            Cancel
          </button>
        </form>
        {error && <p className="alert-primary">{error}</p>}
      </div>
    </section>
  );
};

export default Cancel;
