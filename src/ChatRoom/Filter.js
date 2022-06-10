import React, { useRef, useState } from "react";
import { VscFilter } from "react-icons/vsc";
import AppointmentModal from "./AppointmentModal";
import NoAppointment from "./NoAppointment";
import { useHistory } from "react-router-dom";

const Filter = ({ appointmentData, setAppointmentData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentData, setCurrentData] = useState();
  const [data, setData] = useState();
  const [filterData, setFilterData] = useState();
  const [dataDesc, setDescData] = useState();
  const history = useHistory();

  const newestRef = useRef();
  const oldestRef = useRef();
  const filterRef = useRef();
  const handleClick = () => {
    if (newestRef.current.checked || oldestRef.current.checked) {
      if (newestRef.current.checked) {
        const sorted = appointmentData.sort((a, b) => {
          return (
            new Date(b.date + " " + b.time).getTime() -
            new Date(a.date + " " + a.time).getTime()
          );
        });
        setData(sorted);
        setFilterData();
        setDescData();
      } else {
        const sorted = appointmentData.sort((a, b) => {
          return (
            new Date(a.date + " " + a.time).getTime() -
            new Date(b.date + " " + b.time).getTime()
          );
        });
        setDescData(sorted);
        setFilterData();
        setData();
      }
    } else if (filterRef.current.checked) {
      const filtered = appointmentData.filter((x) => {
        const d = new Date(x);
        return d.toISOString === x.toISOString;
      });
      setFilterData(filtered);
      setData();
      setDescData();
    }
  };

  const go = (id) => {
    history.push(`/patient-info/${id}`);
  };
  if (filterData) {
    return (
      <>
        <div className="filter-container">
          <div className="filter-option">
            <fieldset className="fieldset">
              <legend>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1em" }}
                >
                  Filter Products <VscFilter />
                </div>
              </legend>
              <div className="filterProduct">
                <h4>Sort By Appointment Date</h4>
                <label>
                  <input type="radio" id="AZ" ref={oldestRef} name="name" />
                  <span>Oldest - Newest</span>
                </label>
                <label>
                  <input type="radio" id="AZ" ref={newestRef} name="name" />
                  <span>Newest - Oldest</span>
                </label>
              </div>
              <div className="filterProduct">
                <h4>Today's Appointment</h4>
                <label>
                  <input type="radio" id="AZ" ref={filterRef} name="name" />
                  <span>Filter Today's Appointment</span>
                </label>
              </div>
              <span className="filter-product-btn" onClick={handleClick}>
                <VscFilter className="style-icon" />
                <span className="apply-btn-product">Apply</span>
              </span>
            </fieldset>
          </div>
        </div>
        {filterData?.length > 0 ? (
          <ul className="responsive-table">
            <li className="table-header">
              <div className="col col-1">Name:</div>
              <div className="col col-2">Email:</div>
              <div className="col col-3">Appointment Date:</div>
              <div className="col col-3">Appointment Time:</div>
            </li>
            {filterData.map((x, index) => {
              return (
                <div
                  key={index}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <li
                    className="table-row hover-effect"
                    onClick={() => {
                      setIsOpen(true);
                      setCurrentData(x);
                    }}
                  >
                    <div className="col col-1" data-label="Name:">
                      {x.name}
                    </div>
                    <div
                      className="col col-2"
                      data-label="Email:"
                      style={{ textTransform: "lowercase" }}
                    >
                      {x.email}
                    </div>
                    <div className="col col-3" data-label="Appointment Date:">
                      {x.date}
                    </div>
                    <div className="col col-3" data-label="Appointment Time:">
                      {x.time}
                    </div>
                  </li>
                  <span
                    onClick={() => go(x._id)}
                    style={{
                      margin: "1em",
                      color: "#00bbc0",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Visit Profile
                  </span>
                </div>
              );
            })}

            <AppointmentModal
              open={isOpen}
              onClose={() => setIsOpen(false)}
              appointmentData={currentData}
            ></AppointmentModal>
          </ul>
        ) : (
          <NoAppointment />
        )}
      </>
    );
  }
  if (data?.length > 0) {
    return (
      <>
        <div className="filter-container">
          <div className="filter-option">
            <fieldset className="fieldset">
              <legend>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1em" }}
                >
                  Filter Products <VscFilter />
                </div>
              </legend>
              <div className="filterProduct">
                <h4>Sort By Appointment Date</h4>
                <label>
                  <input type="radio" id="AZ" ref={oldestRef} name="name" />
                  <span>Oldest - Newest</span>
                </label>
                <label>
                  <input type="radio" id="AZ" ref={newestRef} name="name" />
                  <span>Newest - Oldest</span>
                </label>
              </div>
              <div className="filterProduct">
                <h4>Today's Appointment</h4>
                <label>
                  <input type="radio" id="AZ" ref={filterRef} name="name" />
                  <span>Filter Today's Appointment</span>
                </label>
              </div>
              <span className="filter-product-btn" onClick={handleClick}>
                <VscFilter className="style-icon" />
                <span className="apply-btn-product">Apply</span>
              </span>
            </fieldset>
          </div>
        </div>
        {data?.length > 0 ? (
          <ul className="responsive-table">
            <li className="table-header">
              <div className="col col-1">Name:</div>
              <div className="col col-2">Email:</div>
              <div className="col col-3">Appointment Date:</div>
              <div className="col col-3">Appointment Time:</div>
            </li>
            {data.map((x, index) => {
              return (
                <div
                  key={index}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <li
                    className="table-row hover-effect"
                    onClick={() => {
                      setIsOpen(true);
                      setCurrentData(x);
                    }}
                  >
                    <div className="col col-1" data-label="Name:">
                      {x.name}
                    </div>
                    <div
                      className="col col-2"
                      data-label="Email:"
                      style={{ textTransform: "lowercase" }}
                    >
                      {x.email}
                    </div>
                    <div className="col col-3" data-label="Appointment Date:">
                      {x.date}
                    </div>
                    <div className="col col-3" data-label="Appointment Time:">
                      {x.time}
                    </div>
                  </li>
                  <span
                    onClick={() => go(x._id)}
                    style={{
                      margin: "1em",
                      color: "#00bbc0",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Visit Profile
                  </span>
                </div>
              );
            })}

            <AppointmentModal
              open={isOpen}
              onClose={() => setIsOpen(false)}
              appointmentData={currentData}
            ></AppointmentModal>
          </ul>
        ) : (
          <NoAppointment />
        )}
      </>
    );
  }
  if (dataDesc?.length > 0) {
    return (
      <>
        <div className="filter-container">
          <div className="filter-option">
            <fieldset className="fieldset">
              <legend>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1em" }}
                >
                  Filter Products <VscFilter />
                </div>
              </legend>
              <div className="filterProduct">
                <h4>Sort By Appointment Date</h4>
                <label>
                  <input type="radio" id="AZ" ref={oldestRef} name="name" />
                  <span>Oldest - Newest</span>
                </label>
                <label>
                  <input type="radio" id="AZ" ref={newestRef} name="name" />
                  <span>Newest - Oldest</span>
                </label>
              </div>
              <div className="filterProduct">
                <h4>Today's Appointment</h4>
                <label>
                  <input type="radio" id="AZ" ref={filterRef} name="name" />
                  <span>Filter Today's Appointment</span>
                </label>
              </div>
              <span className="filter-product-btn" onClick={handleClick}>
                <VscFilter className="style-icon" />
                <span className="apply-btn-product">Apply</span>
              </span>
            </fieldset>
          </div>
        </div>
        {dataDesc?.length > 0 ? (
          <ul className="responsive-table">
            <li className="table-header">
              <div className="col col-1">Name:</div>
              <div className="col col-2">Email:</div>
              <div className="col col-3">Appointment Date:</div>
              <div className="col col-3">Appointment Time:</div>
            </li>
            {dataDesc.map((x, index) => {
              return (
                <div
                  key={index}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <li
                    className="table-row hover-effect"
                    onClick={() => {
                      setIsOpen(true);
                      setCurrentData(x);
                    }}
                  >
                    <div className="col col-1" data-label="Name:">
                      {x.name}
                    </div>
                    <div
                      className="col col-2"
                      data-label="Email:"
                      style={{ textTransform: "lowercase" }}
                    >
                      {x.email}
                    </div>
                    <div className="col col-3" data-label="Appointment Date:">
                      {x.date}
                    </div>
                    <div className="col col-3" data-label="Appointment Time:">
                      {x.time}
                    </div>
                  </li>
                  <span
                    onClick={() => go(x._id)}
                    style={{
                      margin: "1em",
                      color: "#00bbc0",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Visit Profile
                  </span>
                </div>
              );
            })}

            <AppointmentModal
              open={isOpen}
              onClose={() => setIsOpen(false)}
              appointmentData={currentData}
            ></AppointmentModal>
          </ul>
        ) : (
          <NoAppointment />
        )}
      </>
    );
  }

  return (
    <>
      <div className="filter-container">
        <div className="filter-option">
          <fieldset className="fieldset">
            <legend>
              <div
                style={{ display: "flex", alignItems: "center", gap: "1em" }}
              >
                Filter Products <VscFilter />
              </div>
            </legend>
            <div className="filterProduct">
              <h4>Sort By Appointment Date</h4>
              <label>
                <input type="radio" id="AZ" ref={oldestRef} name="name" />
                <span>Oldest - Newest</span>
              </label>
              <label>
                <input type="radio" id="AZ" ref={newestRef} name="name" />
                <span>Newest - Oldest</span>
              </label>
            </div>
            <div className="filterProduct">
              <h4>Today's Appointment</h4>
              <label>
                <input type="radio" id="AZ" ref={filterRef} name="name" />
                <span>Filter Today's Appointment</span>
              </label>
            </div>
            <span className="filter-product-btn" onClick={handleClick}>
              <VscFilter className="style-icon" />
              <span className="apply-btn-product">Apply</span>
            </span>
          </fieldset>
        </div>
      </div>
      {appointmentData && appointmentData.length > 0 ? (
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-1">Name:</div>
            <div className="col col-2">Email:</div>
            <div className="col col-3">Appointment Date:</div>
            <div className="col col-3">Appointment Time:</div>
          </li>
          {appointmentData.map((x, index) => {
            return (
              <div
                key={index}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <li
                  className="table-row hover-effect"
                  onClick={() => {
                    setIsOpen(true);
                    setCurrentData(x);
                  }}
                >
                  <div className="col col-1" data-label="Name:">
                    {x.name}
                  </div>
                  <div
                    className="col col-2"
                    data-label="Email:"
                    style={{ textTransform: "lowercase" }}
                  >
                    {x.email}
                  </div>
                  <div className="col col-3" data-label="Appointment Date:">
                    {x.date}
                  </div>
                  <div className="col col-3" data-label="Appointment Time:">
                    {x.time}
                  </div>
                </li>
                <span
                  onClick={() => go(x._id)}
                  style={{
                    margin: "1em",
                    color: "#00bbc0",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Visit Profile
                </span>
              </div>
            );
          })}

          <AppointmentModal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            appointmentData={currentData}
          ></AppointmentModal>
        </ul>
      ) : (
        <NoAppointment />
      )}
    </>
  );
};

export default Filter;
