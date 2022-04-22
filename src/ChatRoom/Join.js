import React, { useRef, useState, useEffect } from "react";

import "./chat.css";
import axios from "../axios";
import { useHistory } from "react-router-dom";
import Loading from "../covid/Loading";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import DoctorJoin from "./DoctorJoin";

const Join = () => {
  const roomIdRef = useRef();
  const { userData, userRole } = useAuth();
  const [roomInfo, setRoomInfo] = useState();
  const [roomPw, setRoomPw] = useState();
  const [roomId, setRoomId] = useState();
  const [state, setState] = useState();
  const [roomError, setRoomError] = useState();
  const [error, setError] = useState();
  const passwordRef = useRef();
  const [loading, setLoading] = useState("");

  const history = useHistory();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

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
        "Oops! Seems like you have not made a booking for consultation. Please Book your appointment to get the room credentials."
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
      {userRole === "user" && (
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
                      <h4
                        className="room-credentials"
                        style={{ color: "#00bbcf" }}
                      >
                        Room ID:{" "}
                      </h4>
                      <p className="room-credentials">{roomInfo}</p>
                      <h4
                        className="room-credentials"
                        style={{ color: "#00bbcf" }}
                      >
                        Password:
                      </h4>
                      <p className="room-credentials">{roomPw}</p>
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
                    if (
                      !passwordRef.current.value ||
                      !roomIdRef.current.value
                    ) {
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
      )}
      {userRole === "doctor" && <DoctorJoin />}
    </motion.div>
  );
};

export default Join;
