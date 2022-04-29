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
  // const d = new Date("2022-04-29");
  // d.setHours(10); //use sethour
  // const end = new Date("2022-04-29");
  // end.setHours(11);
};
const AppointmentComponent = () => {
  const { userData, currentUser } = useAuth();
  const [slot, setSlot] = useState();
  const [error, setError] = useState();
  const [time, setTime] = useState("");
  const getMinDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    return date;
  };
  // const disableDates = (date) => {
  //   return (
  //     date.getDay() === 0 || slot.includes(date.toISOString().split("T")[0])
  //   );
  // };
  const [selectedDate, setSelectedDate] = useState(() => getMinDate());
  const [endDate, setEndDate] = useState(() => getMinDate());
  useEffect(() => {
    const getAppointment = async () => {
      const response = await axios.get(`/find-doctor/time/${userData}`, {
        headers: {
          Authorization: "Bearer " + currentUser,
        },
      });
      const events = getEvent(response.data[0]);

      const unavailable = {
        title: "Unavailable For Appointment",
        start: response.data[1][0],
        end: response.data[1][response.data[1].length - 1],
        allDay: true,
      };
      setSlot([...events, unavailable]);
    };

    getAppointment();
  }, []);
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
    } catch (error) {
      setError("Your selected date is occupied, please check your schedule!");
      console.log(error);
    }
  };

  return (
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
      <form className="add-schedule-container" onSubmit={handleAddEvent}>
        <h3>Add Unavailable Dates</h3>
        <div className="underline"></div>
        {error && <p className="alert-primary">{error}</p>}
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
              setTime();
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
              setTime();
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
    </div>
  );
};

export default AppointmentComponent;
