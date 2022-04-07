import React, { useState } from "react";
import "./chat.css";
import ReactEmoji from "react-emoji";
import { RiDeleteBin5Line } from "react-icons/ri";
import Image from "./Image";

const Message = ({
  message: { user, text, time, type, fileName, mimeType },
  name,
}) => {
  const [state, setState] = useState(true);
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();
  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }
  const style = { width: "100%", height: "auto", maxWidth: "700px" };

  const deleteMessage = () => {
    setState(false);
  };
  if (type === "text") {
    return isSentByCurrentUser ? (
      <div
        className="messageContainer justifyEnd"
        style={!state ? { display: "none" } : null}
      >
        <div className="messageBox backgroundBlue hover">
          <div className="message-sender">
            <div className="user-info">
              <img
                src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
                alt=""
                className="img-chat"
              />
              <p className="sentText" style={{ color: "#fff" }}>
                You
              </p>
              <p className="sentText" style={{ color: "#c4f4c4" }}>
                {time}
              </p>
            </div>
            <button
              className="deleteButton1"
              onClick={deleteMessage}
              data-tooltip="Delete Message"
            >
              <RiDeleteBin5Line style={{ fontSize: "2rem" }}></RiDeleteBin5Line>
            </button>
          </div>
          <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
        </div>
      </div>
    ) : (
      <div
        className="messageContainer justifyStart"
        style={!state ? { display: "none" } : null}
      >
        <div className="messageBox backgroundLight">
          <div className="message-sender">
            <div className="user-info">
              <img
                src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
                alt=""
                className="img-chat"
              />
              <p className="sentText">{user}</p>
              <p className="sentText" style={{ color: "#c4c4c4" }}>
                {time}
              </p>
            </div>
            <button
              className="deleteButton1"
              onClick={deleteMessage}
              data-tooltip="Delete Message"
            >
              <RiDeleteBin5Line style={{ fontSize: "2rem" }}></RiDeleteBin5Line>
            </button>
          </div>
          <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
        </div>
      </div>
    );
  } else {
    const blob = new Blob([text], { mimeType });

    //blob helps to construct from binary back to the original file
    //when sent to server, file loses blobness
    //must send the file type
    return isSentByCurrentUser ? (
      <div
        className="messageContainer justifyEnd"
        style={!state ? { display: "none" } : null}
      >
        <div className="messageBox backgroundBlue hover">
          <div className="message-sender">
            <div className="user-info">
              <img
                src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
                alt=""
                className="img-chat"
              />
              <p className="sentText" style={{ color: "#fff" }}>
                You
              </p>
              <p className="sentText" style={{ color: "#c4f4c4" }}>
                {time}
              </p>
            </div>
            <button
              className="deleteButton1"
              onClick={deleteMessage}
              data-tooltip="Delete Message"
            >
              <RiDeleteBin5Line style={{ fontSize: "2rem" }}></RiDeleteBin5Line>
            </button>
          </div>
          <div className="image-blob">
            <Image blob={blob} fileName={fileName} style={style}></Image>
          </div>
        </div>
      </div>
    ) : (
      <div
        className="messageContainer justifyStart"
        style={!state ? { display: "none" } : null}
      >
        <div className="messageBox backgroundLight">
          <div className="message-sender">
            <div className="user-info">
              <img
                src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
                alt=""
                className="img-chat"
              />
              <p className="sentText">{user}</p>
              <p className="sentText" style={{ color: "#c4c4c4" }}>
                {time}
              </p>
            </div>
            <button
              className="deleteButton1"
              onClick={deleteMessage}
              data-tooltip="Delete Message"
            >
              <RiDeleteBin5Line style={{ fontSize: "2rem" }}></RiDeleteBin5Line>
            </button>
          </div>
          <div className="image-blob">
            <Image blob={blob} fileName={fileName} style={style}></Image>
          </div>
        </div>
      </div>
    );
  }
};

export default Message;
