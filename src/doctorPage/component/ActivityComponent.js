import React, { useEffect, useState } from "react";
import "../css/activity.css";
import axios from "../../axios";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  faCalendarXmark,
  faCalendarCheck,
  faClock,
  faDeleteLeft,
} from "@fortawesome/free-solid-svg-icons";
import NoAppointment from "../../ChatRoom/NoAppointment";

const formatDate = (date) => {
  return (
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  );
};

const ActivityComponent = () => {
  const { userData } = useAuth();
  const [activityData, setActivityData] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/activity-log/${userData}`);
        const updated = response.data.map((x) => {
          let d = new Date(x.date);
          console.log(d);
          const result = formatDate(d);
          return { ...x, date: result };
        });
        setActivityData(updated.reverse());
      } catch (error) {
        setActivityData();
        setError(true);
      }
    };

    getData();
  }, []);

  const handleDelete = (id) => {
    //remove id here
    try {
      confirmAlert({
        title: "Are you Sure You want to delete this activity log?",
        message: `Warning ! Attempting to delete this activity log will result in permanent deletion. You will not be able to retrieve the information again.`,
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              await axios.delete(`/activity-log/${id}`);
              const newData = activityData.filter((x) => {
                return x._id !== id;
              });
              setActivityData(newData);
            },
            //cancel the appointment here,same as "done appointment" route
          },
          {
            label: "No",
          },
        ],
      });
    } catch (error) {
      setErrorMessage("Unable to Delete");
    }
  };

  if (error) {
    return (
      <>
        <div className="activity-header">
          <h1>Activity</h1>
        </div>
        <NoAppointment data={true} />
      </>
    );
  }

  if (activityData && activityData.length < 1) {
    return (
      <>
        <div className="activity-header">
          <h1>Activity</h1>
        </div>
        <NoAppointment data={true} />
      </>
    );
  }
  return (
    <>
      <div className="activity-header">
        <h1>Activity</h1>
      </div>
      <div className="activity-body">
        {activityData && (
          <div>
            {activityData.map((x, index) => {
              return (
                <div className="activity-item" key={index}>
                  {errorMessage && (
                    <p className="alert-primary">{errorMessage}</p>
                  )}
                  <span
                    className="delete-activity"
                    data-tooltip="Delete Activity"
                    onClick={() => handleDelete(x._id)}
                  >
                    <FontAwesomeIcon icon={faDeleteLeft} />
                  </span>
                  {x.type === "cancel" ? (
                    <FontAwesomeIcon
                      icon={faCalendarXmark}
                      className="logo cancel"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCalendarCheck}
                      className="logo success"
                    />
                  )}

                  <div className="activity-content">
                    {x.type === "cancel" ? (
                      <>
                        <h3 style={{ color: "#dc143c" }}>
                          Appointment Cancelled
                        </h3>
                        <p>
                          <strong>{x.sender}</strong>
                          {x.message}
                        </p>
                        <a href={`mailto: ${x.email}`} className="email">
                          Email {x.sender}
                        </a>
                      </>
                    ) : (
                      <>
                        <h3>New Appointment</h3>
                        <p>{x.message.split("at")[0]}</p>
                        <p>
                          <strong>Date:</strong>
                          {x.message.split("at")[1]}
                        </p>
                        <a href={`mailto: ${x.email}`} className="email">
                          Email {x.sender}
                        </a>
                      </>
                    )}

                    {x.reason && (
                      <p>
                        <strong>Reason:</strong> {x.reason}
                      </p>
                    )}
                    <div className="activity-time">
                      <FontAwesomeIcon icon={faClock} className="logo small" />
                      <strong>{x.date}</strong>
                      <strong>{`${x.time.split(":")[0]}:${
                        x.time.split(":")[1] +
                        x.time.split(":")[2].split(" ")[1]
                      }`}</strong>
                    </div>
                    {x.type === "appointment" && (
                      <div>
                        <Link to="/join">
                          <button className="btn green">View Info</button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default ActivityComponent;
