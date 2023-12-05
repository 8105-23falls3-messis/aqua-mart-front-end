import React from "react";
import { useStateValue } from "../StateProvider";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../../axios";
import { useCookies } from "react-cookie";
function ProductByUser() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [{}, dispatch] = useStateValue();
  const [user, setUser] = useState();
  const [userProducts, setUserProducts] = useState();

  const storedUserDataString = localStorage.getItem("user");
  const userInfo = JSON.parse(storedUserDataString);

  //   console.log(userInfo.id);
  const getProductByUser = async () => {
    axios
      .get(`/product/get/${userInfo.id}`, {
        headers: { "Content-Type": "application/json", "token": cookies.token },
        withCredentials: true,
      })
      .then((response) => {
        const fetchedProducts = response.data.content.product;
        console.log(fetchedProducts);
        setUserProducts(fetchedProducts);
        localStorage.setItem("ProductByUser", JSON.stringify(fetchedProducts));
        dispatch({ type: "ProductByUser", productByUser: fetchedProducts });
        // navigate("/productdetails");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getProductByUser();
  }, []);
  return (
    <>
      <div>My Product
        {userProducts === null ? <h2>There is no product here...</h2> : <>
        Products
        </>}
      </div>
      
    </>
  );
}

export default ProductByUser;
