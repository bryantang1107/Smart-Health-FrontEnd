import React, { useRef, useState, useEffect } from "react";
import axios from "../axios";
import { useAuth } from "../context/AuthContext";
import Select from "react-select";
import Loading from "../covid/Loading";
import Cancel from "./Cancel";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const EmailNoti = () => {
  const nameRef = useRef();
  const phoneRef = useRef();
  const dateRef = useRef();
  const checkboxRef = useRef();
  const { userData } = useAuth();
  const [timeZone, setTimeZone] = useState();
  const [error, setError] = useState();
  const [data, setData] = useState();
  const detailRef = useRef();
  const [loading, setLoading] = useState();
  const [success, setSuccess] = useState(false);
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
    const getTimeZone = async () => {
      try {
        const response = await axios.get("/reminder/create");
        const option = response.data.map((x) => {
          return {
            value: x,
            label: x,
          };
        });
        setData(option);
      } catch (error) {
        console.log(error);
      }
    };
    getTimeZone();
  }, []);

  const handleClick = () => {
    setError("");
  };

  const getFormatDate = (date) => {
    const d = new Date(date);
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
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

  const submitEmail = async (e) => {
    e.preventDefault();
    try {
      if (checkboxRef.current.checked) {
        setLoading(true);
        await axios.post(`/reminder/${userData}`, {
          name: nameRef.current.value,
          phoneNumber: phoneRef.current.value,
          notification: 0,
          detail: detailRef.current.value,
          timeZone,
          time: dateRef.current.value,
        });

        setTimeout(() => {
          setLoading(false);
          setSuccess(true);
        }, 2000);
      } else {
        setLoading(false);
        return setError("Please tick the checkbox !");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const getDate = () => {
    const date = new Date();
    return moment(date).format("yyyy-MM-DDTHH:mm");
  };
  if (loading) {
    return <Loading />;
  }
  if (success) {
    return <Cancel />;
  }
  return (
    <section id="reminder-email">
      <div className="subscribe">
        <h2 className="subscribe__title">SMS Appointment Reminder</h2>
        <div className="underline"></div>
        <p className="subscribe__copy">
          Enter Your details to receive an appointment reminder.
        </p>
        <form className="form" onSubmit={submitEmail}>
          <input
            type="text"
            className="form__email"
            placeholder="Enter your Name"
            ref={nameRef}
            required
          />
          <input
            type="tel"
            className="form__email"
            pattern={"[0-9]{11}"}
            placeholder="60123456789"
            ref={phoneRef}
            required
          />
          <textarea
            rows="15"
            cols="10"
            className="form__email"
            placeholder="Enter reminder details here"
            ref={detailRef}
            required
          />
          <input
            type="datetime-local"
            className="form__email"
            ref={dateRef}
            required
            min={getDate()}
            onChange={checkDate}
          />
          {data && (
            <Select
              options={data}
              onChange={(e) => {
                setTimeZone(e.value);
              }}
            />
          )}

          <button className="form__button" type="submit">
            Submit
          </button>
        </form>
        {error && <p className="alert-primary">{error}</p>}
        <div className="notice">
          <input
            type="checkbox"
            required
            ref={checkboxRef}
            onClick={handleClick}
          />
          <span className="notice__copy">
            I agree to my details being stored are legitimate.<br></br>
          </span>
        </div>
      </div>
    </section>
  );
};

export default EmailNoti;
