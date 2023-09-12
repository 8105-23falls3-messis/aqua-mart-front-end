import React from "react";
import "../login/login.css";
import { Link } from "react-router-dom";
import logo from "../../images/Vista Logos/logo-transparent-png.png";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from '@mui/icons-material/Lock';

function Login() {
  return (
    <div className="login">
        <div className="anime"></div>
      <div className="login__wrapper">
        <div className="login__logo">
            <div className="logo">
          <img src={logo} alt="logo" />
            </div>
          <p>Welcome to AQUAMART</p>
        </div>

        <div className="login__form">
          <div className="login__input">
            <PersonIcon className="icon"/>
            <input type="text" placeholder="username" />
          </div>
          <div className="login__input">
            <LockIcon className="icon"/>
            <input type="password" placeholder="password" />
          </div>

          <Link className="btn cursor" to={"/"}>
            <button className="cursor">Login </button>
          </Link>
          <Link to={"/register"}>
            <p>Don't have an account?</p>
          </Link>
        </div>
        
      </div>
      <svg
        className="wave"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320">
        <path
          fill="#0099ff"
          fillOpacity="1"
          d="M0,224L48,234.7C96,245,192,267,288,277.3C384,288,480,288,576,261.3C672,235,768,181,864,181.3C960,181,1056,235,1152,250.7C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
      
    </div>
  );
}

export default Login;
