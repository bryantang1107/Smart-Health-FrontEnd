import React from "react";

const UserMessage = ({ lastMessage, message }) => {
  const isFirstMessageByUser =
    !lastMessage || lastMessage.sender.username !== message.sender.username;
  return (
    <div className="discussion-row">
      {isFirstMessageByUser && (
        <div
          className="discussion-avatar"
          style={{ backgroundImage: `url(${message?.sender?.avatar})` }}
        ></div>
      )}
      {message?.attachments?.length > 0 ? (
        <img
          src={message.attachments[0].file}
          alt="message-attachment"
          className="discussion-image"
          style={{ marginLeft: isFirstMessageByUser ? "4px" : "48px" }}
        />
      ) : (
        <div
          className="discussion"
          style={{
            float: "left",
            backgroundColor: "#cabcdc",
            marginLeft: isFirstMessageByUser ? "4px" : "48px",
          }}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};

export default UserMessage;
