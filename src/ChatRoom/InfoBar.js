import React, { useRef, useState } from "react";
import "./chat.css";
import { FaRegUser } from "react-icons/fa";
import onlineIcon from "../icons/onlineIcon.png";
import { MdOutlineExitToApp } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import { RiImageAddLine } from "react-icons/ri";
import { ImUserTie } from "react-icons/im";
import Modal from "./Modal";

const InfoBar = ({ room, toggleUser, setFile, file, setMessage }) => {
  const { userRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const selectFile = (e) => {
    setMessage({ type: e.target.files[0].type, name: e.target.files[0].name });
    setFile(e.target.files[0]);
  };

  const hiddenFileInput = useRef();
  const handleClick = (e) => {
    e.preventDefault();
    hiddenFileInput.current.click();
  };
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img src={onlineIcon} alt="online-image" className="onlineIcon" />
        <h3>Room ID : {room}</h3>
      </div>
      <div className="rightInnerContainer">
        <span
          className="userInRoom"
          data-tooltip={
            userRole === "doctor" ? "Get Patient Info" : "Get Doctor Info"
          }
          onClick={() => setIsOpen(true)}
          style={{ marginRight: "1em", fontSize: "2rem", padding: 0 }}
        >
          <ImUserTie />
        </span>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}></Modal>
        <span
          className="userInRoom"
          data-tooltip="Add Image"
          style={{ marginRight: "1em", fontSize: "2rem", padding: 0 }}
          onClick={handleClick}
        >
          <RiImageAddLine />
        </span>
        <input
          type="file"
          onChange={selectFile}
          ref={hiddenFileInput}
          key={file || ""}
          style={{ display: "none" }}
        />
        <span
          className="userInRoom"
          data-tooltip="user in room"
          onClick={() => toggleUser()}
        >
          <FaRegUser></FaRegUser>
        </span>

        <a href="/" className="leaveRoom" data-tooltip="leave room">
          <MdOutlineExitToApp style={{ fontSize: "2rem" }} />
        </a>
      </div>
    </div>
  );
};

export default InfoBar;
