import logo from "./logo.svg";
import "./App.css";
import Report from "./components/Report";
import SignIn from "./components/Login";
import React, { Component } from "react";

import { Outlet, Route, Routes } from "react-router-dom";
import MonthReport from "./components/MonthReport";
function App() {
  const WithNavbar = () => (
    <>
      <Routes>
        <Outlet/>
        <Route exact path="/report" element={<Report />} />
        <Route exact path="/monthreport/:id" element={<MonthReport />} />
      </Routes>
    </>
  );
  return (
    <>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route exact path="/report" element={<Report />} />
        <Route exact path="/monthreport/:id" element={<MonthReport />} />
      </Routes>
    </>
  );
}

export default App;
