import React, { useState, useEffect } from "react";
import { heroData } from "./data";
import "./home.css";
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
const HeroComponent = () => {
  const [slide, setSlide] = useState(heroData);
  const [index, setIndex] = useState(0);
  let position;

  const prevSlide = () => {
    setIndex((initial) => {
      if (initial - 1 < 0) {
        return slide.length - 1;
      } else {
        return initial - 1;
      }
    });
  };
  const nextSlide = () => {
    setIndex((initial) => {
      if (initial + 1 > slide.length - 1) {
        return 0;
      } else {
        return initial + 1;
      }
    });
  };
  useEffect(() => {
    let slider = setInterval(() => {
      setIndex((oldIndex) => {
        let index = oldIndex + 1;
        if (index > slide.length - 1) {
          index = 0;
        }
        return index;
      });
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);
  return (
    <section className="hero-section">
      {slide.map((slidez, personIndex) => {
        position = "nextSlide";
        if (personIndex === index) {
          position = "activeSlide";
        }
        if (
          personIndex === index - 1 ||
          (index === 0 && personIndex === slide.length - 1)
        ) {
          position = "lastSlide";
        }
        return (
          <div className="hero-slider" key={slidez.id}>
            <article
              style={{
                backgroundImage: `url(${slidez.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              key={slidez.id}
              className={position}
            >
              <div className="hero-container">
                <h3 className="hero-header">{slidez.header}</h3>
                <p style={{ marginBottom: "2em" }}>{slidez.description}</p>
                <Link to={slidez.route} className="hero-btn-link">
                  {slidez.button}
                </Link>
              </div>
            </article>
          </div>
        );
      })}
      <button className="prev-hero" onClick={prevSlide}>
        <FiChevronLeft></FiChevronLeft>
      </button>
      <button className="next-hero" onClick={nextSlide}>
        <FiChevronRight></FiChevronRight>
      </button>
    </section>
  );
};

export default HeroComponent;
