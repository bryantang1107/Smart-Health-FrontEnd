import React, { useEffect, useRef, useState } from "react";
import { HiChevronDoubleLeft } from "react-icons/hi";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrescriptionBottleMedical } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineComment } from "react-icons/ai";
import data from "../../data/drug";
import axios from "../../../axios";
import Loading from "../../../covid/Loading";
import Success from "./Success";

const Medical = ({ setState, id }) => {
  const [drugData, setDrugData] = useState();
  const [drug, setDrug] = useState("");
  const [other, setOther] = useState(false);
  const drugRef = useRef();
  const adminRef = useRef();
  const diagnosisRef = useRef();
  const prescriptionRef = useRef();
  const additionalRef = useRef();
  const selectionRef = useRef();
  const [loading, setLoading] = useState();
  const [success, setSuccess] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/user/store-medical-record", {
        id,
        diagnosis: diagnosisRef.current.value,
        route: adminRef.current.value,
        drug: drug ? drug : drugRef.current.value,
        prescription: prescriptionRef.current.value,
        category: selectionRef.current.value,
        additional: additionalRef.current.value,
      });
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const currentData = data.filter((x) => {
      return x.category === "Heart";
    });
    setDrugData(currentData);
  }, [setState]);
  const handleClick = () => {
    const currentData = data.filter((x) => {
      return x.category === selectionRef.current.value;
    });
    setOther(false);
    if (drugRef.current.value === "other" || currentData.length < 1) {
      setOther(true);
    }
    setDrugData(currentData);
  };

  const handleChange = () => {
    if (drugRef.current.value !== "other") {
      setDrug("");
      setOther(false);
      return;
    }
    setOther(true);
  };

  if (loading) {
    return <Loading />;
  }

  if (success) {
    return <Success setState={setState} />;
  }

  return (
    <>
      <div className="medical-container">
        <span
          onClick={() => setState(true)}
          className="back upload-btn"
          data-tooltip="Back"
        >
          <HiChevronDoubleLeft />
        </span>
      </div>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ stiffness: 100 }}
      >
        <div className="upload-container">
          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="input-group input-group-icon">
                <input
                  type="text"
                  placeholder="Diagnosis"
                  autoFocus
                  required
                  ref={diagnosisRef}
                />
                <div className="input-icon">
                  <i className="fa fa-stethoscope"></i>
                </div>
              </div>
              <h4>Category</h4>
              <select
                name="category"
                className="category"
                ref={selectionRef}
                onChange={handleClick}
              >
                <option value="Heart">Heart</option>
                <option value="Lung">Lung</option>
                <option value="Kidneys">Kidneys</option>
                <option value="Liver">Liver</option>
                <option value="Nose">Nose</option>
                <option value="Stomach">Stomach</option>
                <option value="Genital">Genital</option>
                <option value="Pancreas">Pancreas</option>
                <option value="Gallbladder">Gallbladder</option>
                <option value="Other">Others...</option>
              </select>
              <div className="row-appointment">
                <div className="col-half">
                  <h4>Drug Name</h4>
                  <div className="input-group">
                    <select
                      name="category"
                      className="category"
                      ref={drugRef}
                      onChange={handleChange}
                    >
                      {drugData?.map((x, index) => {
                        return (
                          <option defaultValue={x.name} key={index}>
                            {x.name}
                          </option>
                        );
                      })}
                      {drugData && <option value="other">Others...</option>}
                    </select>
                  </div>
                </div>
                <div className="col-half">
                  <h4>Administration Route</h4>
                  <div className="input-group">
                    <select name="category" className="category" ref={adminRef}>
                      <option value="Intravenouse">Intravenouse Route</option>
                      <option value="Intramuscular">Intramuscular Route</option>
                      <option value="Subcutaneous">Subcutaneous Route</option>
                      <option value="Rectal">Rectal Route</option>
                      <option value="Vaginal">Vaginal Route</option>
                      <option value="Inhaled">Inhaled Route</option>
                      <option value="Oral">Oral Route</option>
                    </select>
                  </div>
                </div>
              </div>
              {other && (
                <div>
                  <input
                    type="text"
                    placeholder="Enter Drug Name"
                    value={drug}
                    onChange={(e) => setDrug(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
              )}

              <div className="row-appointment">
                <h4>Prescription Details</h4>
                <div className="input-group input-group-icon">
                  <textarea
                    name="prescription"
                    rows="10"
                    required
                    placeholder="Write Prescription Details ..."
                    ref={prescriptionRef}
                  ></textarea>
                  <div className="input-icon">
                    <i>
                      <FontAwesomeIcon icon={faPrescriptionBottleMedical} />
                    </i>
                  </div>
                </div>
              </div>
              <div className="row-appointment">
                <h4>Additional Comment</h4>
                <span>
                  <p style={{ fontSize: "0.8rem", color: "#c4c4c4" }}>
                    *This information is kept confidential from your patient
                  </p>
                </span>
                <div className="input-group input-group-icon">
                  <textarea
                    name="prescription"
                    rows="10"
                    required
                    placeholder="Write Prescription Details ..."
                    ref={additionalRef}
                  ></textarea>
                  <div className="input-icon">
                    <i>
                      <AiOutlineComment />
                    </i>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn green">
                Upload
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Medical;
