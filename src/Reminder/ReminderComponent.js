import React, { useState, useRef, useEffect } from "react";
import "../css/reminder.css";
import ReminderItem from "./ReminderItem";
import { FaPills } from "react-icons/fa";
import { GiPlatform } from "react-icons/gi";
import { MdOutlineDescription } from "react-icons/md";
import Alert from "./Alert";
import Empty from "./Empty";

const ReminderComponent = () => {
  const [reminderData, setReminderData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const labelRef = useRef(null);
  const platformRef = useRef(null);
  const descriptionRef = useRef(null);

  const handleSubmit = (e) => {
    const labelValue = labelRef.current.value;
    const platformValue = platformRef.current.value;
    const descriptionValue = descriptionRef.current.value;
    e.preventDefault();
    if (!labelValue || !platformValue || !descriptionValue) {
      showAlert(true, "danger", "The Form Is Not Complete !");
    } else {
      showAlert(true, "success", "Reminder Added !");
      setReminderData((data) => {
        labelRef.current.value = "";
        platformRef.current.value = "";
        descriptionRef.current.value = "";
        setToggle(false);
        return [
          ...data,
          {
            label: labelValue,
            platform: platformValue,
            description: descriptionValue,
          },
        ];
      });
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  useEffect(() => {
    window.scrollTo({ top: 1000, left: 0, behavior: "smooth" });
    localStorage.setItem("value", JSON.stringify(reminderData));
  }, [reminderData]);

  return (
    <div>
      <h1 className="reminder-title">Reminder</h1>
      <div className="underline"></div>

      <div className="reminder-banner">
        <div className="reminder-hero-container">
          <h2 className="reminder-header">Hello There,</h2>
          <h1 className="reminder-big-header">
            Welcome to Smart Health's very first reminder feature.
          </h1>
          <p className="reminder-text">
            Enjoy Our Free Reminder Feature. Get reminded for your upcoming
            appointment via E-mail & SMS daily prior to your appointment.
          </p>
        </div>
      </div>

      <div className="reminder-list-container">
        <h3>Reminder List</h3>
        <div className="underline"></div>

        <div className="reminder-list">
          <div className="reminder-content">
            {reminderData.length > 0 ? "" : <Empty></Empty>}
            {alert.show && alert.type === "success" && (
              <Alert {...alert} removeAlert={showAlert}></Alert>
            )}
            {reminderData.map((item, index) => {
              return <ReminderItem key={index} {...item}></ReminderItem>;
            })}
          </div>

          <button
            className="doctor-consult-btn"
            style={{ marginBottom: "1em", display: "flex", marginTop: "3em" }}
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            {!toggle ? "Add Reminder" : "Cancel"}
          </button>
        </div>

        {toggle && (
          <div className="add-reminder">
            <h1>Add Reminder</h1>
            {alert.show && alert.type === "danger" && (
              <Alert {...alert} removeAlert={showAlert}></Alert>
            )}
            <form className="reminder-form">
              <div className="reminder-label">
                <label htmlFor="header">Reminder Label</label>
                <div className="input-header">
                  <span>
                    <FaPills></FaPills>
                  </span>
                  <input type="text" name="header" ref={labelRef} required />
                </div>
              </div>
              <div className="reminder-platform">
                <label htmlFor="platform">Platform</label>
                <div className="input-header">
                  <span>
                    <GiPlatform></GiPlatform>
                  </span>
                  <input
                    type="text"
                    name="platform"
                    ref={platformRef}
                    required
                  />
                </div>
              </div>
              <div className="reminder-description">
                <label htmlFor="description">Description</label>
                <div className="input-description">
                  <span>
                    <MdOutlineDescription></MdOutlineDescription>
                  </span>
                  <textarea
                    name="description"
                    id=""
                    cols="20"
                    rows="8"
                    ref={descriptionRef}
                    required
                  ></textarea>
                </div>
              </div>
            </form>
            <button
              type="submit"
              className="doctor-consult-btn"
              style={{
                display: "flex",
                marginTop: "3em",
                marginBottom: "1em",
              }}
              onClick={handleSubmit}
            >
              {" "}
              Add Reminder
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReminderComponent;
