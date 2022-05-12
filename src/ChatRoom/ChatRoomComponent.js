import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import InfoBar from "./InfoBar";
import Input from "./Input";
import Messages from "./Messages";
import "./chat.css";
import TextContainer from "./TextContainer";
import Video from "./Video";
import { useHistory } from "react-router-dom";

let socket;

const ChatRoomComponent = () => {
  const [state, setState] = useState(false);
  const history = useHistory();
  const [file, setFile] = useState("");
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

  const toggleUser = () => {
    setState(!state);
  };

  const closeUser = () => {
    setState(false);
  };

  useEffect(() => {
    const room = localStorage.getItem("room");
    const username = localStorage.getItem("username");

    if (room === null || username === null) {
      return history.push("/join");
    }

    socket = io("/chat");

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
