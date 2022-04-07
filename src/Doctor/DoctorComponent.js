import React, { useEffect, useState, useReducer } from "react";

import DoctorItem from "./DoctorItem";
import Category from "./Category";
import "../css/doctor.css";
import axios from "../axios";
import { useAuth } from "../context/AuthContext";
import NoDoctor from "./NoDoctor";

const DoctorComponent = () => {
  const { currentUser } = useAuth();

  const filterItems = (category, language, gender) => {
    dispatch({ type: "filter", payload: { language, category, gender } });
  };

  const [doctorData, setDoctorData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [languages, setLanguages] = useState([]);

  const [defaultData, setDefaultData] = useState([]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const getDoctorData = async () => {
      const response = await axios.get("/find-doctor", {
        headers: {
          Authorization: "Bearer " + currentUser,
        },
      });
      const data = response.data.doctor;
      setDoctorData(data);
      setDefaultData(data);
      if (data) {
        const categoryType = new Set(
          data.map((item) => {
            return item.category;
          })
        );
        const languageArr = data.map((item) => {
          return item.languages.split(",");
        });

        let languageType = [];
        languageArr.map((item) => {
          return item.map((language) => {
            return languageType.push(language);
          });
        });
        let newLanguageType = new Set(languageType);
        setLanguages(["All", ...newLanguageType]);
        setCategories(["All", ...categoryType]);
      }
    };

    getDoctorData();
  }, [currentUser]);

  const categoryFilter = (categories, languages, genders) => {
    const arr = [];

    if (categories !== "All") {
      arr.push({ category: categories });
    }
    if (languages !== "All") {
      arr.push({ language: languages });
    }
    if (genders !== "All") {
      arr.push({ gender: genders });
    }

    arr.map((item) => {
      if (item.category) {
        return setDoctorData((doctor) => {
          return doctor.filter((person) => {
            return person.category === categories;
          });
        });
      } else if (item.language) {
        return setDoctorData((doctor) => {
          return doctor.filter((person) => {
            return person.languages.includes(languages);
          });
        });
      } else if (item.gender) {
        return setDoctorData((doctor) => {
          return doctor.filter((person) => {
            return person.gender === genders;
          });
        });
      }
    });
  };

  const reducer = (state, action) => {
    const {
      category = "All",
      language = "All",
      gender = "All",
    } = action.payload;
    if (category === "All" && language === "All" && gender === "All") {
      setDoctorData(defaultData);
      return;
    } else {
      setDoctorData(defaultData);
      categoryFilter(category, language, gender);
      return;
    }
  };

  const [state, dispatch] = useReducer(reducer, doctorData);

  return (
    <section>
      <div className="doctor-title">
        <h1> Our Doctors</h1>
        <div className="underline"></div>
      </div>
      <div className="doctor-grid-container">
        <Category
          className="category-grid"
          filterItems={filterItems}
          categories={categories}
          languages={languages}
        ></Category>

        {doctorData && doctorData.length > 0 ? (
          <DoctorItem items={doctorData} className="doctor-grid"></DoctorItem>
        ) : (
          <NoDoctor></NoDoctor>
        )}
      </div>
      )
    </section>
  );
};
export default DoctorComponent;
