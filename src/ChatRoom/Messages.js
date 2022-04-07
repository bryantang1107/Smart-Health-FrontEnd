import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./chat.css";
import Message from "./Message";
const Messages = ({ messages, name }) => (
  <ScrollToBottom className="messages" style={{ color: "#fff" }}>
    {messages.map((message, i) => (
      <div key={i}>
        <Message message={message} name={name} />
      </div>
    ))}
  </ScrollToBottom>
);

export default Messages;
