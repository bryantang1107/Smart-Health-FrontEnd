import React from "react";
import "./external.css";
import "./pharmacy.css";

const Advice = ({ name, category }) => {
  return category ? (
    <>
      <h4 style={{ marginTop: "3em" }}>Additional Advice on taking {name}:</h4>
      <ol className="gradient-list">
        <li>Alcohol Warning (Not Advisable)</li>
        <li>Pregnancy Warning (Maybe Safe)</li>
        <li>Breastfeeding Warning (Limited Data)</li>
        <li>Driving Warning (Not Advisable)</li>
        <li>Kidney Warning (Safe If Prescribed)</li>
        <li>Liver Warning (Limited Data)</li>
      </ol>
    </>
  ) : (
    <>
      <h4>Additional Advice on taking {name}:</h4>
      <ol className="gradient-list">
        <li>Pregnancy Warning and Safety Label: Category A</li>
        <li>
          Pregnancy Warning and Safety Description: Before using
          {name}, inform your doctor if you have any allergies
        </li>
      </ol>
    </>
  );
};

export default Advice;
