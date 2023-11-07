import React from "react";
import "../footer/footer.css";
import { Link } from "react-router-dom";
import Wave from "react-wavify";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__main">
        <h4>
          Copyright © 2023 PremiumSoft™ AquaMart Inc.
        </h4>
        <div className="links">
          <Link to={"home"}>Home</Link>
          <Link to={"About"}>About</Link>
          <Link to={"contact"}>Contact</Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
