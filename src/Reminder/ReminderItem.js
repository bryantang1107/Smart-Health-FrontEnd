import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { FcAlarmClock } from "react-icons/fc";
import { BiShow } from "react-icons/bi";
import Modal from "./Modal";

const ReminderItem = ({ label, date, description, index, handleDelete }) => {
  const reminderData = { label, date, description };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="reminder-item">
      <div className="reminder-item-label">
        <FcAlarmClock></FcAlarmClock>
        <p>{label}</p>
      </div>

      <div className="btn-container-reminder">
        <div
          className="edit-btn"
          style={{ marginRight: "1em" }}
          onClick={() => setIsOpen(true)}
        >
          <BiShow />
        </div>
        <div className="delete-btn" onClick={() => handleDelete(index)}>
          <BsTrash></BsTrash>
        </div>
      </div>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        reminderData={reminderData}
      ></Modal>
    </div>
  );
};

export default ReminderItem;
