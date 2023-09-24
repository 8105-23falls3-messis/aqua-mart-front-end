import React from "react";
import "../footer/footer.css";
import { Link } from "react-router-dom";
import Wave from "react-wavify";

function Footer() {
  return (
    <div className="footer">
      <Wave
      className="wave"
        fill="#0099ff"
        paused={false}
        style={{ display: "flex", border: "0px solid"}}
        options={{
          height: 50,
          amplitude: 15,
          speed: 0.6,
          points: 5,
        }}
      />
      <div className="footer__main">
        <h3>
          Copyright © 2023–20XX PremiumSoft™ AquaMart Inc.{" "}
          <Link to={"/rights"}>All Rights Reserved.</Link>
        </h3>
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
