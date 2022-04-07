import React, { useState } from "react";
import { FaPills } from "react-icons/fa";
import { BsChevronDoubleDown, BsChevronDoubleUp } from "react-icons/bs";
import { AiOutlineAlert } from "react-icons/ai";

const About = ({
  description,
  ingredients,
  category,
  halal,
  manufacturer,
  disclaimer,
  read,
  active,
  reference,
  name,
}) => {
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(!toggle);
  };
  return (
    <div className="category-content">
      <h4>Introduction of {name}</h4>
      <p className="modal-description">{description}</p>
      <hr />
      {category === "device" && (
        <>
          <div className="category-content">
            <h4>Shell Life</h4>
            <p className="modal-description">
              Check for the expiry date on the package
            </p>
          </div>
        </>
      )}
      {ingredients && (
        <>
          <div className="category-content">
            <h4>Ingredient</h4>
            <p className="modal-description">{ingredients}</p>
          </div>
        </>
      )}

      {category === "vitamin" && (
        <>
          <hr />
          <h4>halal status</h4>
          <p className="modal-description">halal</p>
        </>
      )}
      <div className="category-content">
        {manufacturer && (
          <>
            <hr />
            <h4>Manufactured By</h4>
            <p className="modal-description">{manufacturer}</p>
          </>
        )}

        {halal && category !== "vitamin" && (
          <>
            <hr />
            <h4>halal status</h4>
            <p className="modal-description">{halal}</p>
          </>
        )}

        {disclaimer && (
          <>
            <hr />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2em",
                border: "1px solid #DC1434",
                padding: "1em",
                marginTop: "2em",
                borderRadius: "5px",
              }}
            >
              <AiOutlineAlert style={{ fontSize: "6rem", color: "#DC143C" }} />
              <p className="modal-description">Disclaimer: {disclaimer}</p>
            </div>
          </>
        )}
      </div>
      {active && (
        <>
          <div className="sub-section-modal">
            <FaPills style={{ fontSize: "2rem", color: "#3fbbc0" }} />
            <h4 className="category-content">Active Ingredient</h4>
          </div>

          <p className="modal-description">{active}</p>
          {toggle && (
            <>
              <h5>Uses of {active}</h5>
              <p>{read[0]}</p>
              <h5>How {active} Works</h5>
              <p>{read[1]}</p>
              <h5>Side Effects of {active}</h5>
              <p>{read[2]}</p>
            </>
          )}
          {active &&
            (toggle ? (
              <span
                onClick={handleClick}
                className="toggle-info-btn"
                data-tooltip="See Less"
              >
                <BsChevronDoubleUp />
              </span>
            ) : (
              <span
                onClick={handleClick}
                className="toggle-info-btn"
                data-tooltip="See More"
              >
                <BsChevronDoubleDown />
              </span>
            ))}
          {category === "medicine" && reference && (
            <>
              <hr />

              <p>For More Reference:</p>
              <a
                href={reference}
                target="_blank"
                style={{ color: "#0071eb", textTransform: "none" }}
              >
                {reference}
              </a>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default About;
