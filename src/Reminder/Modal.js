import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import axios from "../axios";
import { motion } from "framer-motion";
import "./reminder.css";

const OVERLAY_STYLES = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
  zIndex: 1000,
};

const Modal = ({ open, onClose, reminderData }) => {
  if (!open) return null;

  return ReactDom.createPortal(
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div style={OVERLAY_STYLES}></div>
      <div className="small-modal">
        <div className="model-header">
          <span
            className="closeModal"
            onClick={() => {
              onClose();
            }}
            data-tooltip="Close"
          >
            <IoIosCloseCircleOutline />
          </span>
        </div>
        <div className="reminder-data-container">
          <h2 style={{ textAlign: "center", color: "#f6f6f6" }}>Reminder</h2>
          <div className="underline"></div>
          <ul className="responsive-table">
            <li className="table-header">
              <div className="col col-1">Label</div>
              <div className="col col-2">Date</div>
              <div className="col col-3">Description</div>
            </li>
            {reminderData && (
              <li className="table-row">
                <div className="col col-1" data-label="Label:">
                  {reminderData.label}
                </div>
                <div className="col col-2" data-label="Date:">
                  {reminderData.date}
                </div>
                <div className="col col-3" data-label="Description:">
                  {reminderData.description}
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </motion.div>,
    document.getElementById("portal")
  );
};

export default Modal;
