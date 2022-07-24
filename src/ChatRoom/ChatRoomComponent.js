import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import InfoBar from "./InfoBar";
import Input from "./Input";
import Messages from "./Messages";
import "./chat.css";
import TextContainer from "./TextContainer";
import Video from "./Video";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";
import axios from "../axios";

toast.configure();

let socket;

const ChatRoomComponent = () => {
  const [state, setState] = useState(false);
  const [file, setFile] = useState("");
  const { userRole, userData } = useAuth();
  const location = useLocation();
  const [name, setName] = useState();
  const [roomz, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState("");
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerName, setCallerName] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const myVideo = useRef();
  const notify = (text) => {
    return toast.info(text, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      delay: 1000,
    });
  };

  const toggleUser = () => {
    setState(!state);
  };

  const closeUser = () => {
    setState(false);
  };

  window.addEventListener("beforeunload", async (e) => {
    e.preventDefault();
    localStorage.removeItem("join");
    localStorage.removeItem("username");
    localStorage.removeItem("room");
  });

  useEffect(() => {
    localStorage.setItem("join", true);

    if (userRole === "user") {
      notify(
        `Only doctor can start the video call, a "join video" button will appear.`
      );
    }
    try {
      const getCredentials = async () => {
        const response = await axios.get(`/appointment/joinroom/${userData}`);
        socket = io("https://smarthealthserver.herokuapp.com/chat");
        const username = response.data.username;
        const room = response.data.roomID;
        setName(username);
        setRoom(room);

        socket.emit("join", { username, room }, (error) => {
          if (error) {
            alert(error);
          }
        });
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            setStream(stream);
            myVideo.current.srcObject = stream;
          });
        socket.emit("join video");
        socket.on("me", (id) => {
          setMe(id);
        });
        socket.on("callUser", (data) => {
          setReceivingCall(true);
          setCaller(data.from);
          setCallerSignal(data.signal);
        });
        socket.on("message", (message) => {
          setMessages((messages) => [...messages, message]);
        });
        socket.on("roomData", ({ users }) => {
          setUsers(users);
        });
      };

      getCredentials();
    } catch (error) {
      console.log(error);
    }

    return () => {
      localStorage.removeItem("room");
      localStorage.removeItem("username");
    };
  }, [location.search]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (file) {
      const messageObject = {
        type: "file",
        body: file,
        fileName: file.name,
        mimeType: file.type,
      };

      socket.emit("send-message", messageObject, () => {});
    } else if (message) {
      const messageObject = {
        type: "text",
        body: message,
      };
      socket.emit("send-message", messageObject, () => setMessage(""));
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Online Consultation</h1>
      <div className="underline"></div>
      <div className="entire-chat">
        <div className="video-chat-container">
          <Video
            socket={socket}
            name={name}
            me={me}
            setCallerName={setCallerName}
            stream={stream}
            myVideo={myVideo}
            callerName={callerName}
            receivingCall={receivingCall}
            users={users}
            callerSignal={callerSignal}
            caller={caller}
          />
        </div>

        <div className="outerContainer">
          <div className="chat-container">
            <InfoBar
              room={roomz}
              toggleUser={toggleUser}
              setFile={setFile}
              file={file}
              setMessage={setMessage}
              name={name}
              socket={socket}
            ></InfoBar>
            <Messages messages={messages} name={name}></Messages>

            <Input
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
              file={file}
              setFile={setFile}
              setName={setName}
              name={name}
            ></Input>
          </div>

          <TextContainer
            users={users}
            state={state}
            closeUser={closeUser}
          ></TextContainer>
        </div>
      </div>
    </>
  );
};

export default ChatRoomComponent;
