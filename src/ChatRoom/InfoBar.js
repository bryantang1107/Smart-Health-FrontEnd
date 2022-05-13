import React, { useRef, useState } from "react";
import "./chat.css";
import { FaRegUser } from "react-icons/fa";
import onlineIcon from "../icons/onlineIcon.png";
import { MdOutlineExitToApp } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import { RiImageAddLine } from "react-icons/ri";
import { ImUserTie } from "react-icons/im";
import Modal from "./Modal";
import axios from "../axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const InfoBar = ({ room, toggleUser, setFile, file, setMessage }) => {
  const { userRole, userData } = useAuth();
  const history = useHistory();
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

  const leaveRoom = () => {
    try {
      confirmAlert({
        title: "Leave Room",
        message: `By Leaving The Room, you acknowledge that you have successfully consulted your doctor and you will no longer have access to the consultation room. Please wait for your doctor to prescribe the digital prescription.`,
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              await axios.post(`/appointment/done/${userData}`);
              history.push("/");
              window.location.reload(false);
            },
          },
          {
            label: "No",
            onClick: () => {},
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };
  const leaveRoomDoc = () => {
    try {
      confirmAlert({
        title: "Leave Room",
        message: `Are You Sure You Want To Leave The Room?`,
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              history.push("/");
              window.location.reload(false);
            },
          },
          {
            label: "No",
            onClick: () => {},
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
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

        {userRole === "doctor" ? (
          <span
            className="leaveRoom"
            data-tooltip="leave room"
            onClick={leaveRoomDoc}
          >
            <MdOutlineExitToApp style={{ fontSize: "2rem" }} />
          </span>
        ) : (
          <span
            className="leaveRoom"
            data-tooltip="leave room"
            onClick={leaveRoom}
          >
            <MdOutlineExitToApp style={{ fontSize: "2rem" }} />
          </span>
        )}
      </div>
    </div>
  );
};

export default InfoBar;
