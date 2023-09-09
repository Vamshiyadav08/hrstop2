import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";


import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function MyCalender() {
  console.log("calender");
  const myEventsList = [
    {
      title: "Meeting with Client",
      start: new Date(2023, 8, 10, 1, 0), // Year, Month (0-11), Day, Hour, Minute
      end: new Date(2023, 8, 10, 24, 0),
    },
    {
      title: "Meeting with Client",
      start: new Date(2023, 8, 13, 1, 0),
      end: new Date(2023, 8, 13, 24, 0),
    },
    {
      title: "Meeting with Client",
      start: new Date(2023, 8, 16, 1, 0),
      end: new Date(2023, 8, 16, 24, 0),
    },
    {
      title: "Meeting with Client",
      start: new Date(2023, 8, 20, 1, 0),
      end: new Date(2023, 8, 20, 24, 0),
    },
    {
      title: "Meeting with Client",
      start: new Date(2023, 8, 25, 1, 0),
      end: new Date(2023, 8, 25, 24, 0),
    },
    {
      title: "Meeting with Client",
      start: new Date(2023, 8, 29, 1, 0),
      end: new Date(2023, 8, 29, 24, 0),
    },
  ];
 
  return (
    <div style={{margin:"2em"}}>
      <h3>Calender</h3>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}
