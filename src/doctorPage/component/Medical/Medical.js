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
import { useAuth } from "../../../context/AuthContext";
import { GrAttachment } from "react-icons/gr";

const Medical = ({ setState, id }) => {
  const [drugData, setDrugData] = useState();
  const [drug, setDrug] = useState("");
  const [other, setOther] = useState(false);
  const { userData } = useAuth();
  const drugRef = useRef();
  const adminRef = useRef();
  const diagnosisRef = useRef();
  const prescriptionRef = useRef();
  const additionalRef = useRef();
  const selectionRef = useRef();
  const [loading, setLoading] = useState();
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const [file, setFile] = useState();
  const hiddenFileInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const diagnosis = diagnosisRef.current.value;
    const route = adminRef.current.value;
    const drugVal = drug ? drug : drugRef.current.value;
    const prescription = prescriptionRef.current.value;
    const category = selectionRef.current.value;
    const additional = additionalRef.current.value;

    try {
      let filename;
      if (file) {
        filename = await uploadFile();
      }
      await axios.post("/user/store-medical-record", {
        id,
        doctorConsulted: userData,
        diagnosis,
        route,
        drug: drugVal,
        prescription,
        filename,
        category,
      });

      await axios.post("/user/store-patient-record", {
        doctorId: userData,
        patientId: id,
        diagnosis,
        route,
        drug: drugVal,
        prescription,
        category,
        additional,
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

  const handleFileSelect = (e) => {
    if (
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/jpeg" ||
      e.target.files[0].type === "text/plain" ||
      e.target.files[0].type === "application/pdf"
    ) {
      setFile(e.target.files[0]);
    } else {
      setError("Please ensure the file type meets the requirement");
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };
  const handleFile = (e) => {
    hiddenFileInput.current.click();
  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios({
        method: "post",
        url: `/user/upload-file/${id}`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

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
              <h4>Name of Diagnosis</h4>
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
              <h4>Drug Category</h4>
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
              <>
                {error && <p className="alert-primary">{error}</p>}
                <span
                  onClick={handleFile}
                  className="file-input"
                  data-tooltip="Upload"
                >
                  <GrAttachment />
                  {file ? file.name : <p>Upload File</p>}
                </span>
                <p style={{ fontSize: "0.8rem", color: "#ff6347" }}>
                  *Acceptable file type: PNG, JPEG, TXT/Plain text & PDF
                </p>
                <input
                  type="file"
                  onChange={handleFileSelect}
                  ref={hiddenFileInput}
                  style={{ display: "none" }}
                />
              </>

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
