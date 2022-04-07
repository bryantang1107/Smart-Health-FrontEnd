import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Error from "./Error";
import "../auth/auth.css";
import { useAuth } from "../context/AuthContext";

const ForgotPassword = () => {
  const emailRef = useRef();

  const { resetPassword, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [state, setState] = useState(false);

  const handleUser = () => {
    if (currentUser) {
      setState(true);
    } else {
      setState(false);
    }
  };

  useEffect(() => {
    handleUser();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox to reset your password");
    } catch {
      setError("Please ensure the email is correct ");
      setLoading(false);
    }
  }

  return (
    <>
      {!state ? (
        <>
          <div className="card">
            <div className="card-body">
              <h2 className="heading">Password Reset</h2>
              {error && <div className="alert">{error}</div>}
              {message && <div className="success">{message}</div>}
              <form onSubmit={handleSubmit}>
                <div id="email" className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    ref={emailRef}
                    required
                    className="form-control"
                  ></input>
                </div>

                <button disabled={loading} type="submit" className="form-btn">
                  Reset Password
                </button>
              </form>
              <div className="forgot-password">
                <Link to="/signin" className="title-login">
                  Login
                </Link>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center", marginBottom: "3em" }}>
            Need an account?{" "}
            <Link
              to="/signup"
              style={{
                color: "#0062cc",
                textDecoration: "underline",
                marginLeft: "0.5em",
              }}
            >
              Sign Up
            </Link>{" "}
          </div>
        </>
      ) : (
        <Error></Error>
      )}
    </>
  );
};

export default ForgotPassword;
