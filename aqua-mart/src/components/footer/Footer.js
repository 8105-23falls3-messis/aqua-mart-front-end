import React from "react";
import "../footer/footer.css";
import { Link } from "react-router-dom";
import Wave from "react-wavify";

function Footer() {
  return (
   
      <div className="footer__main">
        <h4>Copyright © 2023 PremiumSoft™ AquaMart Inc.</h4>
        <div className="links">
          <Link to={"/"}>Home</Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/contact"}>Contact</Link>

          {/* <Link to={"/about"}> */}
        </div>
      </div>
   
  );
}

export default Footer;
