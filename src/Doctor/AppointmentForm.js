import React, { useState, useRef, useEffect } from "react";
import "./nodoctor.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faPen } from "@fortawesome/free-solid-svg-icons";
import axios from "../axios";
import short from "short-uuid";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import Loading from "../covid/Loading";
import Success from "./Success";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import TimePicker from "./TimePicker";
import Error from "./Error";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const TextFieldComponent = (props) => {
  return <TextField {...props} disabled={true} />;
};

const AppointmentForm = () => {
  const getMinDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date;
  };

  const [gender, setGender] = useState("male");
  const [time, setTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(() => getMinDate());
  const { id } = useParams();
  const { userData } = useAuth();
  const [success, setSuccess] = useState(false);
  const [slotError, setSlotError] = useState();
  const [canBook, setCanBook] = useState(true);
  const [error, setError] = useState();
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const dobRef = useRef();
  const symptomsRef = useRef();
  const termRef = useRef();
  const [loading, setLoading] = useState();

  useEffect(() => {
    const checkAppointment = async () => {
      try {
        const response = await axios.get(`/authroom/appointment/${userData}`);
        if (response.data) {
          return setCanBook(true);
        } else {
          setCanBook(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    checkAppointment();
  }, []);

  const handleError = () => {
    setSlotError(false);
    setTime();
  };

  const handleCancel = () => {
    confirmAlert({
      title: "Are you Sure You want to cancel your appointment?",
      message: `By Clicking "Cancel", you acknowledge that you want to cancel the appointment 
      and your room credentials will no longer be valid. Please reschedule
      with your doctor if necessary.`,
      buttons: [
        {
          label: "Yes",
          onClick: () => alert("Click Yes"),
          //cancel the appointment here,same as "done appointment" route
        },
        {
          label: "No",
        },
      ],
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const bookAppointment = async () => {
      setLoading(true);
      let salt = "";
      let chars =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (let i = 0; i <= 5; i++) {
        let randomNum = Math.floor(Math.random() * chars.length);
        salt += chars.substring(randomNum, randomNum + 1);
      }
      const roomId = short.generate();
      const userInfo = {
        userId: userData,
        name: nameRef.current.value,
        email: emailRef.current.value,
        phone: phoneRef.current.value,
        dob: dobRef.current.value,
        symptoms: symptomsRef.current.value,
        date: selectedDate.toISOString().split("T")[0],
        time,
        gender,
        doctorInfo: id,
      };

      try {
        await axios.post("/authroom/register", {
          room_id: roomId,
          password: salt,
          userInfo,
        });
        setTimeout(() => {
          setLoading(false);
          setSuccess(true);
        }, 3000);
      } catch (err) {
        setLoading(false);
        setSlotError("The time slot is unavailable, please try other slot");
      }
    };
    if (!termRef.current.checked) {
      setError("Please accept the terms and condition");
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      return;
    }
    bookAppointment();
  };
  if (loading) {
    return <Loading />;
  }
  if (success) {
    return <Success></Success>;
  }

  if (slotError) {
    return <Error error={slotError} handleError={handleError} />;
  }

  if (!canBook) {
    //use userdata to check if this user has booked appointment
    return (
      <div className="invalid-booking">
        <FontAwesomeIcon
          icon={faCircleExclamation}
          style={{ fontSize: "3rem", color: "#DC143C" }}
        />
        <p className="invalid-content">
          It Seems Like You have a pending appointment.
        </p>
        <h3 style={{ color: "#00bbcf" }}>
          Cant Book An Appointment? Here are some options that may help you.
        </h3>
        <ol className="gradient-list">
          <li>
            You have already made appointment with a doctor. Please note that
            you are only entitled for one appointment at a time.
          </li>
          <li>
            Please ensure that you have clicked "Done" in your appointment
            schedule.
          </li>
        </ol>
        <h2 style={{ color: "#00bbcf" }}>
          If you wish to cancel your appointment:
        </h2>
        <span className="btn green" onClick={handleCancel}>
          Click here
        </span>
      </div>
    );
  }

  const getMaxDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 2);
    return date;
  };

  return (
    <>
      <form id="appointment-submit" onSubmit={handleSubmit}>
        <div className="row-appointment">
          <h4>Patient Information</h4>
          {error && <p className="alert-primary">{error}</p>}
          <div className="input-group input-group-icon">
            <input
              type="text"
              placeholder="Full Name"
              autoFocus
              ref={nameRef}
              required
            />
            <div className="input-icon">
              <i className="fa fa-user"></i>
            </div>
          </div>
          <div className="input-group input-group-icon">
            <input
              type="email"
              placeholder="Email Adress"
              ref={emailRef}
              required
            />
            <div className="input-icon">
              <i className="fa fa-envelope"></i>
            </div>
          </div>
          <div className="input-group input-group-icon">
            <input
              type="tel"
              placeholder="012-345-7890 or 012-3456-7890"
              pattern={
                ("[0-9]{3}-[0-9]{3}-[0-9]{4}", "[0-9]{3}-[0-9]{4}-[0-9]{4}")
              }
              multiple
              ref={phoneRef}
            />
            <div className="input-icon">
              <i className="fa fa-phone"></i>
            </div>
          </div>
        </div>
        <div className="row-appointment">
          <div className="col-half">
            <h4>Date of Birth</h4>
            <div className="input-group">
              <input type="date" name="birthdate" ref={dobRef} required />
            </div>
          </div>
          <div className="col-half">
            <h4>Gender</h4>
            <div className="input-group">
              <input
                id="gender-male"
                type="radio"
                name="gender"
                value="male"
                onClick={() => setGender("male")}
                defaultChecked
              />
              <label htmlFor="gender-male">Male</label>
              <input
                id="gender-female"
                type="radio"
                name="gender"
                value="female"
                onClick={() => setGender("female")}
              />
              <label htmlFor="gender-female">Female</label>
            </div>
          </div>
        </div>
        <div className="row-appointment">
          <h4>Symptoms/Reason for consultation</h4>
          <div className="input-group input-group-icon bb">
            <textarea
              name="symptoms"
              rows="10"
              ref={symptomsRef}
              required
            ></textarea>
            <div className="input-icon">
              <i>
                <FontAwesomeIcon icon={faPen} />
              </i>
            </div>
          </div>
        </div>
        <div className="row-appointment">
          <h4>Select your appointment date&time</h4>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              InputProps={{
                disableUnderline: true,
              }}
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Select Date"
              value={selectedDate}
              minDate={getMinDate()}
              maxDate={getMaxDate()}
              autoOk={true}
              onChange={(date) => {
                setSelectedDate(date);
                setTime();
              }}
              required
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              TextFieldComponent={TextFieldComponent}
            />
          </MuiPickersUtilsProvider>
          <p
            style={{
              fontSize: "0.8rem",
              color: "rgba(0, 0, 0, 0.7)",
              letterSpacing: "0.01em",
            }}
          >
            Select Time *
          </p>
          <TimePicker
            selectedDate={selectedDate}
            time={time}
            setTime={setTime}
            id={id}
          />
          <div></div>
        </div>

        <div className="row-appointment">
          <input type="reset" value="Clear Form" />
          <h4>Terms and Conditions</h4>
          <div className="input-group">
            <input
              id="terms"
              type="checkbox"
              ref={termRef}
              onClick={() => {
                if (error) setError(false);
              }}
            />
            <label htmlFor="terms">
              I accept the terms and conditions for signing up to this service,
              and hereby confirm I have read the privacy policy.
              <p>
                Read &nbsp;
                <a
                  href="/tnc-smarthealth"
                  style={{ color: "#3fbbc0", textDecoration: "underline" }}
                >
                  Terms & Conditions
                </a>
              </p>
            </label>
          </div>
        </div>
        <button className="book-appointment-btn" type="submit">
          Book Now
        </button>
      </form>
    </>
  );
};

export default AppointmentForm;
