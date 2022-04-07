import React from "react";
import "./chat.css";
import { FiSend } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import Image from "./Image";

const Input = ({ message, setMessage, sendMessage, file, setFile }) => {
  const style = { width: "100%", height: "auto", maxWidth: "200px" };
  const deleteMessage = (e) => {
    e.preventDefault();
    setMessage("");
    setFile();
  };
  if (file) {
    const blob = new Blob([file], { mimeType: message.type });
    return (
      <form className="chat-form">
        {file && (
          <div className="chat-input">
            <Image blob={blob} fileName={message.name} style={style} />
          </div>
        )}
        {message && (
          <button
            className="deleteButton"
            onClick={(e) => deleteMessage(e)}
            data-tooltip="Remove Image"
          >
            <RiDeleteBin5Line style={{ fontSize: "2rem" }}></RiDeleteBin5Line>
          </button>
        )}
        <button
          className="sendButton"
          onClick={(e) => {
            setFile();
            setMessage("");
            sendMessage(e);
          }}
          data-tooltip="send image"
        >
          <FiSend style={{ fontSize: "2rem" }}></FiSend>
        </button>
      </form>
    );
  } else {
    return (
      <form className="chat-form">
        <input
          type="text"
          className="chat-input"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
        />
        {message && (
          <button
            className="deleteButton"
            onClick={(e) => deleteMessage(e)}
            data-tooltip="Clear Message"
          >
            <RiDeleteBin5Line style={{ fontSize: "2rem" }}></RiDeleteBin5Line>
          </button>
        )}
        <button
          className="sendButton"
          onClick={(e) => sendMessage(e)}
          data-tooltip="send message"
        >
          <FiSend style={{ fontSize: "2rem" }}></FiSend>
        </button>
      </form>
    );
  }
};

export default Input;
