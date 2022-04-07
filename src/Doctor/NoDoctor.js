import React, { useEffect, useState } from "react";
import "./nodoctor.css";
import Loading from "../covid/Loading";

const NoDoctor = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lol = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(lol);
  }, []);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="site">
      <div className="sketch">
        <div className="bee-sketch red"></div>
        <div className="bee-sketch blue"></div>
      </div>

      <h1 className="error-404">
        404:
        <small>No Doctors Found :(</small>
      </h1>
    </div>
  );
};

export default NoDoctor;
