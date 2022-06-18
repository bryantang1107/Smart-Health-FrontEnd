import React, { useRef, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Error from "../pages/Error";
import "./auth.css";
import { useAuth } from "../context/AuthContext";
import Loading from "../covid/Loading";
const SignInComponent = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { login, currentUser, loginWithGoogle } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const handleUser = () => {
      if (currentUser) {
        setState(true);
        return;
      } else {
        setState(false);
        return;
      }
    };
    handleUser();
  }, [currentUser]);

  async function signIn() {
    try {
      setLoading(true);
      await loginWithGoogle();
      setTimeout(() => {
        setLoading(false);
        history.push("/");
      }, 1500);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      setTimeout(() => {
        setLoading(false);
        history.push("/");
      }, 1500);
    } catch (error) {
      if (
        error.toString() ===
        "FirebaseError: Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found)."
      ) {
        setError("Invalid Email");
      } else if (
        error.toString() ===
        "FirebaseError: Firebase: The password is invalid or the user does not have a password. (auth/wrong-password)."
      ) {
        setError("Invalid Password.");
      } else {
        setError("Failed To Sign In");
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
              <h2 className="heading">Sign In</h2>
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

                <button disabled={loading} type="submit" className="form-btn">
                  Sign In
                </button>
              </form>
              <div className="google-btn-container" onClick={signIn}>
                <div className="google-btn">
                  <div className="google-icon-wrapper">
                    <img
                      className="google-icon"
                      alt="google-icon"
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
            Need an account?{" "}
            <Link
              to="/signup"
              style={{
                color: "#0062cc",
                textDecoration: "underline",
                marginLeft: "0.5em",
              }}
            >
              Sign Up Now
            </Link>
          </div>
        </>
      ) : (
        <Error></Error>
      )}
    </>
  );
};

export default SignInComponent;
