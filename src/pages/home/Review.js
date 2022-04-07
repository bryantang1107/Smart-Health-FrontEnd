import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";
import reviews from "./data";

const Review = () => {
  const [index, setIndex] = useState(0);
  const { name, image, text } = reviews[index];

  const nextPerson = () => {
    setIndex((index) => {
      if (index + 1 > reviews.length - 1) {
        return 0;
      } else {
        return index + 1;
      }
    });
  };

  const prevPerson = () => {
    setIndex((index) => {
      if (index - 1 < 0) {
        return reviews.length - 1;
      } else {
        return index - 1;
      }
    });
  };
  return (
    <>
      <section className="review-section">
        <div className="container-review">
          <h1 className="review-title">Our Reviews</h1>
          <div className="underline"></div>
        </div>
        <article className="review">
          <div className="img-container">
            <img src={image} alt={name} className="person-img" />
            <span className="quote-icon">
              <FaQuoteRight></FaQuoteRight>
            </span>
          </div>
          <h4 className="author">{name}</h4>
          <p className="info-review">{text}</p>
          <div className="button-container">
            <button className="prev-btn" onClick={prevPerson}>
              <FaChevronLeft></FaChevronLeft>
            </button>
            <button className="next-btn" onClick={nextPerson}>
              <FaChevronRight></FaChevronRight>
            </button>
          </div>
        </article>
      </section>
    </>
  );
};

export default Review;
