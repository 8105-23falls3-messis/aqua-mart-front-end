import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login">
      <div className="login__warpper">
        <div className="login__title">
            <h2>Login</h2>
        </div>
        <div>
            <label>Emial:</label>
            <input type="text" />
        </div>
        <div>
            <label>Password:</label>
            <input type="password" />
        </div>
        <Link to={'/'}>
        <button>Sign In</button>
        </Link>
        <Link to={'/register'}>
        <a>Don't have an account?</a>
        </Link>
      </div>
    </div>
  );
}

export default Login;
