import React from "react";
import "../home/home.css";
import home_img from "../../images/7368089.jpg";
// import ImageSlider from "./ImageSlider";

function Home() {
  return (
    <div className="home">
      <div className="home__text">
        <div className="home__text-inner">
          <h1 className="home__text-title">This is Aqua-Mart</h1>
          <p className="home__text-para">
            Sell or Buy things Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur.{" "}
          </p>
          <button className="btn">Explore</button>
        </div>
      </div>
      <div className="home__img">
        <img src={home_img} alt="home_img" />
      </div>

      
    </div>
  );
}

export default Home;
