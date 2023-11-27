import React, { useEffect, useState } from "react";
import "../login/login.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/Vista Logos/logo-transparent-png.png";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import AuthService from "../AuthService";
import { useStateValue } from "../StateProvider";

function Login() {
  const [{ user }, dispatch] = useStateValue();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  
  //for Conditions
  const [login, setLogin] = useState(true);
  // const [checkRole, setCheckRole] = useState('');
  const [errors, setErros] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {

    if(!email || !password || !role){
      setErros(true);
      return;
    }else{
      setErros(false);
    }
    const { resData } = await AuthService.login(email, password, role);
    if (resData.success) {
      // console.log(resData.response.data.content.user);
      console.log(resData.response.data.content.user.id);
      console.log(resData.response.data.content.user);
      console.log("SetLogin", login);
      // console.log(resData.token);
      // console.log(resData.msg, resData.user, resData.usermail);
      // Update your app's state to indicate the user is logged in
      dispatch({
        type: "LOGIN",
        user: resData.user,
        token: resData.token,
        userId: resData.response.data.content.user.id,
        idRole: resData.response.data.content.user.idRole,
        details: resData.response.data.content.user,
      });
      console.log("token", resData.token);
      console.log("Details", resData.response.data.content.user);
      localStorage.setItem('user', JSON.stringify(resData.response.data.content.user));
      localStorage.setItem('token', JSON.stringify(resData.token));
      
      // dispatch({
        //   type: "USER",
        //   details: resData.data.content.user,
        // })
        // const item = JSON.stringify(token[0][1]);
        // console.log(item);
        navigate("/list");
        
        // Redirect to a protected route or perform other actions
      } else {
        setLogin(false);
        console.log("SetLogin", login);
        // Login failed
        console.error("Login failed:");
      // Handle login failure, show an error message, etc.
    }
  };
  //******************* */

  return (
    // <div className="login">
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
          {/* <div className="login__input"> */}
            <select
              id="countries"
              size="lg"
              class="bg-gray-50 border-solid border-black text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}>
              <option value="" disabled hidden>Choose a Role</option>

              <option value="2">Buyer</option>
              <option value="1">Seller</option>
            </select>
          {/* </div> */}
          {/* <div className="keepSignIn">
            <input type="checkbox" />
            Keep Me Logged In
          </div> */}
          
            <a className="text-white login-btn cursor hover:text-white hover:bg-black transition-all" onClick={handleLogin}>
              Login
            </a>
          
          <div className="dont_have_acc text-center">
            <Link to={"/register"}>
              <p className="mb-0">Don't have an account?</p>
            </Link>
          <p className={errors ? "error" : "hidden"}>Please enter your Credentials</p>
          {/* <div className={login ? "hideError" : "showError"}> */}
            <p className={login ? "hidden" : "error"}>Invalid username or password or role</p>
          {/* </div> */}
          </div>
        </div>
      </div>
    // </div>
  );
}

export default Login;
