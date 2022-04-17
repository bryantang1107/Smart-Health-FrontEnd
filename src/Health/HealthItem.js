import React, { useState } from "react";
import { BsChevronDoubleUp } from "react-icons/bs";
import { BsChevronDoubleDown } from "react-icons/bs";

const HealthItem = ({ x }) => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <div className="health-article-item">
      <img src={x.ImageUrl} alt={x.ImageAlt} />
      <h3>{x.Title}</h3>
      <a href={x.AccessibleVersion} target="_blank">
        Read More Here
      </a>
      <div className="health-article-content">
        <h5>Related Content/Article</h5>
        <ol className="gradient-list">
          {toggle
            ? x.RelatedItems.RelatedItem.map((y, index) => {
                return (
                  <li key={index}>
                    <p>{y.Title}</p>
                    <a href={y.Url} target="_blank">
                      Read More Here
                    </a>
                  </li>
                );
              })
            : x.RelatedItems.RelatedItem.map((y, index) => {
                if (index > 1) return;
                return (
                  <li key={index}>
                    <p>{y.Title}</p>
                    <a href={y.Url} target="_blank">
                      Read More Here
                    </a>
                  </li>
                );
              })}

          {toggle ? (
            <span
              onClick={handleToggle}
              className="toggle-btn"
              data-tooltip="See Less"
            >
              <BsChevronDoubleUp />
            </span>
          ) : (
            <span
              onClick={handleToggle}
              className="toggle-btn"
              data-tooltip="See More"
            >
              <BsChevronDoubleDown />
            </span>
          )}
        </ol>
      </div>
    </div>
  );
};

export default HealthItem;
