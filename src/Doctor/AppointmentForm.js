import React, { useState, useRef } from "react";
import "./nodoctor.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import axios from "../axios";
import short from "short-uuid";

const AppointmentForm = () => {
  const [gender, setGender] = useState("male");
  const [error, setError] = useState();
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const dobRef = useRef();
  const symptomsRef = useRef();
  const dateRef = useRef();
  const termRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookAppointment = async () => {
      let salt = "";
      let chars =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (let i = 0; i <= 5; i++) {
        let randomNum = Math.floor(Math.random() * chars.length);
        salt += chars.substring(randomNum, randomNum + 1);
      }
      const roomId = short.generate();
      // setRoomCredentials({ roomId, password: salt });
      const userInfo = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        phone: phoneRef.current.value,
        dob: dobRef.current.value,
        symptoms: symptomsRef.current.value,
        date: dateRef.current.value,
      };
      try {
        await axios.post("/authroom/register", {
          room_id: roomId,
          password: salt,
          userInfo,
        });
      } catch (err) {
        console.log(err);
        //set error here
      }
    };
    if (!termRef.current.checked) {
      setError("Please check the terms and condition");
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      return;
    }
    bookAppointment();
  };

  return (
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
          <input type="email" placeholder="Email Adress" ref={emailRef} />
          <div className="input-icon">
            <i className="fa fa-envelope"></i>
          </div>
        </div>
        <div className="input-group input-group-icon">
          <input
            type="tel"
            placeholder="012-345-7890"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            ref={phoneRef}
            required
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
          <textarea name="symptoms" rows="10" ref={symptomsRef}></textarea>
          <div className="input-icon">
            <i>
              <FontAwesomeIcon icon={faPen} />
            </i>
          </div>
        </div>
      </div>
      <div className="row-appointment">
        <h4>Select your appointment date&time (verify if the date is taken)</h4>
        <div className="input-group">
          <label htmlFor="localtime">Date & Time:</label>
          <input type="datetime-local" name="localtime" ref={dateRef} />
        </div>
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
  );
};

export default AppointmentForm;
