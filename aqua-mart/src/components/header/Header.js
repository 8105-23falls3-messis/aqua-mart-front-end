import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useStateValue } from "../StateProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios";

import "../header/header.css";

function Header() {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => setToggle(!toggle);

  const [{ setUser, setToken, userId, idRole, product }, dispatch] =
    useStateValue();

  const getUserInfo = () => {
    return localStorage.getItem("user");
  };
  const getToken = () => {
    return localStorage.getItem("token");
  };

  const userInfo = getUserInfo();
  const userInfoObj = JSON.parse(userInfo);
  // console.log("User", userInfoObj);

  const tokenInfo = getToken();
  const tokenObj = JSON.parse(tokenInfo);
  // console.log("Token", tokenInfo);
  // console.log("TokenOBJ", tokenObj);

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   const storedToken = localStorage.getItem("token");
  //   if (storedUser) {
  //     dispatch({ type: "SET_USER", storedUser: JSON.parse(storedUser) });
  //   }
  //   if (storedToken) {
  //     dispatch({ type: "SET_TOKEN", storedToken: JSON.parse(storedToken) });
  //   }
  // }, []);

  // console.log(storedUser, storedToken);

  const handleLinkClick = (path) => {
    setToggle(false);
    navigate(path);
    // console.log(path);
  };
  // console.log(options);

  /**************
  LOGOUT FUNCTION
  **************/
  const logOut = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/user/logOut",
        JSON.stringify({
          token: setToken,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("product");
      localStorage.removeItem("categories");
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("oneProduct");
      dispatch({ type: "USER_INFO", setUser: null });
      dispatch({ type: "USER_TOKEN", setToken: null });
      dispatch({ type: "LOGIN", user: null, userId: null, token: null });
      console.log("Log out success!");
      navigate("/");
      setToggle(false);
    } catch (err) {
      console.log(err);
    }
  };

  /***********
  USER PROFILE
  ***********/
  const getUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/user/userProfile?userId=${userId}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      dispatch({ type: "USER", details: response.data.content });

      console.log(response);
      navigate("/user");
    } catch (err) {
      console.log(err);
    }
  };

  // const getProvinces = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.get("user/provinces", {
  //       headers: { "Content-Type": "application/json" },
  //       withCredentials: true,
  //     });
  //     dispatch({ type: "PROVINCES", provinces: response.data.content });

  //     console.log(response);
  //     navigate("/register");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // console.log(storedToken);

  async function products() {
    e.preventDefault();
    try {
      const response = await axios.get(
        "product/products",
        // JSON.stringify({
        //   condition1: null,
        //   condition2: null,
        //   pageNum: 1,
        //   pageSize: 4
        // }),
        {
          headers: { "Content-Type": "application/json", token: setToken },
          withCredentials: true,
        }
      );

      // console.log("products are here!")
      // console.log(response);
      // navigate("/list");
    } catch (err) {
      console.log(err);
    }
  }

  const getProducts = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "product/products",
        // JSON.stringify({
        //   condition1: null,
        //   condition2: null,
        //   pageNum: 1,
        //   pageSize: 4
        // }),
        {
          headers: { "Content-Type": "application/json", token: setToken },
          withCredentials: true,
        }
      );
      try {
        const response = await axios.get("/product/categories", {
          headers: { "Content-Type": "application/json", token: setToken },
          withCredentials: true,
        });
        dispatch({ type: "PRODUCT", category: response.data.content });

        console.log(response.data.content);
        // navigate("/addproduct");
      } catch (err) {
        console.log(err);
      }
      // console.log("products are here!")
      // console.log(response);
      navigate("/list");
    } catch (err) {
      console.log(err);
    }
  };

  /*********
   CATEGORIES
  ***********/

  async function categories() {
    try {
      const response = await axios.get("/product/categories", {
        headers: { "Content-Type": "application/json", token: setToken },
        withCredentials: true,
      });
      dispatch({ type: "PRODUCT", category: response.data.content });

      console.log(response.data.content);
      navigate("/addproduct");
    } catch (err) {
      console.log(err);
    }
  }

  // const category = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.get("/product/categories", {
  //       headers: { "Content-Type": "application/json", token: setToken },
  //       withCredentials: true,
  //     });
  //     dispatch({ type: "PRODUCT", category: response.data.content });

  //     console.log(response.data.content);
  //     navigate("/addproduct");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // async function categories(){
  //   try {
  //     const response = await axios.get("/product/categories", {
  //       headers: { "Content-Type": "application/json", token: setToken },
  //       withCredentials: true,
  //     });
  //     dispatch({ type: "CATEGOTY", categories: response.data.content });

  //     console.log("Categories" ,response);
  //     // navigate("/addproduct");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (
    <div className="h-20 z-10 bg-slate-900 drop-shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between align-items-center h-full">
        {/* px-2 = padding: 0 0.5rem */}
        <div className="d-flex align-items-center">
          <Link to={"/"}>
            <h1 className="logo-title text-2xl sm:text-3xl font-bold text-white mr-6">
              AquaMart.
            </h1>
          </Link>
          <ul className="hidden desktop-menu mt-2 md:flex align-items-center space-x-4 text-white text-lg ">
            {/* {user &&  <Link to={"/"}>
              <li className="cursor-pointer hover:text-sky-400">Home</li>
            </Link>} */}
            {!setUser ? (
              <Link className="text-white" to={"/"}>
                <li className="link">Home</li>
              </Link>
            ) : (
              ""
            )}

            <Link
              className="text-white cursor-pointer hover:text-sky-400"
              to={"/about"}>
              <li className="link">About</li>
            </Link>

            <Link className="text-white" to={"/contact"}>
              <li className="link">Contact</li>
            </Link>

            {userInfoObj ? (
              <>
                <Link className="text-white" to={"/list"}>
                  <li className="link">List</li>
                </Link>
                {userInfoObj.idRole == 1 && (
                  <Link className="text-white" to={"/addproduct"}>
                    <li className="link">Add Item</li>
                  </Link>
                )}
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
        <div className="d-flex align-items-center justify-center gap-4">
          {!userInfoObj ? (
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
            <div className="userFunctions text-white shadow-md flex items-center">
              <div className="userProfile flex items-center">
                <Link
                  onClick={getUser}
                  className="flex items-center text-white">
                  <AccountCircleIcon className="profileIcon text-3xl" />
                  {userInfoObj && (
                    <span className="font-medium">{userInfoObj.firstName}</span>
                  )}
                </Link>
              </div>
              <button onClick={logOut} className="hidden md:block sign-up">
                Sign Out
              </button>
            </div>
          )}

          <div className="md:hidden">
            <button
              onClick={handleClick}
              className="p-2 text-white bg-sky-500 rounded">
              {!toggle ? <MenuIcon /> : <CloseIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* <div
          className="md:hidden cursor-pointer bg-sky-400"
          onClick={handleClick}>
          {!toggle ? (
            <MenuIcon className="!w-10 !h-10 bg-white" />
          ) : (
            <CloseIcon className="!w-10 !h-10" />
          )}
        </div>
      </div> */}

      {/* Mobile View */}
      <div
        className={`mobile-view absolute z-50 top-full left-0 w-full bg-gray-800 transition-transform ${
          toggle ? "translate-x-0" : "-translate-x-full"
        }`}>
        <ul
          // className={
          //   !toggle ? "hidden" : "absolute text-white bg-gray-800 w-full px-8"}
          className="text-white p-4">
          <li
            onClick={() => handleLinkClick("/")}
            className="border-b-2 border-gray-900 w-full">
            Home
          </li>

          <li
            onClick={() => handleLinkClick("/contact")}
            className="border-b-2 border-gray-900 w-full">
            Contact
          </li>

          <li
            onClick={() => handleLinkClick("/about")}
            className="border-b-2 border-gray-900 w-full">
            About
          </li>
          {userInfoObj ? (
            <>
              <li
                onClick={() => handleLinkClick("/list")}
                className="border-b-2 border-gray-900 w-full">
                Lists
              </li>
              {userInfoObj.idRole == 1 && (
                <li
                  onClick={() => handleLinkClick("/addproduct")}
                  className="border-b-2 border-gray-900 w-full">
                  Add Product
                </li>
              )}
            </>
          ) : (
            ""
          )}
          <div className="flex flex-col my-4">
            {!userInfoObj ? (
              <div className="flex items-center pr-4">
                {/* only shows when user not logged or sign up */}

                <button
                  onClick={() => handleLinkClick("/login")}
                  className="border-none bg-transparent text-white">
                  Sign In
                </button>

                <button
                  onClick={() => handleLinkClick("/register")}
                  className="sign-up">
                  Sign up
                </button>
              </div>
            ) : (
              <div className="userFunctions text-white shadow-md flex items-center">
                <button onClick={logOut} className="sign-up">
                  Sign Out
                </button>
              </div>
            )}
            {/* <button
              onClick={() => handleLinkClick("/login")}
              className="bg-transparent text-sky-500 px-8 py-3 mb-4">
              Sign In
            </button>
            <button
              onClick={() => handleLinkClick("/register")}
              className="px-8 py-3 w-full">
              {" "}
              Sign Up{" "}
            </button> */}
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Header;
