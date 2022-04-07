import { useState } from "react";
import axios from "axios";
import chatImg from "../images/chat.png";
import Loading from "../covid/Loading";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  console.log(process.env.PROJECT_ID);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authObject = {
      "Project-ID": "9d8821ef-1341-4d4f-87b9-b57d1b6643b9",
      "User-Name": username,
      "User-Secret": password,
    };
    try {
      setLoading(true);
      await axios.get("https://api.chatengine.io/chats", {
        headers: authObject,
      });
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      window.location.reload();
    } catch (error) {
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 3000);
      setError("Oops, incorrent username/password");
    }
  };

  return (
    <>
      <div className="discussion-wrapper">
        <div className="how-to-join">
          <h1>How to join discussion forum</h1>
          <div className="join-container">
            <div className="join-row">
              <p>
                1. Click the button at the bottom right corner of the browser
              </p>
              <img src={chatImg} alt="" />
              <p>
                2. Request for the account from admin to join the public
                discussion forum.
              </p>
              <p>3. Provide your name and email (optional) </p>
              <p>
                4. Enter the user account provided by admin to join the forum.
              </p>
              <p>5. Start Discussing ! </p>
            </div>
          </div>
        </div>
        <div className="login-discussion-form">
          {!loading ? (
            <>
              <h2 style={{ textAlign: "center", color: "#fff" }}>Login</h2>
              <h1 className="discussion-title">
                {error && (
                  <p className="alert-primary" style={{ fontSize: "1rem" }}>
                    {error}
                  </p>
                )}
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="login-discussion-input"
                    placeholder="username"
                    required
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-discussion-input"
                    placeholder="password"
                    required
                  />
                  <div align="center">
                    <button type="submit" className="login-discussion-button">
                      <span>Join Discussion Forum</span>
                    </button>
                  </div>
                </form>
              </h1>
            </>
          ) : (
            <>
              <Loading></Loading>
              <h3 style={{ textAlign: "center", color: "#f6f6f6" }}>
                Verifying...
              </h3>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginForm;
