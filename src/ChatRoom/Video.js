import React, { useEffect, useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import VideoCall from "@material-ui/icons/VideoCall";
import Peer from "simple-peer";
import Timer from "./Timer";
import "./video.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

toast.configure();
const Video = ({
  name,
  socket,
  stream,
  me,
  caller,
  callerSignal,
  receivingCall,
  myVideo,
  callerName,
  setCallerName,
  users,
}) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const { userRole } = useAuth();
  const [endCall, setEndCall] = useState(false);
  const userVideo = useRef();
  const connectionRef = useRef();
  const notify = (text) => {
    return toast.success(text, {
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

  const callUser = () => {
    notify("Video Call has Started !");
    setCallerName(name);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        signalData: data,
        from: me,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.emit("call", name);
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;

    return () => {};
  };
  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };
  const leaveCall = () => {
    confirmAlert({
      title: "End Call",
      message: `Are you sure you want to end the call ?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            setCallEnded(true);
            setEndCall(true);
            connectionRef.current.destroy();
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });

    // window.location.reload(false);
  };

  return (
    <>
      <h1 style={{ textAlign: "center", color: "#3fbbc0" }}>Video Call</h1>
      <div className="video-call-container">
        {!endCall && (
          <div className="video-container">
            <div className="video">
              {stream && (
                <video
                  playsInline
                  muted
                  ref={myVideo}
                  autoPlay
                  className="videoDisplay"
                />
              )}
            </div>

            <div className="video">
              <video
                playsInline
                ref={userVideo}
                autoPlay
                className="videoDisplay"
              />
            </div>
          </div>
        )}

        {callAccepted && !callEnded && <Timer />}

        {callAccepted && !callEnded ? (
          <div className="call-button join-video" data-tooltip={"Leave Call"}>
            <Button variant="contained" color="secondary" onClick={leaveCall}>
              End Call
            </Button>
          </div>
        ) : (
          users.length > 1 && (
            <div
              className="call-button join-video"
              data-tooltip={"Start Video Call"}
            >
              {!receivingCall && userRole === "doctor" && (
                <IconButton
                  color="primary"
                  aria-label="call"
                  onClick={() => callUser()}
                >
                  <VideoCall fontSize="large" />
                </IconButton>
              )}
            </div>
          )
        )}
        {name !== callerName && (
          <div>
            {receivingCall && !callAccepted ? (
              <div className="caller">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={answerCall}
                >
                  Join Video
                </Button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </>
  );
};

export default Video;
