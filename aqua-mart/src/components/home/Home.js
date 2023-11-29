import React from "react";
import "../home/home.css";
import home_img from "../../images/7368089.jpg";
import { Link } from "react-router-dom";
// import ImageSlider from "./ImageSlider";
import logo from "../../images/Vista Logos/logo-transparent-png.png";
import axios from "../../axios";
import { useEffect } from "react";
import { useStateValue } from "../StateProvider";

function Home() {

  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    provinces();
    countries();
  }, [dispatch]);

  /***********
   PROVINCES
  ***********/
  async function provinces() {
    // e.preventDefault();
    try {
      const response = await axios.get("user/provinces", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      dispatch({ type: "PROVINCES", provinces: response.data.content });

      console.log("PROVINCES", response);
      // navigate("/register");
    } catch (err) {
      console.log(err);
    }
  }
  async function countries() {
    // e.preventDefault();
    try {
      const response = await axios.get("user/countries", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      dispatch({ type: "COUNTRIES", countries: response.data.content });

      console.log("COUNTRIES", response);
      // navigate("/register");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="home mx-auto p-3 flex lg:flex-row items-center justify-between gap-8">
      <div className="home__text w-full ">
        {/* <div className="logo">
          <img src={logo} alt="logo" />
        </div> */}
        <div className="home__text-inner">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-800 mb-3">
            This is Aqua-Mart
          </h1>
          <p className="home__text-para text-gray-700 text-sm md:text-base lg:text-lg">
            Aqua-Mart is to establish a global online marketplace for the
            aquaculture industry, facilitating the buying and selling of used
            equipment, materials, and items. This platform empowers aquaculture
            professionals, promotes industry sustainability, and enhances the
            user experience through efficient and secure transactions. Click
            below to learn more about us.{" "}
          </p>

          <Link to={"/about"}>
            <button className="btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Explore
            </button>
          </Link>
        </div>
      </div>
      <div className="home__img w-full">
        <img
          src={home_img}
          alt="home_img"
          className="w-full h-auto rounded-lg"
        />
      </div>
    </div>
  );
}

export default Home;
