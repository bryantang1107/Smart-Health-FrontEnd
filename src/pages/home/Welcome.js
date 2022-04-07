import React from "react";
import "./home.css";

const Welcome = () => {
  return (
    <>
      <div className="welcome-message-container">
        <div className="welcome-msg">
          <h1 style={{ textAlign: "center", margin: "2em" }}>
            Welcome To Smart Health
          </h1>

          <div className="welcome-card">
            <div className="welcome-image">
              <img
                href="#"
                src="https://i.pinimg.com/originals/a4/7b/a5/a47ba59b4a353e0928ef0551ca44f980.jpg"
              />
            </div>
            <div className="welcome-content">
              <h3>Hello There</h3>
              <p>
                Smart Health is a digital healthcare platform based in Malaysia,
                bringing easier communication with our specialized doctors. We
                provide digital health services including our Online Pharmacy
                and Video Consultations. With the quick service and ease of use,
                taking care of your health just became a lot easier with Smart
                Health.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
