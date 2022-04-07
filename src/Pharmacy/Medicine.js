import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import "./pharmacy.css";
import imgData from "./data";
import useWindowDimension from "../hooks/useWindowDimensions";
import { ReactComponent as MedicineSvg } from "../images/medicine.svg";
import { ReactComponent as Vitamin } from "../images/vitamin.svg";
import { ReactComponent as Device } from "../images/device.svg";
import { ReactComponent as Personal } from "../images/personal.svg";
import { ReactComponent as Health } from "../images/health.svg";
import Products from "./Products";

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2));
`;

const Medicine = () => {
  const [img, setImg] = useState();
  const { width, height } = useWindowDimension();
  const [ok, setOk] = useState({
    medicine: false,
    vitamin: false,
    device: false,
    health: false,
    personal: false,
  });

  useEffect(() => {
    setImg(imgData);
  }, []);
  const styles = {
    border: "1px solid #3fbbc0",
  };
  const active = (category) => {
    setOk((prev) => {
      if (category === "medicine") {
        return {
          vitamin: false,
          device: false,
          health: false,
          personal: false,
          medicine: true,
        };
      } else if (category === "vitamin") {
        return {
          vitamin: true,
          device: false,
          health: false,
          personal: false,
          medicine: false,
        };
      } else if (category === "device") {
        return {
          vitamin: false,
          device: true,
          health: false,
          personal: false,
          medicine: false,
        };
      } else if (category === "health") {
        return {
          vitamin: false,
          device: false,
          health: true,
          personal: false,
          medicine: false,
        };
      } else {
        return {
          vitamin: false,
          device: false,
          health: false,
          personal: true,
          medicine: false,
        };
      }
    });
  };

  return (
    <>
      {img && (
        <div className="pharmacy-container">
          <h4>
            How can we help? Feeling under the weather? Let us help you find
            what you need.
          </h4>
          {width > 800 ? (
            <Splide
              options={{
                perPage: 2,
                arrows: true,
                drag: "free",
                gap: "5rem",
              }}
            >
              {img.map((x) => {
                return (
                  <SplideSlide key={x.id}>
                    <div className="medicine-card">
                      <img src={x.image} alt="image" className="img-slider" />
                      <Gradient></Gradient>
                    </div>
                  </SplideSlide>
                );
              })}
            </Splide>
          ) : (
            <Splide
              options={{
                perPage: 1,
                arrows: true,
                drag: "free",
                gap: "5rem",
              }}
            >
              {img.map((x) => {
                return (
                  <>
                    <SplideSlide key={x.id}>
                      <div className="medicine-card">
                        <img src={x.image} alt="image" className="img-slider" />
                        <Gradient></Gradient>
                      </div>
                    </SplideSlide>
                  </>
                );
              })}
            </Splide>
          )}
        </div>
      )}

      <div className="medicine-category">
        <p
          style={{
            background: "#3fbbc0",
            padding: "2em",
            border: "4px solid #f6f6f6",
            color: "#f6f6f6",
            marginBottom: "5em",
          }}
        >
          All the Information is retrieved from:{" "}
          <a
            href="https://www.mims.com/malaysia/"
            target="_blank"
            style={{
              textTransform: "none",
              textDecoration: "underline",
              color: "green",
            }}
          >
            https://www.mims.com/malaysia/
          </a>
          <br></br>
          <br></br>
          While Smart Health strives to ensure the accuracy of its product
          images and information, some manufacturing changes to packaging and/or
          ingredients may be pending updates on our site.
        </p>
        <h3>Explore Smart Health's Online pharmacy</h3>
        <div className="medicine-category-container">
          <div
            className="medicine-item"
            onClick={() => active("medicine")}
            style={ok.medicine ? styles : null}
          >
            <MedicineSvg />
            <h3>Medicines & Prescription Drugs</h3>
            <p>
              Our collection of prescription, non prescription and over the
              counter drugs.
            </p>
          </div>
          <div
            className="medicine-item"
            onClick={() => active("vitamin")}
            style={ok.vitamin ? styles : null}
          >
            <Vitamin />
            <h3>Nutrition, Vitamins & Supplements</h3>
            <p>
              We supply nutrition, vitamins & supplements for your good health.
            </p>
          </div>
          <div
            className="medicine-item"
            onClick={() => active("device")}
            style={ok.device ? styles : null}
          >
            <Device />
            <h3>Medical Devices</h3>
            <p>
              Monitor your vitals with our range of medical devices to suit your
              health needs.
            </p>
          </div>
          <div
            className="medicine-item"
            onClick={() => active("health")}
            style={ok.health ? styles : null}
          >
            <Health />
            <h3>Health Food & Drinks</h3>
            <p>
              Monitor your vitals with our range of medical devices to suit your
              health needs.
            </p>
          </div>
          <div
            className="medicine-item"
            onClick={() => active("personal")}
            style={ok.personal ? styles : null}
          >
            <Personal />
            <h3>Personal Care</h3>
            Stock up on our wide selection of personal care products to meet
            your needs.
          </div>
        </div>
      </div>

      <section id="medicine-section">
        {ok.medicine && <Products category="medicine"></Products>}
        {ok.vitamin && <Products category="vitamin"></Products>}
        {ok.device && <Products category="device"></Products>}
        {ok.health && <Products category="health"></Products>}
        {ok.personal && <Products category="personal"></Products>}
      </section>
    </>
  );
};

export default Medicine;
