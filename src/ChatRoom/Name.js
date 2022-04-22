import React, { useRef, useEffect } from "react";
import "./chat.css";

const Name = () => {
  const nameRef = useRef();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  const handleClick = () => {
    localStorage.setItem("username", nameRef.current.value);
  };
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
        <a
          href={`/room?room=${localStorage.getItem("room")}`}
          className="join-room-btn-34"
          onClick={handleClick}
        >
          Join
        </a>
      </div>
    </div>
  );
};

export default Name;
