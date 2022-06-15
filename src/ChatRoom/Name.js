import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import { useAuth } from "../context/AuthContext";
import "./chat.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

toast.configure();

const Name = () => {
  const nameRef = useRef();
  const { userData } = useAuth();
  const history = useHistory();

  const handleClick = () => {
    const check = async () => {
      try {
        await axios.post(`/appointment/joinroom/${userData}`, {
          roomID: localStorage.getItem("room"),
          username: nameRef.current.value,
        });
        setTimeout(() => {
          history.goBack();
        }, 1500);
      } catch (error) {
        console.log(error);
      }
    };
    check();

    localStorage.setItem("username", nameRef.current.value);
  };
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (localStorage.getItem("username")) {
      history.goBack();
    }
  }, []);

  return (
    <div className="join-name-container">
      <div className="name-container">
        <div className="brand-logo"></div>
        <div className="brand-title">Smart Health</div>
        <div className="name-input">
          <label className="label-input">Enter Your Name</label>
          <input
            type="text"
            className="name-input-1"
            placeholder="Your Name..."
            ref={nameRef}
            style={{ textTransform: "none" }}
          />
        </div>
        <Link
          to={`/room?room=${localStorage.getItem("room")}`}
          target="_blank"
          className="join-room-btn-34"
          onClick={handleClick}
        >
          Join
        </Link>
      </div>
    </div>
  );
};

export default Name;
