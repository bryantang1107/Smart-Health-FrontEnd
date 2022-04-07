import React, { useState } from "react";
import "./chat.css";

const Name = () => {
  const [name, setName] = useState();

  const handleChange = (e) => {
    setName(e.target.value);
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
            onChange={handleChange}
            style={{ textTransform: "none" }}
          />
        </div>
        <a
          href={`/room?room=${localStorage.getItem("room")}&username=${name}`}
          className="join-room-btn-34"
        >
          Join
        </a>
      </div>
    </div>
  );
};

export default Name;
