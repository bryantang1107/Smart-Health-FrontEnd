import React, { useRef } from "react";
import "./patient.css";
const Search = ({ setSearchTerm }) => {
  const searchRef = useRef();
  const handleChange = () => {
    setSearchTerm(searchRef.current.value);
  };
  return (
    <section id="search-patient">
      <div className="Card">
        <div className="CardInner">
          <label>Search for patient (name/email/number)</label>
          <div className="container-search">
            <div className="Icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#657789"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-search"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <div className="InputContainer">
              <input
                placeholder="Patient details..."
                type="text"
                onChange={handleChange}
                ref={searchRef}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
