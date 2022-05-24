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
  const [canJoin, setCanJoin] = useState();
  const history = useHistory();
  const notify = () => {
    return toast.error(
      "You are in the middle of a consultation, please ensure you leave the room before joining another",
      {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        delay: 1000,
      }
    );
  };
  const handleClick = () => {
    const check = async () => {
      const response = await axios.get(`/authroom/join-room/${userData}`);
      setCanJoin(response.data);
    };
    check();
    setTimeout(() => {
      history.goBack();
    }, 1500);
    console.log(localStorage.getItem("username"));
    localStorage.setItem("username", nameRef.current.value);
  };
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
        {!canJoin && (
          <Link
            to={`/room?room=${localStorage.getItem("room")}`}
            target="_blank"
            className="join-room-btn-34"
            onClick={handleClick}
          >
            Join
          </Link>
        )}
      </div>
    </div>
  );
};

export default Name;
