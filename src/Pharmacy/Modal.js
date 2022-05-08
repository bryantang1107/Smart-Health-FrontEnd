import React, { useState, useRef, useEffect } from "react";
import ReactDom from "react-dom";
import "./pharmacy.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Benefits from "./Benefits";
import Category from "./Category";
import { motion } from "framer-motion";
import About from "./About";
import HowTo from "./HowTo";
import { FiAlertTriangle } from "react-icons/fi";

import Faq from "./Faq";
import Precaution from "./Precaution";
const OVERLAY_STYLES = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
  zIndex: 1000,
};

const Modal = ({ open, data, onClose }) => {
  useEffect(() => {
    const scroll = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };
    setTimeout(() => {
      scroll();
    }, 1000);
  }, [data]);
  const scrollRef = useRef();
  const [currentCategory, setCurrentCategory] = useState("about");

  const Effects = () => {
    return (
      <div className="category-content">
        <h4>
          You may experience some side effects when using this product. This is
          not a cause for concern. However, it is so that you are aware of it.
        </h4>
        <p className="modal-description">
          Besides the uses, people who are taking this product may also develop
          certain side effects, such as:
        </p>
        <ol class="gradient-list">
          {effects.map((item) => {
            return (
              <li>
                <p className="modal-description">{item}</p>
              </li>
            );
          })}
        </ol>
        <div className="warning-modal">
          <FiAlertTriangle style={{ fontSize: "2rem", color: "#a64452" }} />
          <p className="modal-description">
            Some of these symptoms are more common than the others. If you are
            developing any of the stated side effects (whether listed or not),
            please talk to a doctor as soon as possible. You also need to refer
            to a doctor if some symptoms such as skin rash or blurred vision
            occur. This list may not be complete, therefore do inform if you are
            experiencing other symptoms. These symptoms become more visible with
            longer duration of intake.
          </p>
        </div>
      </div>
    );
  };

  const PersonalPrecaution = () => {
    return (
      <>
        <div className="category-content">
          <h4>Precautionary Steps of {name}</h4>
          <br></br>
          <p className="modal-description">
            Before using {name}, please take the necessary precautions as
            mentioned below:
          </p>
          <hr />
          <ol className="gradient-list" style={{ marginTop: "3em" }}>
            <li>
              <h4>Drug/Food Interactions</h4>
              This product is not suitable for children under the age of two
              years old
            </li>
            <li>
              <h4>Warning Precautions</h4>
              There have been no interactions reported before, but please seek
              medical advice if you experience any symptoms after using this
              product.
            </li>
            <li>
              <h4>Pregnancy Warning and Safety Label of</h4>
              Category A
            </li>
            <li>
              <h4>Pregnancy Warning and Safety Description of</h4>
              There are no reported side effects. Always seek advice from a
              specialist if necessary.
            </li>
          </ol>
        </div>
      </>
    );
  };

  const {
    name,
    shortname,
    description,
    category,
    price,
    image,
    route,
    precautions,
    interactions,
    effects,
    benefits,
    ingredients,
    directions,
    disclaimer,
    halal,
    manufacturer,
    tips,
    read,
    active,
    flavours,
    reference,
  } = data;

  if (!open) return null;
  return ReactDom.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div style={OVERLAY_STYLES}></div>
      <div className="modal">
        <div className="model-header">
          <span
            className="closeModal"
            onClick={() => {
              onClose();
              setCurrentCategory("about");
            }}
            data-tooltip="Close"
          >
            <IoIosCloseCircleOutline />
          </span>
        </div>
        <div>
          <div className="modal-content">
            <div className="modal-image">
              <img src={image} alt={name} />
              <strong style={{ marginTop: "2em" }}>
                RM {price.toFixed(2)}
              </strong>
            </div>
            <div className="modal-category">
              <Category
                data={data}
                setCurrentCategory={setCurrentCategory}
                currentCategory={currentCategory}
              />
            </div>
            <div className="sub-modal-container" ref={scrollRef}>
              {currentCategory === "about" ? (
                <About
                  description={description}
                  ingredients={ingredients}
                  category={category}
                  manufacturer={manufacturer}
                  halal={halal}
                  disclaimer={disclaimer}
                  read={read}
                  active={active}
                  name={name}
                  reference={reference}
                />
              ) : currentCategory === "directions" ? (
                <HowTo
                  tips={tips}
                  category={category}
                  directions={directions}
                  benefits={benefits}
                  flavours={flavours}
                  route={route}
                  name={name}
                />
              ) : currentCategory === "precautions" ? (
                category !== "health" ? (
                  <Precaution
                    shortname={shortname}
                    precautions={precautions}
                    interactions={interactions}
                    name={name}
                    category={category}
                  />
                ) : (
                  <PersonalPrecaution />
                )
              ) : currentCategory === "benefits" ? (
                <Benefits
                  benefits={benefits}
                  reference={reference}
                  name={name}
                />
              ) : currentCategory === "effects" ? (
                <Effects />
              ) : currentCategory === "faqs" ? (
                <div className="category-content">
                  {category === "medicine" ? (
                    <Faq shortname={shortname} category={category} />
                  ) : (
                    <Faq shortname={shortname} />
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>,
    document.getElementById("portal")
  );
};

export default Modal;
