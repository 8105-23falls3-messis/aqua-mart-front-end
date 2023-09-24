import React from "react";
// import { ReactDOM } from 'react';
import "./App.css";
// import {BrowserRouter} from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Footer from "./components/footer/Footer";
import AddProduct from "./components/addProduct/AddProduct";
// import ImageSlider from "./components/home/ImageSlider";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/addproduct" element={<><Header /><AddProduct /><Footer /></>} />
          <Route path="/register" element={<><Header /><Register /><Footer /></>} />
          <Route path="/login" element={<><Header /><Login /><Footer /></>} />
          <Route path="/" element={<><Header /><Home /><Footer /></>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
