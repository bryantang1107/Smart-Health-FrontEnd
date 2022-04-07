import React, { useEffect } from "react";
import DiscussionComponent from "../Discussion/DiscussionComponent";

const Discussion = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return <DiscussionComponent />;
};

export default Discussion;
