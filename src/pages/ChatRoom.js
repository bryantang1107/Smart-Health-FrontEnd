import React from "react";
import ChatRoomComponent from "../ChatRoom/ChatRoomComponent";
import { motion } from "framer-motion";

const ChatRoom = () => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <ChatRoomComponent></ChatRoomComponent>
    </motion.div>
  );
};

export default ChatRoom;
