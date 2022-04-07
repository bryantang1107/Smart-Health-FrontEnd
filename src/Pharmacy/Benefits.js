import React from "react";

const Benefits = ({ benefits, reference, name }) => {
  return (
    <div className="category-content">
      <h4>Benefits of using {name}</h4>

      <ol className="gradient-list">
        {typeof benefits === "string" ? (
          <p>{benefits}</p>
        ) : (
          benefits.map((benefit) => {
            return (
              <li>
                <p>{benefit}</p>
              </li>
            );
          })
        )}
      </ol>
      {reference && (
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
    </div>
  );
};

export default Benefits;
