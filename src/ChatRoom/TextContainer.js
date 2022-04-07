import React, { useState, useRef } from "react";
import onlineIcon from "../icons/onlineIcon.png";
import "./chat.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import useClickOutside from "../hooks/useClickOutside";

const TextContainer = ({ users, state, closeUser }) => {
  const styles = {
    transform: `translateY(-1000px)`,
    transition: `all 1s ease`,
  };

  const styles2 = {
    transform: `translateY(0)`,
    transition: `all 1s ease`,
  };
  const userRef = useRef();

  useClickOutside(userRef, () => {
    if (state) {
      return closeUser();
    }
  });

  return (
    <>
      <div
        className="textContainer"
        style={state ? styles2 : styles}
        ref={userRef}
      >
        <div className="header-user">
          <div style={{ display: "flex", alignItems: "center" }}>
            <img alt="Online Icon" src={onlineIcon} />
            <h3 style={{ marginLeft: "1em" }}>
              Users in room ({users.length})
            </h3>
          </div>
          <span
            className="close-user"
            data-tooltip="close"
            onClick={() => closeUser()}
          >
            <AiOutlineCloseCircle></AiOutlineCloseCircle>
          </span>
        </div>
        {users ? (
          <div className="activeContainer">
            <h4>
              {users.map(({ username }) => (
                <div
                  key={username}
                  className="activeItem"
                  style={{ marginBottom: "1em" }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
                    alt=""
                    className="img-chat"
                  />
                  {username}
                </div>
              ))}
            </h4>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default TextContainer;
