import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const QuestionComponent = ({ title, info }) => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <article className="question-item">
        
      <header>
        <h4>{title}</h4>
        <button className="question-btn" onClick={() => setShowInfo(!showInfo)}>
          {showInfo ? (
            <AiOutlineMinus></AiOutlineMinus>
          ) : (
            <AiOutlinePlus></AiOutlinePlus>
          )}
        </button>
      </header>

      {showInfo && <p>{info}</p>}
    </article>
  );
};

export default QuestionComponent;
