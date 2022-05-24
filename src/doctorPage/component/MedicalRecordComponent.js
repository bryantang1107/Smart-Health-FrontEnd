import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useAuth } from "../../context/AuthContext";
import NoAppointment from "../../ChatRoom/NoAppointment";
import { BsCloudUpload } from "react-icons/bs";
import { motion } from "framer-motion";
import Medical from "./Medical/Medical";
import Loading from "../../covid/Loading";
const MedicalRecordComponent = () => {
  const { userData } = useAuth();
  const [error, setError] = useState();
  const [id, setId] = useState();
  const [data, setData] = useState();
  const [state, setState] = useState(true);
  const [loading, setLoading] = useState();
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/appointment/${userData}`);
        setTimeout(() => {
          setData(response.data);
          setLoading(false);
        }, 1500);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    getData();
  }, [state]);
  const handleClick = (id) => {
    setId(id);
    setState(false);
  };
  if (loading) {
    return <Loading />;
  }

  if (error || data?.length < 1) {
    return (
      <>
        <div className="activity-header">
          <h1>Medical Record</h1>
        </div>
        <NoAppointment lol={true} />
      </>
    );
  }
  return (
    <>
      <div className="activity-header">
        <h1>Medical Record</h1>
      </div>
      {state ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, x: 0 }}>
          <div className="medical-record-container">
            {data?.map((x, index) => {
              return (
                <div className="medical-item" key={index}>
                  {x.gender === "male" ? (
                    <span className="image">
                      <img
                        src="https://www.shareicon.net/data/512x512/2015/09/18/103160_man_512x512.png"
                        alt="user-image"
                      />
                    </span>
                  ) : (
                    <span className="image">
                      <img
                        src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png"
                        alt="female-image"
                      />
                    </span>
                  )}

                  <p> {x.name}</p>
                  <p style={{ textTransform: "none" }}> {x.email}</p>
                  <p> {x.phone}</p>

                  <span
                    className="upload-btn"
                    data-tooltip="Upload"
                    onClick={() => handleClick(x._id)}
                  >
                    <BsCloudUpload />
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      ) : (
        <Medical setState={setState} id={id} />
      )}
    </>
  );
};

export default MedicalRecordComponent;
