import React, { useRef, useState } from "react";

import "./chat.css";
import axios from "../axios";
import { useHistory } from "react-router-dom";
import Loading from "../covid/Loading";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Join = () => {
  const roomIdRef = useRef();
  const { userData } = useAuth();
  const [roomInfo, setRoomInfo] = useState();
  const [roomPw, setRoomPw] = useState();
  const [roomId, setRoomId] = useState();
  const [state, setState] = useState();
  const [roomError, setRoomError] = useState();
  const [error, setError] = useState();
  const passwordRef = useRef();
  const [loading, setLoading] = useState("");

  const history = useHistory();

  const authenticateRoom = async () => {
    try {
      setLoading(true);
      localStorage.setItem("room", roomIdRef.current.value);

      await axios.post("/authroom/login", {
        id: roomId,
        room_id: roomIdRef.current.value,
        password: passwordRef.current.value,
      });

      setTimeout(() => {
        setLoading(false);
        history.push("/join/name");
      }, 3000);
    } catch (error) {
      setTimeout(() => {
        setTimeout(() => {
          setError("");
        }, 3000);
        setError("Invalid username/password");
        setLoading(false);
      }, 3000);
    }
  };

  const getRoomInfo = async () => {
    setState(true);
    try {
      const response = await axios.get(`/authroom/getRoomInfo/${userData}`);
      setRoomId(response.data._id);
      setRoomInfo(response.data.room_id);
      setRoomPw(response.data.password);
    } catch (error) {
      setRoomError(
        "Get your credentials when you have booked an appointment !"
      );
    }
  };

  return (
    <motion.div
      initial={{ x: 1000, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="joinOuterContainer">
        <div className="joinInnerContainer">
          {state && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="room-creds-container">
                {roomError ? (
                  <p className="alert-primary">{roomError}</p>
                ) : (
                  <>
                    <p className="room-credentials">Room ID: {roomInfo}</p>
                    <p className="room-credentials">Password: {roomPw}</p>
                  </>
                )}
              </div>
            </motion.div>
          )}

          <button className="chat-button mt-20" onClick={getRoomInfo}>
            Get Room Info
          </button>
        </div>
        <div className="joinInnerContainer">
          <h1 className="chat-heading">Join A Room</h1>
          {error && (
            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="alert-primary">{error}</p>
            </motion.div>
          )}
          {!loading ? (
            <>
              <div>
                <input
                  type="text"
                  placeholder="Room ID"
                  className="joinInput"
                  ref={roomIdRef}
                  // onChange={(e) => setRoom(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="joinInput mt-20"
                  ref={passwordRef}
                  // onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                className="chat-button mt-20"
                type="submit"
                onClick={(event) => {
                  if (!passwordRef.current.value || !roomIdRef.current.value) {
                    event.preventDefault();

                    return;
                  }
                  authenticateRoom();
                }}
              >
                Join Room
              </button>
            </>
          ) : (
            <>
              <Loading></Loading>
              <h1 style={{ textAlign: "center", color: "#fff" }}>
                Verifying...
              </h1>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Join;
