import React from "react";
import { useStateValue } from "../StateProvider";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../../axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../myProduct/productByUser.css'
function ProductByUser() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [{}, dispatch] = useStateValue();
  const [user, setUser] = useState();
  const [userProducts, setUserProducts] = useState();
  const navigate = useNavigate();
  const storedUserDataString = localStorage.getItem("user");
  const userInfo = JSON.parse(storedUserDataString);

  //   console.log(userInfo.id);
  const getProductByUser = async () => {
    axios
      .get(`/product/getByUser/${userInfo.id}`, {
        headers: { "Content-Type": "application/json", token: cookies.token },
        withCredentials: true,
      })
      .then((response) => {
        const fetchedProducts = response.data.content.products;
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

  /**********
   * Delete
   *********/
  const deleteProduct = (id) => {
    axios
      .delete(`product/delete/${id}`, {
        headers: { "Content-Type": "application/json", token: cookies.token },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.content);
        // const fetchedProduct = response.data.content.product;
        navigate("/list");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /****
   * GetOne and Edit
   */
  const getProductOne = (id) => {
    axios
      .get(`/product/get/${id}`, {
        headers: { "Content-Type": "application/json", token: cookies.token },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.content.product);
        const fetchedProduct = response.data.content.product;
        localStorage.setItem("ProductById", JSON.stringify(fetchedProduct));
        dispatch({ type: "ProductById", productById: fetchedProduct });
        navigate("/updateproduct");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="myproducts-section">
       <h3>My Product</h3> 
        {userProducts === null ? (
          <h2>There is no product here...</h2>
        ) : (
          <div className="myproducts">
            {userProducts !== undefined &&
              userProducts.map((p) => {
                return (
                  <div key={p.id} className="product">
                    {/* {!p.images == null && ( */}
                    <div className="product_img">
                      {p.images[0].url !== undefined && (
                        <img src={p.images[0].url} alt="img" />
                      )}        
                    </div>
                    {/* )} */}
                    <div className="product_details">
                      <h3 className="product_details-title">{p.title}</h3>
                      <p className="product_details-description">
                        {p.description}
                      </p>
                      <h5 className="product_details-category">
                        {p.category.name}
                      </h5>
                      <span className="product_details-brand">{p.brand}</span>
                      <h3 className="product_details-cost">${p.cost}</h3>
                      <div className="">
                        <Link
                          to={`/editproduct/${p.id}`}
                          className="product_details-btn text-white">
                          Edit
                        </Link>
                        <a
                          onClick={() => deleteProduct(p.id)}
                          className="product_details-btn text-white">
                          Delete
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
}

export default ProductByUser;
