import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "../axios";
import {
  BsCloudDownload,
  BsFillEyeFill,
  BsFillEyeSlashFill,
} from "react-icons/bs";
import { motion } from "framer-motion";
import { AiOutlineFileDone } from "react-icons/ai";

const MedicalItem = ({ m, setDoctorId, setIsOpen }) => {
  const [view, setView] = useState();
  const { userData } = useAuth();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  useEffect(() => {
    const getdata = async () => {
      try {
        const response = await axios.get(
          `/user/get-medical-record/${userData}?file=${m.filename}`
        );
        if (!response.data) {
          const response2 = await axios.get(
            `/user/get-medical-file/${userData}?file=${m.filename}`
          );
          setData(response2.data);
          setImage(false);
          return;
        }
        setImage(true);
      } catch (error) {
        console.log(error);
      }
    };
    getdata();
  }, [view]);

  const getFormatDate = (date) => {
    const d = new Date(date);
    return (
      d.getDate().toString() +
      " " +
      d.toLocaleString("default", { month: "long" }) +
      " " +
      d.getFullYear().toString()
    );
  };

  const handleView = () => {
    setView(!view);
  };
  return (
    <div className="medical-record-item">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h3>Date -{getFormatDate(m.date)}</h3>

        {view ? (
          <span
            className="download"
            data-tooltip="Hide"
            onClick={() => handleView(m.filename)}
          >
            <BsFillEyeSlashFill style={{ color: "#FF6347" }} />
          </span>
        ) : (
          <span
            className="download"
            data-tooltip="View"
            onClick={() => handleView(m.filename)}
          >
            <BsFillEyeFill style={{ color: "#8FBC8F" }} />
          </span>
        )}
      </div>
      <div className="medical-record">
        {view ? (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ stiffness: 100 }}
          >
            {image ? (
              <div className="medical-record-content">
                <img
                  src={`/user/get-medical-record/${userData}?file=${m.filename}`}
                ></img>
                <a
                  className="download"
                  data-tooltip="Download"
                  href={`/user/get-medical-record/${userData}?file=${m.filename}`}
                  download
                >
                  <BsCloudDownload style={{ color: "#FF6347" }} />
                </a>
              </div>
            ) : (
              data && (
                <div className="medical-record-content">
                  <AiOutlineFileDone
                    style={{ fontSize: "2rem", color: "#20B2AA" }}
                  />
                  <p
                    style={{
                      textTransform: "none",
                    }}
                  >
                    {data}
                  </p>
                  <a
                    className="download"
                    data-tooltip="Download"
                    href={`/user/get-medical-record/${userData}?file=${m.filename}`}
                    download
                  >
                    <BsCloudDownload style={{ color: "#FF6347" }} />
                  </a>
                </div>
              )
            )}
          </motion.div>
        ) : (
          <>
            <li className="table-header">
              <div className="col col-1">Diagnosis</div>
              <div className="col col-3">Drug Name</div>
              <div className="col col-3">Drug Category</div>
              <div className="col col-3">Administration Route</div>
              <div className="col col-3">Prescription</div>
            </li>
            <li className="table-row hover-effect">
              <div className="col col-1" data-label="Diagnosis:">
                {m.diagnosis}
              </div>
              <div className="col col-3" data-label="Drug Name:">
                {m.drug}
              </div>
              <div className="col col-3" data-label="Drug Category:">
                {m.category}
              </div>
              <div className="col col-3" data-label="Administration Route:">
                {m.route}
              </div>

              <div className="col col-3" data-label="Prescription:">
                {m.prescription}
              </div>
            </li>

            <button
              className="btn green"
              onClick={() => {
                setDoctorId(m.doctorConsulted);
                setIsOpen(true);
              }}
            >
              View Doctor Information
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MedicalItem;
