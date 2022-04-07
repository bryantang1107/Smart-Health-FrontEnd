import React, { useEffect, useState } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useUpdateEffect from "../hooks/useUpdateEffect";
import axios from "../axios";

const PrivateRoute = ({ component: Component, ...rest }) => {
  //rest includes the path and exact
  const { currentUser, logout } = useAuth();
  const [state, setState] = useState(false);
  const history = useHistory();
  useEffect(() => {
    setState(!state);
  }, []);
  useUpdateEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("/check", {
          headers: {
            Authorization: "Bearer " + currentUser,
          },
        });
      } catch (err) {
        await logout();
        history.push("/signin");
        alert("Session Expired: Please Log In Again !");
      }
    };

    checkAuth();
  }, [state]);

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/signin"></Redirect>
        );
      }}
    ></Route>
  );
};

export default PrivateRoute;
