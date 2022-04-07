import React from "react";

const Category = ({ currentCategory, data, setCurrentCategory }) => {
  const { precautions, effects, benefits, category } = data;

  return (
    <>
      <strong
        onClick={() => {
          setCurrentCategory("about");
        }}
        className={
          currentCategory === "about"
            ? "category-modal-item1"
            : "category-modal-item"
        }
      >
        About
      </strong>
      <strong
        onClick={() => {
          setCurrentCategory("directions");
        }}
        className={
          currentCategory === "directions"
            ? "category-modal-item1"
            : "category-modal-item"
        }
      >
        How To Use
      </strong>
      {precautions && (
        <strong
          onClick={() => {
            setCurrentCategory("precautions");
          }}
          className={
            currentCategory === "precautions"
              ? "category-modal-item1"
              : "category-modal-item"
          }
        >
          Precautions
        </strong>
      )}

      {benefits && category !== "personal" && (
        <strong
          onClick={() => {
            setCurrentCategory("benefits");
          }}
          className={
            currentCategory === "benefits"
              ? "category-modal-item1"
              : "category-modal-item"
          }
        >
          benefits
        </strong>
      )}
      {effects && (
        <strong
          onClick={() => {
            setCurrentCategory("effects");
          }}
          className={
            currentCategory === "effects"
              ? "category-modal-item1"
              : "category-modal-item"
          }
        >
          Side Effects
        </strong>
      )}

      {category === "medicine" ||
        (category === "personal" && (
          <strong
            onClick={() => {
              setCurrentCategory("faqs");
            }}
            className={
              currentCategory === "faqs"
                ? "category-modal-item1"
                : "category-modal-item"
            }
          >
            FAQS
          </strong>
        ))}

      {category === "health" && (
        <strong
          onClick={() => {
            setCurrentCategory("precautions");
          }}
          className={
            currentCategory === "precautions"
              ? "category-modal-item1"
              : "category-modal-item"
          }
        >
          Precautions
        </strong>
      )}
    </>
  );
};

export default Category;
