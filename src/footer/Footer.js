import React from "react";
import "./footer.css";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import * as GoIcons from "react-icons/go";

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="footer-left">
          <h2>Smart Health</h2>
          <p style={{ fontSize: "0.8em" }}>
            We Are Your Truly Needed Healthcare Providers On the Cloud.
            Providing Accessible Healthcare Services Anywhere Within Malaysia.
            Your Life. Our Passion. Your Health Is Our Top Priority. We will
            connect you to the right Specialist. Consult Experienced Doctors
            &nmp; Let our medical concierge team assist you.
          </p>
          <div className="detail">
            <div className="contact">
              <AiIcons.AiOutlinePhone
                style={{ color: "#FF0000" }}
              ></AiIcons.AiOutlinePhone>
              <p>03-4567890</p>
            </div>
            <div className="email">
              <AiIcons.AiOutlineMail
                style={{ color: "#e1c699" }}
              ></AiIcons.AiOutlineMail>
              <p>smarthealthgroup22@gmail.com</p>
            </div>

            <div className="social-container">
              <div className="socials facebook">
                <div className="tooltip">Facebook</div>
                <span className="span-footer">
                  <FaIcons.FaFacebookF></FaIcons.FaFacebookF>
                </span>
              </div>
              <div className="socials twitter">
                <div className="tooltip">Twitter</div>
                <span className="span-footer">
                  <BsIcons.BsTwitter></BsIcons.BsTwitter>
                </span>
              </div>
              <div className="socials instagram">
                <div className="tooltip">Instagram</div>
                <span className="span-footer">
                  <AiIcons.AiOutlineInstagram></AiIcons.AiOutlineInstagram>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-center">
          <h2>Our Motto</h2>
          <div className="motto-item">
            <GoIcons.GoVerified
              style={{ color: "#32CD32" }}
            ></GoIcons.GoVerified>
            <p>Ensuring A Better Healthcare Service For You</p>
          </div>
          <div className="motto-item">
            <GoIcons.GoVerified
              style={{ color: "#32CD32" }}
            ></GoIcons.GoVerified>
            <p>Providing The Best Medical Service To You Is Our Top Priority</p>
          </div>
          <div className="motto-item">
            <GoIcons.GoVerified
              style={{ color: "#32CD32" }}
            ></GoIcons.GoVerified>
            <p>Put Customer first</p>
          </div>
          <div className="motto-item">
            <GoIcons.GoVerified
              style={{ color: "#32CD32" }}
            ></GoIcons.GoVerified>
            <p>The customer is always right</p>
          </div>
          <div className="motto-item">
            <GoIcons.GoVerified
              style={{ color: "#32CD32" }}
            ></GoIcons.GoVerified>
            <p>Treating every customer like family</p>
          </div>
        </div>

        <div className="footer-right">
          <h2>Feedback Form</h2>
          <p style={{ fontSize: "0.8em" }}>
            Thank you for checking us out. We would love you to be a returning
            customer and will do our best to be worthy of your continued
            business. Building a relationship of trust with you is our top
            priority.
          </p>
          <div className="form">
            <form>
              <label htmlFor="email">Email:</label>
              <input type="email" required name="email" />
              <label htmlFor="feedback">Feedback:</label>
              <textarea name="feedback" cols="20" rows="5"></textarea>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
      <div className="copyright">
        &#169; Copyright <strong>Smart Health Group 2021.</strong> All Rights
        Reserved
      </div>
    </footer>
  );
};

export default Footer;
