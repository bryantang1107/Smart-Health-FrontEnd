import React, { useRef, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./auth.css";
import { useAuth } from "../context/AuthContext";
import Error from "../pages/Error";
import Loading from "../covid/Loading";
const SignUpComponent = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser, loginWithGoogle } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [state, setState] = useState(false);

  const handleUser = () => {
    if (currentUser) {
      setState(true);
    } else {
      setState(false);
    }
  };
  async function signIn() {
    try {
      setLoading(true);
      await loginWithGoogle();
      setTimeout(() => {
        setLoading(false);
        history.push("/");
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    handleUser();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);

      history.push("/");
    } catch (error) {
      if (
        error.toString() ==
        "FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        setError("Password should be at least 6 characters.");
      } else {
        setError("Failed To Sign Up");
      }

      setLoading(false);
    }
  }

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <>
      {!state ? (
        <>
          <div className="card">
            <div className="card-body">
              <h2 className="heading">Sign Up</h2>
              {error && <div className="alert-auth">{error}</div>}
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
                <div id="password" className="form-group">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    ref={passwordRef}
                    required
                    className="form-control"
                  ></input>
                </div>
                <div id="passwordConfirm" className="form-group">
                  <label htmlFor="passwordConfirm" className="form-label">
                    Password Confirmation
                  </label>
                  <input
                    type="password"
                    ref={passwordConfirmRef}
                    required
                    className="form-control"
                  ></input>
                </div>

                <button disabled={loading} type="submit" className="form-btn">
                  Sign Up
                </button>
              </form>
              <div className="google-btn-container" onClick={signIn}>
                <div className="google-btn">
                  <div className="google-icon-wrapper">
                    <img
                      className="google-icon"
                      src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    />
                  </div>
                  <p className="btn-text">
                    <b>Sign in with google</b>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginBottom: "3em" }}>
            Already have an account?
            <Link
              to="/signin"
              style={{
                color: "#0062cc",
                textDecoration: "underline",
                marginLeft: "0.5em",
              }}
            >
              Log In
            </Link>
          </div>
        </>
      ) : (
        <Error></Error>
      )}
    </>
  );
};

export default SignUpComponent;
