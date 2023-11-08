import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useStateValue } from "../StateProvider";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import axios from "../../axios";
// import axiosInstance from "../../axios";
// import { useStateValue } from "../StateProvider";
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import "../header/header.css";

function Header() {
  const [toggle, setToggle] = useState(false);
  const handleClick = () => setToggle(!toggle);
  const [options, setOptions] = useState("");
  const [{ user, token, userId}, dispatch] = useStateValue();

  const navigate = useNavigate();

  // const getRoles = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.get("/user/roles", {
  //       headers: { "Content-Type": "application/json" },
  //       withCredentials: true,
  //     });
  //     console.log(response.data);
  //     //   console.log(response.accessToken);
  //     console.log(JSON.stringify(response));

  //     //clear the input field
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // const [{user}, dispatch] = useStateValue();

  // console.log(user);
  //   axios.get('http://18.226.27.5:8081/user/login').then((response)=>{
  //     console.log(response.data);
  //   })
  //   .catch((error)=>{
  //     console.log("Req Failed: ", error);
  //   })
  const onSelectOption = (e) => {
    setOptions(e.target.value);
  };

  // console.log(options);

  const logOut = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/user/logOut",
        JSON.stringify({
          token: token
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      dispatch({ type: "LOGIN", user: null, userId: null, token: null });
      console.log("Log out success!")
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(userId);
  const getUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `/user/userProfile?userId=${userId}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      dispatch({ type: "USER",  details: response.data.content});

      console.log(response);
      navigate("/user");
    } catch (err) {
      console.log(err);
    }
  };
    // "email":"amirpashamughal56@hotmail.com",
    // "password":"123456",
    

  return (
    <div className="h-[80px] z-10 bg-slate-900 drop-shadow-lg">
      <div className="px-4 flex justify-between items-center w-full h-full">
        {/* px-2 = padding: 0 0.5rem */}
        <div className="flex items-center">
          <Link to={"/"}>
            <h1 className="text-3xl font-bold mr-4 sm:text-4xl text-white">
              AquaMart.
            </h1>
          </Link>
          <ul className="hidden text-white text-xl md:flex items-center">
            {/* {user &&  <Link to={"/"}>
              <li className="cursor-pointer hover:text-sky-400">Home</li>
            </Link>} */}
            <Link to={"/"}>
              <li className="cursor-pointer link">Home</li>
            </Link>
            <Link to={"/about"}>
              <li className="cursor-pointer link">About</li>
            </Link>

            <Link to={"/contact"}>
              <li className="cursor-pointer link">Contact</li>
            </Link>

            {user && (
              <>
              <Link to={"/addProduct"}>
                <li className="cursor-pointer link">Add Item</li>
              </Link>
              <Link to={"/list"}>
                <li className="cursor-pointer link">List</li>
              </Link>
              </>
            )}

            {/* <Link to={"/addproduct"}>
              <li
                className={
                  options === "sell"
                    ? "cursor-pointer hover:text-sky-400"
                    : "hidden"
                }>
                Add Product
              </li>
            </Link> */}
            {/* <li>
              <select
                className="w-19 font-medium text-lg outline-none border-none text-white focus:border-none bg-transparent"
                onChange={onSelectOption}
                value={options}>
                <option className="bg-slate-900" value="sell">
                  Sell
                </option>
                <option className="bg-slate-900" value="buy">
                  Buy
                </option>
              </select>
            </li> */}
          </ul>
        </div>
       
        {!user ? (
          <div className="hidden md:flex items-center pr-4">
            {/* only shows when user not logged or sign up */}
            <Link to={"/login"}>
              <button className="border-none bg-transparent text-white">
                Sign In
              </button>
            </Link>

            <Link to={"/register"}>
              <button className="sign-up">Sign up</button>
            </Link>
          </div>
        ) : (
          <div className="userFunctions">
             <div className="userProfile">
              <Link onClick={getUser}>
            <AccountCircleIcon className="profileIcon"/>
            {user && <span>{user}</span>}
              </Link>
        </div>
          <button onClick={logOut} className="sign-up">
            Sign Out
          </button>
            </div>
        )}

        <div
          className="md:hidden cursor-pointer bg-sky-400"
          onClick={handleClick}>
          {!toggle ? (
            <MenuIcon className="!w-10 !h-10 bg-white" />
          ) : (
            <CloseIcon className="!w-10 !h-10" />
          )}
        </div>
      </div>
      <ul
        className={
          !toggle ? "hidden" : "absolute text-white bg-gray-800 w-full px-8"
        }>
        <li className="border-b-2 border-gray-900 w-full">About</li>
        <li className="border-b-2 border-gray-900 w-full">Home</li>
        <li className="border-b-2 border-gray-900 w-full">Lists</li>
        <li className="border-b-2 border-gray-900 w-full">Contact</li>
        <div className="flex flex-col my-4">
          <button className="bg-transparent text-sky-500 px-8 py-3 mb-4">
            Sign In
          </button>
          <button className="px-8 py-3"> Sign Up </button>
        </div>
      </ul>
    </div>
  );
}

export default Header;
