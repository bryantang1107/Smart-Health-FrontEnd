import React, { useRef } from "react";
import "./Health.css";

const SearchBar = ({ setSearchTerm }) => {
  const searchRef = useRef();
  const handleChange = () => {
    setSearchTerm(searchRef.current.value);
  };
  return (
    <>
      <h1>Search Content...</h1>
      <form className="search-box" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Enter a keyword"
          onChange={handleChange}
          ref={searchRef}
        />
        <button type="reset"></button>
      </form>
    </>
  );
};

export default SearchBar;
