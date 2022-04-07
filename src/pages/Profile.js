import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../auth/auth.css";
import { useAuth } from "../context/AuthContext";
import Loading from "../covid/Loading";
import Success from "./Success";
import { motion } from "framer-motion";

const Profile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { userInfo, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(false);
  const [password, setPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setPassword(state);
  }, [state]);

  if (loading) {
    return <Loading></Loading>;
  }

  if (success) {
    return <Success></Success>;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");
    if (emailRef.current.value !== userInfo.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    if (
      !passwordRef.current.value &&
      emailRef.current.value === userInfo.email
    ) {
      alert("No Changes Are Made !");
    }

    Promise.all(promises)
      .then(() => {
        setSuccess(true);
      })
      .catch((e) => {
        setError(e.toString());
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="card">
          <div className="card-body">
            <h2 className="heading">Update Profile</h2>
            <div className="underline"></div>
            {error && <div className="alert-auth">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div id="email" className="form-group email-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <div className="email-update">
                  {state ? (
                    <input
                      type="email"
                      ref={emailRef}
                      required
                      className="form-control"
                      defaultValue={userInfo.email}
                    ></input>
                  ) : (
                    <p style={{ textTransform: "none" }}>{userInfo.email}</p>
                  )}
                  <button
                    className="email-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setState(!state);
                    }}
                  >
                    {state ? "Cancel" : "Change Email"}
                  </button>
                </div>
              </div>
              <div id="password" className="form-group password-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="password-update">
                  {password ? (
                    <input
                      type="password"
                      ref={passwordRef}
                      className="form-control"
                      placeholder="Enter New Password, Else Leave It Blank"
                    ></input>
                  ) : (
                    <p>**********</p>
                  )}
                  <button
                    className="password-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setState(!state);
                    }}
                  >
                    {state ? "Cancel" : "Change Password"}
                  </button>
                </div>
              </div>
              {password && (
                <div
                  id="passwordConfirm"
                  className="form-group password-confirm-group"
                >
                  <label htmlFor="passwordConfirm" className="form-label">
                    Password Confirmation
                  </label>

                  <div className="password-update">
                    <input
                      type="password"
                      ref={passwordConfirmRef}
                      className="form-control"
                      placeholder="Enter Password Again"
                    ></input>
                  </div>
                </div>
              )}

              {state && (
                <button disabled={loading} type="submit" className="form-btn">
                  Update Profile
                </button>
              )}
            </form>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Profile;
