import React from "react";
import { questions as data } from "./questionData";
import { useState } from "react";
import "../css/qna.css";
import QuestionComponent from "./QuestionComponent";

const Question = () => {
  const [questions, setQuestions] = useState(data);

  return (
    <>
      <div className="main-question-container">
        <div className="question-container">
          <h1>Smart Health Q&A</h1>
          <div className="underline"></div>

          <section className="question-info">
            {questions.map((question) => {
              if (question.general) {
                const { general } = question;
                return general.map((data) => {
                  return (
                    <div className="question-general" key={data.id}>
                      <QuestionComponent
                        key={data.id}
                        title={data.title}
                        info={data.info}
                      ></QuestionComponent>
                    </div>
                  );
                });
              }
              if (question.onlineConsultation) {
                const { onlineConsultation } = question;
                return onlineConsultation.map((data) => {
                  return (
                    <div className="question-online" key={data.id}>
                      <QuestionComponent
                        key={data.id}
                        title={data.title}
                        info={data.info}
                      ></QuestionComponent>
                    </div>
                  );
                });
              }
              if (question.vaccination) {
                const { vaccination } = question;
                return vaccination.map((data) => {
                  return (
                    <div className="question-vaccination" key={data.id}>
                      <QuestionComponent
                        key={data.id}
                        title={data.title}
                        info={data.info}
                      ></QuestionComponent>
                    </div>
                  );
                });
              }
              if (question.covid) {
                const { covid } = question;
                return covid.map((data) => {
                  return (
                    <div className="question-covid" key={data.id}>
                      <QuestionComponent
                        key={data.id}
                        title={data.title}
                        info={data.info}
                      ></QuestionComponent>
                    </div>
                  );
                });
              }
            })}
          </section>
        </div>
      </div>
    </>
  );
};

export default Question;
