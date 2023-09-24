import React, { useEffect, useState } from "react";
import "../login/login.css";
import { Link } from "react-router-dom";
import logo from "../../images/Vista Logos/logo-transparent-png.png";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  console.log("USER NAME & PASSWORD ", username, password);
  return (
    <div className="login">

      <div className="login__wrapper">
        <div className="login__logo">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <p>Welcome to <span className="color_change">AQUAMART</span></p>
        </div>

        <div className="login__form">
          <div className="login__input">
            <PersonIcon className="icon" />
            <input
              type="text"
              value={username}
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="login__input">
            <LockIcon className="icon" />
            <input
              type="password"
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="keepSignIn">
            <input type="checkbox" />
            Keep Me Logged In
          </div>
          <Link className="btn cursor" to={"/"}>
            <a className="cursor">Login</a>
          </Link>
          <div className="dont_have_acc">
            
            <Link to={"/register"}>
              <p>Don't have an account?</p>
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
