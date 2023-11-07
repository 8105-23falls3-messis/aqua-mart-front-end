import React, { useEffect, useRef, useState } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../register/register.css";
import { Link } from "react-router-dom";
import { use } from "i18next";
// import logo from "../../images/Vista Logos/logo-transparent-png.png";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-99_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PHONE_REGEX =
/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const EMAIL_REGEX =  /^ [a-zA-Z0-9._-]+@ [a-zA-Z0-9.-]+. [a-zA-Z] {2,4}$/;

function Register() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);
  const [PhoneFocus, setPhoneFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [EmailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PHONE_REGEX.test(phone);
    console.log(result);
    console.log(phone);
    setValidPhone(result);
  }, [phone]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  return (
    <div className="register">
      <div className="err">
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive">
          {errMsg}
        </p>
      </div>
      <div className="register__title">
        <h2>Create an account</h2>
      </div>

      <form>
        <div className="register__warpper">
          <div className="register__label">
            <label htmlFor="name">
              First Name:
              <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !user ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="name"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
           <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }>
              <FontAwesomeIcon icon={faInfoCircle} />
              4 To 24 Chars. <br />
              Must begin with a letter. <br />
              Letters, nums, underscore, hyphens allowed.
            </p>
          </div>
          <div className="register__label">
            <label htmlFor="phone">
              Phone:
              <span className={validPhone ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPhone || !phone ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="phone"
              // ref={userRef}
              autoComplete="off"
              onChange={(e) => setPhone(e.target.value)}
              required
              aria-invalid={validPhone ? "false" : "true"}
              aria-describedby="phonenote"
              onFocus={() => setPhoneFocus(true)}
              onBlur={() => setPhoneFocus(false)}
            />
            <p
              id="phonenote"
              className={
                PhoneFocus && phone && !validPhone ? "instructions" : "offscreen"
              } >
              <FontAwesomeIcon icon={faInfoCircle} />
              10 or 12 nums. <br />
              no letters. <br />
              only nums and +(sign).
            </p>
          </div>

          <div className="register__label">
            <label>Middle Name: </label>
            <input type="text" />
          </div>

          <div className="register__label">
            <label>Last Name:</label>
            <input type="text" />
          </div>

          <div className="register__label">
            <label htmlFor="email">
              Email:
              <span className={validEmail ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validEmail || !email ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="email"
              id="email"
              // ref={userRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="emailnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <p
              id="emailnote"
              className={
                EmailFocus && email && !validEmail ? "instructions" : "offscreen"
              } >
              <FontAwesomeIcon icon={faInfoCircle} />
              email <br />
              Must begin with a letter. <br />
              Letters, nums, underscore, hyphens allowed.
            </p>
          </div>
          
          <div className="register__label">
            <label>Company(Optional):</label>
            <input type="text" />
          </div>
          <div className="register__label">
            <label>Address:</label>
            <input type="text" />
          </div>
          <div className="register__label">
            <label>Password:</label>
            <input type="password" />
          </div>
          <div className="register__label">
            <label>Re-Type Password:</label>
            <input type="password" />
          </div>
          <div className="links">
            <Link to={"/"} className="register__signup">
              <a>Sign Up</a>
            </Link>
            <Link to={"/login"} className="register__signup">
              <a>Sign In</a>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
