import React, { useEffect, useState } from "react";
import axios from "../axios";
import { useAuth } from "../context/AuthContext";

const availableTime = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

const TimePicker = ({ selectedDate, time, setTime, id }) => {
  const { currentUser } = useAuth();
  const [doctorTime, setDoctorTime] = useState();
  const filterTime = (data) => {
    const time = availableTime.filter((t) => {
      return t !== data;
    });
    setDoctorTime(time);
  };

  useEffect(() => {
    const getDoctorInfo = async () => {
      const response = await axios.get(`/find-doctor/time/${id}`, {
        headers: {
          Authorization: "Bearer " + currentUser,
        },
      });
      const date = response.data[0].find((x) => {
        return x.date === selectedDate.toISOString().split("T")[0];
      });
  
      if (!date) {
        return setDoctorTime(availableTime);
      }
      filterTime(date.time);
      //filterTime(response.data);
    };

    getDoctorInfo();
  }, [id, selectedDate]);

  return (
    <>
      <div className="select-box">
        <div className="select-box__current" tabIndex="1">
          <div className="select-box__value">
            <input
              className="select-box__input"
              type="radio"
              id="0"
              value="1"
              name="Ben"
              defaultChecked="checked"
            />
            <p className="select-box__input-text">{time}</p>
          </div>

          <img
            className="select-box__icon"
            src="http://cdn.onlinewebfonts.com/svg/img_295694.svg"
            alt="Arrow Icon"
            aria-hidden="true"
          />
        </div>
        <ul className="select-box__list">
          {doctorTime &&
            doctorTime.map((time, index) => {
              return (
                <li key={index} onClick={() => setTime(time)}>
                  <label
                    className="select-box__option"
                    htmlFor="0"
                    aria-hidden="aria-hidden"
                  >
                    {time}
                  </label>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default TimePicker;
