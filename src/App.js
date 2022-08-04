import logo from "./logo.svg";
import "./App.css";
import SignIn from "./components/Login";
import React, { Component } from "react";
import {  Route, Routes } from "react-router-dom";
import MonthReport from "./components/MonthReport";
import DatetoDate from "./components/DatetoDate";
import Reportbase from "./components/Reportbase";
import { AuthProvider } from "./components/auth";
import { RequireAuth } from "./components/RequireAuth";
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route
          
          path="/report"
          element={
            <RequireAuth>
              <Reportbase />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/monthreport/:id"
          element={
            <RequireAuth>
              <MonthReport />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/datetodate/:id/:date"
          element={
            <RequireAuth>
              <DatetoDate />
            </RequireAuth>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
