import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../home/imageSlider.css";
import img1 from "../../images/7368089.jpg";
import img2 from "../../images/53519.jpg";

function ImageSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };
  return (
    <div className="container">
      
      <div className="left">
        <h2 className="title"> Single Item</h2>
      </div>

      <div className="right">
        <Slider {...settings} className="slider">
          <div className="img__holder">
            <img src={img1} alt="jk" />
          </div>
          <div className="img__holder">
            <img src={img2} alt="jk" />
          </div>
          <div className="img__holder">
            <img src={img1} alt="jk" />
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default ImageSlider;
