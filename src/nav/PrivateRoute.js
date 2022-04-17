import React, { useEffect, useState } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useUpdateEffect from "../hooks/useUpdateEffect";
import axios from "../axios";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser, logout } = useAuth();
  const [state, setState] = useState(false);
  const history = useHistory();
  useEffect(() => {
    setState(!state);
  }, []);
  useUpdateEffect(() => {
    //use this custom hook, because currentuser state has not been updated in the authcontext
    //to prevent this effect to run in the first render --> so it will not log user out
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
