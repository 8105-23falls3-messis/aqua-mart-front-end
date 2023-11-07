import React, { useEffect, useState } from "react";
import "../login/login.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/Vista Logos/logo-transparent-png.png";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import AuthService from "../AuthService";
import { useStateValue } from "../StateProvider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{ user }, dispatch] = useStateValue();

  const navigate = useNavigate();
  // console.log(user, "Dispatch Function: ", dispatch);
  // console.log("USER NAME & PASSWORD ", email, password);

  //Login
  const handleLogin = async () => {
    const { resData } = await AuthService.login(email, password, 1);

    if (resData.success) {
      console.log(resData.token);
      console.log(resData.msg, resData.user, resData.usermail);
      // Update your app's state to indicate the user is logged in
      dispatch({ type: "LOGIN", user: resData.user, token: resData.token });
      // const item = JSON.stringify(token[0][1]);
      // console.log(item);
      navigate("/list");

      // Redirect to a protected route or perform other actions
    } else {
      // Login failed
      console.error("Login failed:", error);
      // Handle login failure, show an error message, etc.
    }
  };
  //******************* */

  return (
    <div className="login">
      <div className="login__wrapper">
        <div className="login__logo">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <p>
            Welcome to <span className="color_change">AQUAMART</span>
          </p>
        </div>
        <form>
          <div className="login__form">
            <div className="login__input">
              <PersonIcon className="icon" />
              <input
                aria-label="username"
                type="text"
                value={email}
                placeholder="username"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login__input">
              <LockIcon className="icon" />
              <input
                aria-label="password"
                type="password"
                value={password}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* <Link className="cursor login-btn"> */}
            <a onClick={handleLogin} className="cursor login-btn">Sign In</a>
            {/* </Link> */}
            <div className="dont_have_acc">
              <Link to={"/register"}>
                <p>Don't have an account?</p>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
