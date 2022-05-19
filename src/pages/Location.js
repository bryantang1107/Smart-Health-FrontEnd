import React, { useEffect } from "react";
import "../css/location.css";
import icon from "../images/icon.PNG";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const customId = "custom-id-yes";
const Location = () => {
  const notify = () => {
    toast("View Pharmacy across malaysia", {
      toastId: customId,
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      delay: 1000,
    });
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    notify();
  }, []);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <section id="find-pharmacy">
        <div className="location-container">
          <h1>Search pharmacy</h1>
          <div className="underline"></div>
          <div className="how-to-pharmacy">
            <h3>
              Trouble looking for a pharmacy near you? Don't worry let us assist
              you
            </h3>
            <h3>How to search for your desired pharmacy in your area:</h3>
            <div className="gradient-container">
              <ol className="gradient-list">
                <li>
                  Browse the pharmacies in the first window to select the
                  pharmacy in your area.
                </li>
                <li>
                  Pharmacies are sorted by state, click on the top left icon in
                  the first window <img src={icon} alt="" /> to view your state.
                </li>
                <li>☑ your state to view the pharmacies only in your state.</li>
                <li>
                  Each state is represented with a symbol with different colour.
                </li>
                <li>Select the pharmacy by clicking on the symbol.</li>
                <li>You should be able to see the details of the pharmacy.</li>
                <li>
                  Search of the location of the chosen pharmacy in the second
                  window.
                </li>
              </ol>
            </div>
          </div>

          <div className="location-pharmacy">
            <iframe
              src="https://www.google.com/maps/d/u/0/embed?mid=1nyqKhvFt9al7twgNt-c4NBeyOpkUgH47&ehbc=2E312F"
              width="980"
              height="780"
            ></iframe>
            <iframe
              src="https://embed.waze.com/iframe?zoom=13&lat=40.78247&lon=-73.97105&pin=1"
              width="980"
              height="780"
            ></iframe>
          </div>

          <i>
            <strong>Disclaimer:</strong>
            The above data of pharmacy location is fetched from an API provided
            by Dataportal.asia. While Smart Health strives to ensure the
            accuracy of the data, some unforeseen circumstances of data changes
            might occur. However, please feel safe to use this feature as the
            data will be updated constantly by our API provider to provide
            up-to-date information.
          </i>
        </div>
      </section>
    </motion.div>
  );
};

export default Location;
