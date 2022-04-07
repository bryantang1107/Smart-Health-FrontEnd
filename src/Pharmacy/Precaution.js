import React, { useState } from "react";
import { BsChevronDoubleDown, BsChevronDoubleUp } from "react-icons/bs";
import Advice from "./Advice";
import { GiNotebook } from "react-icons/gi";

const Precaution = ({
  shortname,
  name,
  category,
  interactions,
  precautions,
}) => {
  const [toggleInteraction, setToggleInteraction] = useState(false);
  const [togglePrecaution, setTogglePrecaution] = useState(false);
  const handleInteraction = () => {
    setToggleInteraction(!toggleInteraction);
  };

  const handlePrecaution = () => {
    setTogglePrecaution(!togglePrecaution);
  };

  return (
    <div className="category-content">
      <h4>Precautionary Steps of {name}</h4>
      <br></br>
      <p className="modal-description">
        Before using {shortname}, please consult a doctor especially if you are
        having any of the listed problems. <strong>Contraindications:</strong>
      </p>
      <ul className="styled-list">
        {togglePrecaution
          ? precautions.map((precaution) => {
              return (
                <li>
                  <p className="modal-description">{precaution}</p>
                </li>
              );
            })
          : precautions.map((precaution, index) => {
              if (index > 1) return;
              return (
                <li>
                  <p className="modal-description">{precaution}</p>
                </li>
              );
            })}

        {precautions.length >= 4 &&
          (togglePrecaution ? (
            <span
              onClick={handlePrecaution}
              className="toggle-info-btn"
              data-tooltip="See Less"
            >
              <BsChevronDoubleUp />
            </span>
          ) : (
            <span
              onClick={handlePrecaution}
              className="toggle-info-btn"
              data-tooltip="See More"
            >
              <BsChevronDoubleDown />
            </span>
          ))}
      </ul>
      <hr></hr>
      {interactions && (
        <>
          <h4>Drug interactions with {shortname}</h4>
          <p className="modal-description">
            Interactions may differ individually. You are encouraged to ask your
            doctor about any possible interactions of this drug.
          </p>
          <ul className="styled-list">
            {toggleInteraction
              ? interactions.map((interaction) => {
                  return (
                    <li>
                      <p className="modal-description">{interaction}</p>
                    </li>
                  );
                })
              : interactions.map((interaction, index) => {
                  if (index > 1) return;
                  return (
                    <li>
                      <p className="modal-description">{interaction}</p>
                    </li>
                  );
                })}

            {interactions.length >= 4 &&
              (toggleInteraction ? (
                <span
                  onClick={handleInteraction}
                  className="toggle-info-btn"
                  data-tooltip="See Less"
                >
                  <BsChevronDoubleUp />
                </span>
              ) : (
                <span
                  onClick={handleInteraction}
                  className="toggle-info-btn"
                  data-tooltip="See More"
                >
                  <BsChevronDoubleDown />
                </span>
              ))}
          </ul>
        </>
      )}

      <p className="modal-description-footer">
        This list may be incomplete. Please mention all the drugs you are taking
        to the doctor before starting a new one. Please be alert of the
        following situations as well:
      </p>
      <hr />
      <div className="sub-section-modal">
        <GiNotebook style={{ fontSize: "2rem", color: "#3fbbc0" }} />
        <h3>Note</h3>
      </div>

      <ul className="check-list">
        <li>Avoid excessive exposure to sun</li>
        <li>Avoid using it for a long term, be mindful of expiration date</li>
        <li>
          Please do not consume alcohol as it may affect the effectiveness of
          this item
        </li>
      </ul>
      <br></br>
      <p style={{ fontSize: "0.7rem" }}>
        -- Inform the doctor if you have other diseases. Do not stop taking the
        drug which has been prescribed by doctor.
      </p>
      <hr />
      {category === "medicine" ? (
        <Advice name={name} category={category} />
      ) : (
        <Advice name={name} />
      )}
    </div>
  );
};

export default Precaution;
