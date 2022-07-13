import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import axios from "../../axios";
import startOfWeek from "date-fns/startOfWeek";
import { useAuth } from "../../context/AuthContext";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import TextField from "@material-ui/core/TextField";

import "./Medical/success.css";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
const TextFieldComponent = (props) => {
  return <TextField {...props} disabled={true} />;
};
const getEvent = (data) => {
  const events = data.map((x) => {
    const startDate = new Date(x.date);
    const time = x.time.split(":")[0];
    startDate.setHours(time);

    const endDate = new Date(x.date);
    endDate.setHours(parseInt(time) + 1);

    return {
      title: "New Appointment",
      start: startDate,
      end: endDate,
    };
  });
  return events;
};
const AppointmentComponent = () => {
  const { userData, currentUser } = useAuth();
  const [slot, setSlot] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [successRemove, setSuccessRemove] = useState();
  const [removeDate, setRemoveDate] = useState();
  const [state, setState] = useState(true);
  const getMinDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    return date;
  };

  const [selectedDate, setSelectedDate] = useState(() => getMinDate());
  const [endDate, setEndDate] = useState(() => getMinDate());
  const [unavailable, setUnavailable] = useState();
  useEffect(() => {
    const getAppointment = async () => {
      const response = await axios.get(`/find-doctor/time/${userData}`, {
        headers: {
          Authorization: "Bearer " + currentUser,
        },
      });
      const events = getEvent(response.data[0]);

      if (response.data[1].length > 0) {
        const unavailable = {
          title: "Unavailable For Appointment",
          start: response.data[1][0],
          end: response.data[1][response.data[1].length - 1],
          allDay: true,
        };
        setSlot([...events, unavailable]);
      } else {
        setSlot([...events]);
      }

      setUnavailable(response.data[1]);
    };

    getAppointment();
  }, [state]);
  const getMaxDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 2);
    return date;
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    const startDate = new Date(selectedDate.toISOString().split("T")[0]);
    const end = new Date(endDate.toISOString().split("T")[0]);

    try {
      await axios.patch(`/appointment/unavailable/${userData}`, {
        startDate,
        endDate,
      });
      setSlot((prev) => {
        return [
          ...prev,
          {
            title: "Unavailable For Appointment",
            start: startDate,
            end: end,
            allDay: true,
          },
        ];
      });
      setSuccess("Date Added");
      setTimeout(() => {
        setSuccess();
      }, 3000);
      setState(!state);
    } catch (error) {
      setError("Your selected date is occupied, please check your schedule!");
      setTimeout(() => {
        setError();
      }, 3000);
    }
  };
  const handleRemoveEvent = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`/appointment/unavailable/${userData}`, {
        data: {
          removeDate,
        },
      });
      const list = unavailable.filter((x) => {
        return x !== removeDate;
      });
      setUnavailable(list);
      setRemoveDate();
      setSuccessRemove("Successfully Removed");
      setTimeout(() => {
        setSuccessRemove();
      }, 3000);
      setState(!state);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Schedule</h1>
      <div className="underline"></div>
      <div className="calendar">
        {slot && (
          <Calendar
            localizer={localizer}
            events={slot}
            startAccessor="start"
            defaultView="week"
            endAccessor="end"
            style={{ height: 500 }}
          ></Calendar>
        )}
        <div className="date">
          <form className="add-schedule-container" onSubmit={handleAddEvent}>
            <h3>Add Unavailable Dates</h3>
            <div className="underline"></div>
            {error && <p className="alert-primary">{error}</p>}
            {success && (
              <p className="alert-success" style={{ padding: "1em" }}>
                {success}
              </p>
            )}

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                InputProps={{
                  disableUnderline: true,
                }}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Select Start Date"
                value={selectedDate}
                minDate={getMinDate()}
                maxDate={getMaxDate()}
                autoOk={true}
                onChange={(date) => {
                  setSelectedDate(date);
                }}
                required
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                TextFieldComponent={TextFieldComponent}
              />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                InputProps={{
                  disableUnderline: true,
                }}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Select End Date"
                value={endDate}
                minDate={getMinDate()}
                maxDate={getMaxDate()}
                autoOk={true}
                onChange={(date) => {
                  setEndDate(date);
                }}
                required
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                TextFieldComponent={TextFieldComponent}
              />
            </MuiPickersUtilsProvider>
            <button onClick={handleAddEvent} className="btn green">
              Add Event
            </button>
          </form>

          <form onSubmit={handleRemoveEvent}>
            <h3 style={{ textAlign: "center" }}>Remove Date</h3>
            <div className="underline"></div>
            {successRemove && (
              <p className="alert-success" style={{ padding: "1em" }}>
                {successRemove}
              </p>
            )}
            <div className="select-box">
              <div className="select-box__current" tabIndex="1">
                <div className="select-box__value">
                  <input
                    className="select-box__input"
                    type="radio"
                    id="0"
                    value="1"
                    name="Ben"
                    defaultChecked="checked"
                  />
                  <p className="select-box__input-text">{removeDate}</p>
                </div>

                <img
                  className="select-box__icon"
                  src="http://cdn.onlinewebfonts.com/svg/img_295694.svg"
                  alt="Arrow Icon"
                  aria-hidden="true"
                />
              </div>
              <ul className="select-box__list">
                {unavailable?.map((time, index) => {
                  return (
                    <li key={index} onClick={() => setRemoveDate(time)}>
                      <label
                        className="select-box__option"
                        htmlFor="0"
                        aria-hidden="aria-hidden"
                      >
                        {time}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1em",
              }}
            >
              <button className="btn green" onClick={handleRemoveEvent}>
                Remove
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AppointmentComponent;
