import React from "react";
import { ChatEngine } from "react-chat-engine";
import ChatFeed from "./ChatFeed";
import "./discussion.css";
import LoginForm from "./Login";

const DiscussionComponent = () => {
  if (!localStorage.getItem("username")) return <LoginForm></LoginForm>;

  return (
    <ChatEngine
      height="100vh"
      projectID={process.env.REACT_APP_PROJECT_ID}
      userName={localStorage.getItem("username")}
      userSecret={localStorage.getItem("password")}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps}></ChatFeed>}
    ></ChatEngine>
  );
};

export default DiscussionComponent;
