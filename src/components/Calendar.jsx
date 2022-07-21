import React, { useState, useEffect, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
export default function Calendar() {
  const [datereport, setDatereport] = React.useState([]);
  React.useEffect(() => {
    getApi();
  }, []);
  const getApi = (e) => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/stamp`)
      .then((res) => {
        console.log(res.data);
        setDatereport(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  const dateElement = datereport.map((date) => {
    if (date === null) {
      return <h1>ยังไม่มีข้อมูล</h1>;
    } else {
      return <h3 key={date.employess._id}>{date.employess[0].name}</h3>;
    }
  });
  return <div>{dateElement}</div>;
}

/* HIPGlobal
En:1
Verify:Card
Datetime:
IP:
SerailNumber:
Website:
 */
