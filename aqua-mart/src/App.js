import React from "react";
// import { ReactDOM } from 'react';
import "./App.css";
// import {BrowserRouter} from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

function App() {
  return (
    <div className="app">
      <Router>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
