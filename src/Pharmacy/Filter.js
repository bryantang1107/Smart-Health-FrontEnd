import React, { useRef } from "react";
import "./external.css";
import axios from "../axios";
import { useAuth } from "../context/AuthContext";
import { VscFilter } from "react-icons/vsc";

const Filter = ({ setLoading, setData, setError, category, scroll1 }) => {
  const alphabetRef = useRef();
  const alphabetRefDesc = useRef();
  const priceRefDesc = useRef();
  const { currentUser } = useAuth();
  const priceRef = useRef();
  const handleClick = async () => {
    scroll1();
    if (alphabetRef.current.checked) {
      try {
        setLoading(true);
        const response = await axios.get(`/pharmacy/${category}/az`, {
          headers: {
            Authorization: "Bearer " + currentUser,
          },
        });
        const data = response.data;
        setData(data);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } catch (error) {
        setError(true);
      }
    } else if (priceRef.current.checked) {
      try {
        setLoading(true);
        const response = await axios.get(`/pharmacy/${category}/price`, {
          headers: {
            Authorization: "Bearer " + currentUser,
          },
        });
        const data = response.data;
        setData(data);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } catch (error) {
        setError(true);
      }
    } else if (priceRefDesc.current.checked) {
      try {
        setLoading(true);
        const response = await axios.get(`/pharmacy/${category}/pricedesc`, {
          headers: {
            Authorization: "Bearer " + currentUser,
          },
        });
        const data = response.data;
        setData(data);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } catch (error) {
        setError(true);
      }
    } else if (alphabetRefDesc.current.checked) {
      try {
        setLoading(true);
        const response = await axios.get(`/pharmacy/${category}/azdesc`, {
          headers: {
            Authorization: "Bearer " + currentUser,
          },
        });
        const data = response.data;
        setData(data);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } catch (error) {
        setError(true);
      }
    }
    return;
  };
  return (
    <div className="filter-container">
      <div className="filter-option">
        <fieldset className="fieldset">
          <legend>
            <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
              Filter Products <VscFilter />
            </div>
          </legend>
          <div className="filterProduct">
            <h4>Sort By Alphabet</h4>
            <label>
              <input type="radio" id="AZ" ref={alphabetRef} name="name" />
              <span>A-Z</span>
            </label>
            <label>
              <input type="radio" id="AZ" ref={alphabetRefDesc} name="name" />
              <span>Z-A</span>
            </label>
          </div>
          <div className="filterProduct">
            <h4>Sort By Price</h4>
            <label>
              <input type="radio" id="AZ" ref={priceRefDesc} name="name" />
              <span>Highest-Lowest</span>
            </label>
            <label>
              <input type="radio" id="AZ" ref={priceRef} name="name" />
              <span>Lowest-Highest</span>
            </label>
          </div>
          <span className="filter-product-btn" onClick={handleClick}>
            <VscFilter className="style-icon" />
            <span className="apply-btn-product">Apply</span>
          </span>
        </fieldset>
      </div>
    </div>
  );
};

export default Filter;
