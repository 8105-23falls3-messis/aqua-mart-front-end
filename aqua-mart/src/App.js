import React from "react";
// import { ReactDOM } from 'react';
import "./App.css";
// import {BrowserRouter} from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Login from "./components/login/Login";

import Footer from "./components/footer/Footer";
import AddProduct from "./components/addProduct/AddProduct";
import ProductList from "./components/productList/ProductList";
import Features from "./components/features/Features";
import Register from "./components/register/Register";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import ProductPage from "./components/productPage/ProductPage";
import Profile from "./components/ProfilePage/Profile";
import AddProduct0 from "./components/addProduct/AddProduct0";
import GetProducts from "./components/features/GetProducts";
import ProductByUser from "./components/myProduct/ProductByUser";
import UpdateProduct from "./components/updateProduct/UpdateProduct";


// import ImageSlider from "./components/home/ImageSlider";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            path="/editproduct/:id"
            element={
              <>
                <Header />
                <UpdateProduct/>
                <Footer />
              </>
            }
          />
          <Route
            path="/myproduct"
            element={
              <>
                <Header />
                <ProductByUser />
                <Footer />
              </>
            }
          />
          <Route
            path="/user"
            element={
              <>
                <Header />
                <Profile/>
                <Footer />
              </>
            }
          />
          <Route
            path="/productdetails"
            element={
              <>
                <Header />
                <ProductPage/>
                <Footer />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Header />
                <Contact />
                <Footer />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Header />
                <About />
                <Footer />
              </>
            }
          />
          <Route
            path="/list"
            element={
              <>
                <Header />
                {/* <Features />
                 */}
                 <GetProducts />
                <Footer />
              </>
            }
          />
          <Route
            path="/addproduct"
            element={
              <>
                <Header />
                {/* <AddProduct />
                 */}
                 <AddProduct0 />
                <Footer />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Header />
                <Register/>
                <Footer />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Header />
                <Login />
                <Footer />
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
