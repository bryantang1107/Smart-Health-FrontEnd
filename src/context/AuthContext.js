import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import axios from "../axios";
import { storeUser } from "../actions/actionCreator";
import { useDispatch } from "react-redux";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext); //takes in what you want to use in this case authcontext
  //the props to be used will be provided by AuthContext.Provider
}

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState();
  const [userRole, setUserRole] = useState();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const [userData, setUserData] = useState();

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    setCurrentUser(undefined);
    return auth.signOut();
  }
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return userInfo.updateEmail(email);
  }

  function updatePassword(password) {
    return userInfo.updatePassword(password);
  }

  function loginWithGoogle() {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserInfo(user);
        const token = user._delegate.accessToken;
        const response = await axios.get("/login", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const signedToken = response.data.accessToken;
        setCurrentUser(signedToken);
        const user_id = response.data.result;
        setUserData(user_id._id);
        const userRole = await axios.get(`/login/userRole/${user_id._id}`);
        setUserRole(userRole.data);
        dispatch(storeUser(userRole.data));
      }

      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    userRole,
    userInfo,
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    loginWithGoogle,
    userData,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
