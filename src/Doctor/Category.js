import React, { useState, useRef } from "react";
import { FcFilledFilter } from "react-icons/fc";

const Category = ({ filterItems, categories, languages }) => {
  const [gender, setGender] = useState();
  const categoryRef = useRef();
  const languageRef = useRef();

  const handleChange = (e) => {
    setGender(e.target.value);
  };

  return (
    <div className="doctor-category">
      <div className="filter-title">
        <FcFilledFilter style={{ fontSize: "2em" }}></FcFilledFilter>
        <h1>Filter Search</h1>
        <div className="underline"></div>
      </div>
      <div className="filter-category">
        <label htmlFor="category">Specialities</label>
        <select
          name="category"
          id="category"
          ref={categoryRef}
          className="select-filter"
        >
          {categories.map((category, index) => {
            return (
              <option value={category} key={index}>
                {category}
              </option>
            );
          })}
        </select>
      </div>
      <div className="filter-language">
        <label htmlFor="languages">Languages</label>
        <select
          name="languages"
          id="languages"
          ref={languageRef}
          className="select-filter"
        >
          {languages.map((language, index) => {
            return (
              <option value={language} key={index}>
                {language}
              </option>
            );
          })}
        </select>
      </div>
      <p>Gender</p>
      <div className="filter-gender">
        <input
          type="radio"
          name="select"
          id="option-1"
          value="Male"
          onChange={handleChange}
        />
        <input
          type="radio"
          name="select"
          id="option-2"
          value="Female"
          onChange={handleChange}
        />
        <label htmlFor="option-1" className="option option-1">
          <div className="dot"></div>
          <span>Male</span>
        </label>
        <label htmlFor="option-2" className="option option-2">
          <div className="dot"></div>
          <span>Female</span>
        </label>
      </div>
      <button
        onClick={() => {
          const index = categoryRef.current.selectedIndex;
          const indexLanguage = languageRef.current.selectedIndex;
          filterItems(categories[index], languages[indexLanguage], gender);
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }}
        className="category-btn"
      >
        Apply
      </button>
    </div>
  );
};

export default Category;
