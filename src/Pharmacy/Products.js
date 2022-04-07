import React, { useEffect, useState, useRef } from "react";
import axios from "../axios";
import { useAuth } from "../context/AuthContext";
import { GiShoppingCart } from "react-icons/gi";
import Modal from "./Modal";
import Loading from "../covid/Loading";
import NoMedicine from "./NoMedicine";
import Filter from "./Filter";

const Products = ({ category }) => {
  const { currentUser } = useAuth();
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [loading, setLoading] = useState();
  const [error, setError] = useState(false);
  const scrollRef = useRef();
  const scrollRef1 = useRef();
  useEffect(() => {
    const scroll = () => {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    };
    scroll();
  }, []);

  const scroll1 = () => {
    scrollRef1.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/pharmacy/${category}`, {
          headers: {
            Authorization: "Bearer " + currentUser,
          },
        });

        const data = response.data;
        setData(data);

        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } catch (error) {
        setError(true);
      }
    };
    getData();
  }, []);

  if (error) {
    return <NoMedicine />;
  }

  return (
    <>
      {category === "device" ? (
        <h1 style={{ textAlign: "center", color: "#3fbbc0" }}>
          Medical Devices
        </h1>
      ) : category === "vitamin" ? (
        <h1 style={{ textAlign: "center", color: "#3fbbc0" }}>
          Nutrition, Vitamins & Supplements
        </h1>
      ) : category === "health" ? (
        <h1 style={{ textAlign: "center", color: "#3fbbc0" }}>
          Health Food & Drinks
        </h1>
      ) : category === "personal" ? (
        <h1 style={{ textAlign: "center", color: "#3fbbc0" }}>Personal Care</h1>
      ) : (
        <h1 style={{ textAlign: "center", color: "#3fbbc0" }}>
          Medicines & Prescription Drugs
        </h1>
      )}
      <div className="underline" ref={scrollRef}></div>
      <Filter
        setData={setData}
        setLoading={setLoading}
        setError={setError}
        category={category}
        scroll1={scroll1}
      />
      {data && !loading ? (
        <div className="product-container" ref={scrollRef1}>
          {data.map((x) => {
            return (
              <div className="product-item" key={x.id}>
                <img src={x.image} alt="product-image" />

                <p style={{ textAlign: "center" }}>{x.name}</p>
                <div className="doctor-info-rating">
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                </div>
                <strong>RM {x.price.toFixed(2)}</strong>
                <div
                  className="view-product-btn"
                  onClick={() => {
                    setIsOpen(true);
                    setModalData({ ...x });
                  }}
                >
                  <GiShoppingCart style={{ fontSize: "2rem" }}></GiShoppingCart>
                  <p>View Product</p>
                </div>
              </div>
            );
          })}

          <Modal
            open={isOpen}
            data={modalData}
            onClose={() => setIsOpen(false)}
          ></Modal>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Products;
