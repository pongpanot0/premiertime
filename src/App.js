import logo from './logo.svg';
import './App.css';
import Report from './components/Report';
import SignIn from './components/Login'
import React, { Component }  from 'react';

import { Route ,Routes } from 'react-router-dom';
import MonthReport from './components/MonthReport';
function App() {
  return (
    <Routes >
         <Route exact path="/" element={<SignIn/>} />
         <Route exact path="/report" element={<Report/>} />
         <Route exact path="/monthreport" element={<MonthReport/>} />
    </Routes>
  );
}

export default App;
