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
  const [role, setRole] = useState("");
  const [{ user }, dispatch] = useStateValue();

  const navigate = useNavigate();
  // console.log(user, "Dispatch Function: ", dispatch);
  // console.log("USER NAME & PASSWORD ", email, password);

  // console.log(response);
  //Login
  const handleLogin = async () => {
    const { resData } = await AuthService.login(email, password, 2);
    if (resData.success) {
      // console.log(resData.response.data.content.user);
      console.log(resData.response.data.content.user.id);
      // console.log(resData.token);
      // console.log(resData.msg, resData.user, resData.usermail);
      // Update your app's state to indicate the user is logged in
      dispatch({
        type: "LOGIN",
        user: resData.user,
        token: resData.token,
        userId: resData.response.data.content.user.id,
      });
      // const item = JSON.stringify(token[0][1]);
      // console.log(item);
      navigate("/list");

      // Redirect to a protected route or perform other actions
    } else {
      // Login failed
      console.error("Login failed:");
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

        <div className="login__form">
          <div className="login__input">
            <PersonIcon className="icon" />
            <input
              type="text"
              value={email}
              placeholder="username"
              onChange={(e) => setEmail(e.target.value)}
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
          {/* <div className="login__input">
            <select
              id="countries"
              size="lg"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}>
              <option selected>Choose a Role</option>

              <option value="2">Buyer</option>
              <option value="1">Seller</option>
            </select>
          </div> */}
          <div className="keepSignIn">
            <input type="checkbox" />
            Keep Me Logged In
          </div>
          <Link className="login-btn cursor">
            <a className="cursor" onClick={handleLogin}>
              Login
            </a>
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
