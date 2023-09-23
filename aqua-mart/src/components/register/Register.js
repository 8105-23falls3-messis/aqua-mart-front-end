import React from "react"
import "../register/register.css";
import { Link } from "react-router-dom";
import logo from "../../images/Vista Logos/logo-transparent-png.png";


function Register() {
    return (
        <div className="register">
            <div className="register__warpper">
                <div className="register__title">
                    <h2>Create an account</h2>
                </div>
                <div className="label">
                    <label>Name:</label>
                    <input type="text" />
                </div>
                <div className="label">
                    <label>Phone:</label>
                    <input type="phone" />
                </div>
                <div className="label">
                    <label>Emial:</label>
                    <input type="Email" />
                </div>
                <div className="label">
                    <label>Company(Optional):</label>
                    <input type="text" />
                </div>
                <div className="label">
                    <label>Address:</label>
                    <input type="Address" />
                </div>
                <div className="label">
                    <label>Password:</label>
                    <input type="password" />
                </div>
                <div className="label">
                    <label>Re-Type Password:</label>
                    <input type="password" />
                </div>
                <Link to={'/'} className="btn cursor">
                    <a className="login">Sign Up</a>
                </Link>
                <Link to={'/login'} className="btn cursor">
                    <a className="login">Sign In</a>
                </Link>
            </div>
        </div>
    )
}

export default Register