import React, { useState, useEffect } from "react";
import "./video.css";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minute, setMinute] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    toggle();
  }, []);

  if (seconds > 60) {
    setMinute((prev) => prev + 1);
    setSeconds(0);
  }

  function toggle() {
    setIsActive(!isActive);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);
  return (
    <div className="app">
      <div className="time">
        {minute.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
        })}
        :
        {seconds.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
        })}
      </div>
    </div>
  );
};

export default Timer;
