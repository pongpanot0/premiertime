import logo from "./logo.svg";
import "./App.css";
import Report from "./components/Report";
import SignIn from "./components/Login";
import React, { Component } from "react";
import GuardedRoute from "./components/GuardedRoute";
import { Outlet, Route, Routes } from "react-router-dom";
import MonthReport from "./components/MonthReport";
import DatetoDate from "./components/DatetoDate";
import Reportbase from "./components/Reportbase";
function App() {
  const [isAutheticated, setisAutheticated] = React.useState(false);

  function login() {
    setisAutheticated(true);
    console.log("loggedInUser:" + isAutheticated);
  }

  return (
    <>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route exact path="/report" element={<Reportbase />} />
        <Route exact path="/monthreport/:id" element={<MonthReport />} />
        <Route exact path="/datetodate/:id/:date" element={<DatetoDate />} />
      </Routes>
    </>
  );
}

export default App;
