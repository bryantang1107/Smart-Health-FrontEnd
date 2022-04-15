import React, { useEffect, useState } from "react";
import "../css/covid.css";
import "../css/loading.css";
import Loading from "./Loading";
import Info from "./info";
import axios from "../axios";
import { useAuth } from "../context/AuthContext";
import ServerError from "./ServerError";

const CovidComponent = () => {
  const { currentUser } = useAuth();
  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [localdata, setLocalData] = useState();

  const getData = async () => {
    setLoading(true);

    try {
      const response = await axios.get("/covid", {
        headers: {
          Authorization: "Bearer " + currentUser,
        },
      });

      if (!response.data.message) {
        //if no error
        setState(true);
        setTimeout(() => {
          setData(response.data.globalData);
          setLocalData(response.data.country);

          setLoading(false);
        }, 3000);
        return;
      } else {
        setState(false);
        setLoading(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <>
        <header>
          <h1>Live Covid Statistics Malaysia</h1>
          <div className="underline"></div>
        </header>
        <Loading></Loading>
      </>
    );
  }

  return (
    <>
      <header>
        <h1>Live Covid Statistics Malaysia</h1>
        <div className="underline"></div>
      </header>
      {!loading && state ? (
        <Info data={data} localdata={localdata} onClick={getData}></Info>
      ) : (
        <ServerError></ServerError>
      )}
    </>
  );
};

export default CovidComponent;
