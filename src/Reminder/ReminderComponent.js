import React, { useState, useRef, useEffect } from "react";
import "../css/reminder.css";
import ReminderItem from "./ReminderItem";
import { FaPills } from "react-icons/fa";
import { GiPlatform } from "react-icons/gi";
import { MdOutlineDescription } from "react-icons/md";
import Alert from "./Alert";
import Empty from "./Empty";
import axios from "../axios";
import { useAuth } from "../context/AuthContext";
import EmailNoti from "./EmailNoti";
import Cancel from "./Cancel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const customId = "lol";

const ReminderComponent = () => {
  const [reminderData, setReminderData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const { userData } = useAuth();
  const [reminder, setReminder] = useState();
  const [canBook, setCanBook] = useState(true);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const labelRef = useRef(null);
  const platformRef = useRef(null);
  const descriptionRef = useRef(null);
  const notify = (text) => {
    toast.info(text, {
      toastId: customId,
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      autoClose: false,
      draggable: true,
      progress: undefined,
    });
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/reminder/get-reminder/${userData}`);
        setReminderData(response.data);
        const response2 = await axios.get(`/authroom/appointment/${userData}`);
        if (response2.data) {
          return setCanBook(true);
        } else {
          setCanBook(false);
        }
      } catch (error) {
        showAlert(true, "danger", "Unable to retrieve information !");
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const checkEmail = async () => {
      try {
        const response = await axios.get(
          `/reminder/email-reminder/${userData}`
        );
        setReminder(response.data);
      } catch (error) {
        showAlert(true, "danger", "Server Error, please try again later");
      }
    };
    checkEmail();
  }, []);

  const handleSubmit = async (e) => {
    const labelValue = labelRef.current.value;
    const platformValue = platformRef.current.value;
    const descriptionValue = descriptionRef.current.value;
    e.preventDefault();
    if (!labelValue || !platformValue || !descriptionValue) {
      showAlert(true, "danger", "The Form Is Not Complete !");
    } else {
      showAlert(true, "success", "Reminder Added To Database!");
      setReminderData((data) => {
        labelRef.current.value = "";
        platformRef.current.value = "";
        descriptionRef.current.value = "";
        setToggle(false);
        storeToDb({
          label: labelValue,
          date: platformValue,
          description: descriptionValue,
        });
        return [
          ...data,
          {
            label: labelValue,
            date: platformValue,
            description: descriptionValue,
          },
        ];
      });
    }
  };

  const storeToDb = async (obj) => {
    try {
      await axios.post("/user/update", {
        userData,
        obj,
      });
    } catch (err) {
      showAlert(true, "danger", "Unable to store reminder to database !");
    }
  };

  const handleDelete = async (index) => {
    try {
      await axios.delete(`/reminder/${index}`, {
        data: {
          userData,
          index,
        },
      });
      const updatedData = reminderData.filter((x, i) => {
        if (i !== index) {
          return x;
        }
      });

      showAlert(true, "success", "Successfully deleted");
      setReminderData(updatedData);
    } catch (err) {
      showAlert(true, "danger", "Unable To Delete, Try again later!");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
            appointment via E-mail daily prior to your appointment.
          </p>
        </div>
      </div>
      {!reminder && !canBook ? <EmailNoti /> : !canBook && <Cancel />}
      <div className="reminder-list-container">
        <h3>Reminder List</h3>
        {reminderData && (
          <div className="reminder-list">
            <div className="reminder-content">
              {reminderData.length > 0 ? "" : <Empty></Empty>}
              {alert.show && alert.type === "success" && (
                <Alert {...alert} removeAlert={showAlert}></Alert>
              )}
              {reminderData.map((item, index) => {
                return (
                  <ReminderItem
                    key={index}
                    {...item}
                    index={index}
                    handleDelete={handleDelete}
                  ></ReminderItem>
                );
              })}
            </div>

            <button
              className="doctor-consult-btn"
              style={{ marginBottom: "1em", display: "flex", marginTop: "3em" }}
              onClick={() => {
                setToggle(!toggle);
                if (!toggle) {
                  notify(
                    "This Is A Free Feature By Smart Health That Allows You To Store Any Reminders. You Are Entitled To Use This Feature To Store Any Information."
                  );
                }
              }}
            >
              {!toggle ? "Add Reminder" : "Cancel"}
            </button>
          </div>
        )}

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
                <label htmlFor="platform">Date & Time</label>
                <div className="input-header">
                  <span>
                    <GiPlatform></GiPlatform>
                  </span>
                  <input
                    style={{ textTransform: "uppercase" }}
                    type="datetime-local"
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
                    style={{ resize: "none" }}
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
              Add Reminder
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReminderComponent;
