import React, { useState, useEffect, useRef } from "react";
import axios from "../axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useAuth } from "../context/AuthContext";
import Select from "react-select";
import { IoIosArrowBack } from "react-icons/io";
import { motion } from "framer-motion";
import { AiOutlineEdit } from "react-icons/ai";
import Loading from "../covid/Loading";
import moment from "moment";
import Cancel from "./Cancel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const ReminderDetail = ({ setView }) => {
  const { userData } = useAuth();
  const nameRef = useRef();
  const phoneRef = useRef();
  const dateRef = useRef();
  const detailRef = useRef();
  const [timeZone, setTimeZone] = useState();
  const [error, setError] = useState();
  const [data, setData] = useState();
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState();
  const [success, setSuccess] = useState(false);
  const [option, setOption] = useState();
  const notify = (text) => {
    toast.error(text, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    const getDetails = async () => {
      const response = await axios.get(`/reminder/${userData}/edit`);
      setData(response.data);
      const response2 = await axios.get("/reminder/create");
      const option = response2.data.map((x) => {
        return {
          value: x,
          label: x,
        };
      });
      setOption(option);
    };
    getDetails();
  }, []);

  const cancelEmail = async (e) => {
    e.preventDefault();
    confirmAlert({
      title: "Are you Sure You want to cancel the daily reminder?",
      message: `If you click "Yes" you will no longer receive the SMS reminder for your upcoming appointment`,
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
        },
        {
          label: "No",
        },
      ],
    });
  };

  const editDetail = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`/reminder/${userData}/edit`, {
        name: nameRef.current.value,
        phoneNumber: phoneRef.current.value,
        notification: 0,
        detail: detailRef.current.value,
        timeZone: timeZone ? timeZone.value : data.timeZone,
        time: dateRef.current.value,
      });

      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 2000);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const getDate = (date) => {
    return moment(date).format("yyyy-MM-DDTHH:mm");
  };
  const checkDate = () => {
    const a = moment(getDate()).add(1, "minute");
    const b = moment(dateRef.current.value);
    if (a.diff(b) > 0) {
      notify(
        `The selected time is invalid, time must be ${getFormatDate(
          a.toLocaleString()
        )} or later`
      );
      dateRef.current.value = "";
      return false;
    }
    toast.dismiss();
    return true;
  };

  const getMinDate = () => {
    const date = new Date();
    return moment(date).format("yyyy-MM-DDTHH:mm");
  };

  const getFormatDate = (date) => {
    const d = new Date(date);
    let hours = d.getUTCHours();
    let minutes = d.getUTCMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    return d.toLocaleDateString() + " " + strTime;
  };
  if (success) {
    return <Cancel />;
  }
  if (loading) {
    return <Loading />;
  }
  if (edit && data) {
    return (
      <section id="reminder-email">
        <div className="subscribe">
          <div className="container">
            <span
              onClick={() => setEdit(false)}
              className="back join-video"
              data-tooltip="Back"
            >
              <IoIosArrowBack />
            </span>
          </div>
          {error && <p className="alert-primary">{error}</p>}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ stiffness: 100 }}
          >
            <form className="form" onSubmit={editDetail}>
              <input
                type="text"
                className="form__email"
                placeholder="Enter your Name"
                ref={nameRef}
                defaultValue={data.name}
                required
              />
              <input
                type="tel"
                className="form__email"
                pattern={"[0-9]{11}"}
                placeholder="60123456789"
                ref={phoneRef}
                defaultValue={data.phoneNumber}
                required
              />
              <textarea
                rows="15"
                cols="10"
                className="form__email"
                placeholder="Enter reminder details here"
                ref={detailRef}
                defaultValue={data.detail}
                required
              />
              <input
                type="datetime-local"
                className="form__email"
                ref={dateRef}
                defaultValue={getDate(data.time)}
                required
                min={getMinDate()}
                onChange={checkDate}
              />
              {option && (
                <Select
                  options={option}
                  onChange={setTimeZone}
                  defaultValue={data.timeZone}
                />
              )}

              <button className="form__button" type="submit">
                Edit
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ stiffness: 100 }}
    >
      <section id="reminder-email">
        <div className="subscribe">
          <h2 className="subscribe__title">SMS Appointment Reminder</h2>
          <div className="underline"></div>
          <div className="container">
            <span
              onClick={() => setView(false)}
              className="back join-video"
              data-tooltip="Back"
            >
              <IoIosArrowBack />
            </span>
            {data && (
              <span
                onClick={() => setEdit(!edit)}
                className="join-video edit"
                data-tooltip="Edit"
              >
                <AiOutlineEdit />
              </span>
            )}

            {data && (
              <div className="form">
                <h3>Name</h3>
                <div className="form__email">
                  <p>{data.name}</p>
                </div>
                <h3>Phone number</h3>
                <div className="form__email">
                  <p>{data.phoneNumber}</p>
                </div>
                <h3>reminder detail</h3>
                <div className="form__email">
                  <p>{data.detail}</p>
                </div>
                <h3>reminder date</h3>
                <div className="form__email">
                  <strong>{getFormatDate(data.time)}</strong>
                </div>
                <h3>TimeZone</h3>
                <div className="form__email">
                  <strong>{data.timeZone}</strong>
                </div>
              </div>
            )}
            <form className="form">
              <button className="green btn" onClick={cancelEmail} type="submit">
                Cancel
              </button>

              {error && <p className="alert-primary">{error}</p>}
            </form>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ReminderDetail;
