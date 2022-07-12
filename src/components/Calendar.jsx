import React, { useState,useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import axios from "axios";
import interactionPlugin from "@fullcalendar/interaction"
import esLocale from '@fullcalendar/core/locales/th'
export default function Calendar() {
    const calendarRef = useRef()
  const [date, setDate] = useState([]);
  const [alert, setAlert] = React.useState(false);
  useEffect(() => {
    HandleDatesSet()
  }, []);
  const onClick = () => {
   setAlert(true);
  }
  const HandleDatesSet = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/getDate`)
      .then((res) => {
        console.log(res.data);
        setDate(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <section>
      <FullCalendar
      ref={calendarRef}
        events={date}
        dateClick={onClick}
        plugins={[dayGridPlugin,interactionPlugin]}
        initialView="dayGridMonth"
        locale={esLocale}
        datesSet={(date)=>HandleDatesSet(date)}
      />
            {alert ? (
        <h1>hello</h1>
      ) : (
        <></>
      )}
    </section>
  );
}

/* HIPGlobal
En:1
Verify:Card
Datetime:
IP:
SerailNumber:
Website:
 */