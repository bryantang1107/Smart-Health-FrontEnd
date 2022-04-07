import React, { useState } from "react";
import { BsChevronDoubleDown, BsChevronDoubleUp } from "react-icons/bs";

const HowTo = ({
  tips,
  route,
  directions,
  category,
  flavours,
  name,
  benefits,
}) => {
  const [toggleTips, setToggleTips] = useState(false);

  const handleTips = () => {
    setToggleTips(!toggleTips);
  };
  return (
    <>
      <div className="category-content">
        <h4>How to use {name}</h4>
        {category === "medicine" ? (
          <>
            <p className="modal-description">
              This medicine is for oral use only. Swallow this medication as a
              whole with water. Do not chew, crush or break it. It is better to
              take this medication at a fixed time each day if it is indicated
              for everyday use.
            </p>
            <hr />
            <h4>Administration Route</h4>
            <p className="modal-description">{route}</p>
            <hr />
            <h4>Quick Tips</h4>
            <ul className="check-list">
              {toggleTips
                ? tips.map((tip) => {
                    return (
                      <li>
                        <p className="modal-description">{tip}</p>
                      </li>
                    );
                  })
                : tips.map((tip, index) => {
                    if (index > 1) return;
                    return (
                      <li>
                        <p className="modal-description">{tip}</p>
                      </li>
                    );
                  })}

              {tips.length >= 4 &&
                (toggleTips ? (
                  <span
                    onClick={handleTips}
                    className="toggle-info-btn"
                    data-tooltip="See Less"
                  >
                    <BsChevronDoubleUp />
                  </span>
                ) : (
                  <span
                    onClick={handleTips}
                    className="toggle-info-btn"
                    data-tooltip="See More"
                  >
                    <BsChevronDoubleDown />
                  </span>
                ))}
            </ul>
          </>
        ) : category === "device" ? (
          <ol className="gradient-list">
            {directions &&
              directions.map((item) => {
                return (
                  <li>
                    <p>{item}</p>
                  </li>
                );
              })}
          </ol>
        ) : (
          <p className="modal-description">{directions}</p>
        )}

        {benefits && category !== "vitamin" && category !== "device" && (
          <>
            <hr />
            <div className="category-content">
              <h4>Benefits</h4>
              <p className="modal-description">{benefits}</p>
            </div>
          </>
        )}
        {category === "device" && (
          <div className="category-content">
            <hr />
            <h4>How to store {name}</h4>
            <p className="modal-description">
              Keep in a cool, dry place, away from any moisture and heat
            </p>
          </div>
        )}
        {category === "health" && (
          <div className="category-content">
            <hr></hr>
            <h4>How to store {name}</h4>
            <p className="modal-description">
              Do not expose under direct sunlight and moisture. Store at at dry
              place below 30°C
            </p>
            <hr></hr>
            <h4>Shelf Life</h4>
            <p className="modal-description">
              check the expiration date of the product
            </p>
          </div>
        )}
        {flavours && (
          <div className="category-content">
            <h4>Flavours Availability</h4>
            <p className="modal-description">{flavours}</p>
          </div>
        )}
        {tips && category !== "medicine" && (
          <>
            <hr />
            <h4>Quick Tips</h4>
            {tips.map((tip) => {
              return <p className="modal-description">{tip}</p>;
            })}
          </>
        )}
        {route && category !== "medicine" && (
          <div className="category-content">
            <hr />
            <h4>Administration route</h4>
            <p className="modal-description">{route}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default HowTo;
