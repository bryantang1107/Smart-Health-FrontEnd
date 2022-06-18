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
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const InfoBar = ({ room, toggleUser, setFile, file, setMessage }) => {
  const { userRole } = useAuth();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const notify = () => {
    return toast.error(
      "Please ensure you attach the correct file type : PNG/JPEG",
      {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        delay: 1000,
      }
    );
  };
  const selectFile = (e) => {
    if (
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/jpeg"
    ) {
      setMessage({
        type: e.target.files[0].type,
        name: e.target.files[0].name,
      });
      setFile(e.target.files[0]);
    } else {
      notify();
    }
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
        message: `Are you sure you want to leave the room ?`,
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
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
        message: `Are you sure you want to leave the room ?`,
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              history.push("/upload/medical-record");
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
