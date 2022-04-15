import React, { useEffect } from "react";
import ReactDom from "react-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";

const OVERLAY_STYLES = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
  zIndex: 1000,
};
const Modal = ({ open, data, onClose }) => {
  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES}></div>
      <div className="modal">
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
        <div>display doctor/user info here</div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
