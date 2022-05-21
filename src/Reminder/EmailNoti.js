import React, { useRef, useState, useEffect } from "react";
import axios from "../axios";
import { useAuth } from "../context/AuthContext";
import Select from "react-select";

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

  const submitEmail = async (e) => {
    try {
      if (checkboxRef.current.checked) {
        return await axios.post(`/reminder/${userData}`, {
          name: nameRef.current.value,
          phoneNumber: phoneRef.current.value,
          notification: 0,
          detail: detailRef.current.value,
          timeZone,
          time: dateRef.current.value,
        });
      } else {
        e.preventDefault();
        return setError("Please tick the checkbox !");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section id="reminder-email">
      <div className="subscribe">
        <h2 className="subscribe__title">SMS Appointment Reminder</h2>
        <div className="underline"></div>
        <p className="subscribe__copy">
          Enter Your details to receive an appointment reminder.
        </p>
        <form className="form">
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
            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
            placeholder="012-345-6789"
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
          />
          {data && (
            <Select
              options={data}
              onChange={(e) => {
                setTimeZone(e.value);
              }}
            />
          )}

          <button className="form__button" onClick={submitEmail} type="submit">
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
