import React, { useEffect } from "react";
import ArticleComponent from "../covid/ArticleComponent";
import { motion } from "framer-motion";

const Article = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <ArticleComponent></ArticleComponent>
    </motion.div>
  );
};

export default Article;
