import React from "react";
import "../home/home.css";
import home_img from "../../images/7368089.jpg";
import { Link } from "react-router-dom";
// import ImageSlider from "./ImageSlider";
import logo from "../../images/Vista Logos/logo-transparent-png.png";

function Home() {
  return (
    <div className="home">
      <div className="home__text">
        {/* <div className="logo">
          <img src={logo} alt="logo" />
        </div> */}
        <div className="home__text-inner">
          <h1 className="home__text-title">This is Aqua-Mart</h1>
          <p className="home__text-para">
            Aqua-Mart is to establish a global online marketplace for the
            aquaculture industry, facilitating the buying and selling of used
            equipment, materials, and items. This platform empowers aquaculture
            professionals, promotes industry sustainability, and enhances the
            user experience through efficient and secure transactions. Click
            below to learn more about us.{" "}
          </p>

          <Link to={"/about"}>
            <button className="btn">Explore</button>
          </Link>
        </div>
      </div>
      <div className="home__img">
        <img src={home_img} alt="home_img" />
      </div>
    </div>
  );
}

export default Home;
