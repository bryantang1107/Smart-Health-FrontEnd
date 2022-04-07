import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { FcAlarmClock } from "react-icons/fc";

const ReminderItem = ({ label, platform, description }) => {
  return (
    <div className="reminder-item">
      <div className="reminder-item-label">
        <FcAlarmClock></FcAlarmClock>
        <p>{label}</p>
      </div>

      <div className="btn-container-reminder">
        <div className="edit-btn">
          <AiOutlineEdit></AiOutlineEdit>
        </div>
        <div className="delete-btn">
          <BsTrash></BsTrash>
        </div>
      </div>
    </div>
  );
};

export default ReminderItem;
