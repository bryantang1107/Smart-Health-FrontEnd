import React, { useState, useEffect } from "react";
import axios from "../axios";
import SearchBar from "./SearchBar";
import "./Health.css";
import useDebounce from "../hooks/useDebounce";
import Loading from "../covid/Loading";
import Error from "./Error";

import HealthItem from "./HealthItem";

const HealthForumComponent = () => {
  const [data, setData] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState();

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://health.gov/myhealthfinder/api/v3/topicsearch.json`
        );
        const arr = response.data.Result.Resources.Resource;
        setData(arr);
        setError(false);
        setIsSearching(false);
      } catch (error) {
        setError(true);
        setIsSearching(false);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      getData(debouncedSearchTerm);
    } else {
      setData([]);
      setIsSearching(false);
    }
  }, [debouncedSearchTerm]);
  const getData = async (query) => {
    try {
      const response = await axios.get(
        `https://health.gov/myhealthfinder/api/v3/topicsearch.json?keyword=${query}`
      );
      const arr = response.data.Result.Resources.Resource;
      setIsSearching(false);
      setError(false);
      setData(arr);
    } catch (error) {
      setError(true);
      setIsSearching(false);
      setSearchTerm("");
    }
  };

  return (
    <section id="health-forum">
      <h1>Health Forum</h1>
      <div className="underline"></div>
      <SearchBar getData={getData} setSearchTerm={setSearchTerm} />
      {isSearching ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        data &&
        !error && (
          <div className="health-article">
            {data.map((x, index) => {
              return <HealthItem x={x} key={index} />;
            })}
          </div>
        )
      )}
    </section>
  );
};

export default HealthForumComponent;
