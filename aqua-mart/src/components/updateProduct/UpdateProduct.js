import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import { useCookies } from "react-cookie";

function UpdateProduct() {
  const { id } = useParams();

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [productInfo, setProductInfo] = useState();

  const storedCategoriesDataString = localStorage.getItem("categories");
  const CategoriesInfo = JSON.parse(storedCategoriesDataString);
  const [newImage, setNewImage] = useState(null);
  console.log(id);

  const handleImageChange = (e) => {
    const newImageFile = e.target.files[0];
    setNewImage(newImageFile);
    console.log(newImage);
    console.log(newImageFile);
  };

  const handleInputChange = (fieldName, value) => {
    setProductInfo((prevInfo) => ({
      ...prevInfo,
      [fieldName]: value,
    }));
    console.log(productInfo);
  };

  //******************** */
  // TO Get product Information
  /************************ */
  const getProductOne = () => {
    console.log("Inside");
    axios
      .get(`/product/get/${id}`, {
        headers: { "Content-Type": "application/json", token: cookies.token },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.content.product);
        setProductInfo(response.data.content.product);
        // navigate("/productdetails");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getProductOne();
  }, [id]);

  /***********
   * Update Product Information
   */
  const UpdateProductById = () => {
    axios
      .post(
        "product/update",
        {
          id: productInfo.id,
          title: productInfo.title,
          brand: productInfo.brand,
          description: productInfo.description,
          cost: productInfo.cost,
        },
        {
          headers: { "Content-Type": "application/json", token: cookies.token },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="update-product">
      <h3>Update Product Infomation</h3>
      {productInfo !== undefined && (
        //   console.log(">>>", productInfo.title)
        <div className="product">
          <div className="product_input">
            <label>Product Title</label>
            <input
              type="text"
              value={productInfo.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
          </div>
          <div className="product_input">
            <label>Product Brand</label>
            <input
              type="text"
              value={productInfo.brand}
              onChange={(e) => handleInputChange("brand", e.target.value)}
            />
          </div>
          <div className="product_input">
            <select
              id="categories"
              className="w-100 mb-4"
              value={productInfo.category.id}
              onChange={(e) => handleInputChange("category", e.target.value)}>
              <option value={""} disabled>
                Select Category
              </option>
              {CategoriesInfo !== undefined &&
                CategoriesInfo.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="product_input">
            <label>Product Cost</label>
            <input
              type="text"
              value={productInfo.cost}
              onChange={(e) => handleInputChange("cost", e.target.value)}
            />
          </div>
          <div className="product_input">
            <label>Product Description</label>
            <input
              type="text"
              value={productInfo.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>
          <div className="product-input">
            {productInfo.images[0].url !== undefined && (
              <>
                <img
                  src={productInfo.images[0].url}
                  alt="Old Product Image"
                  className="old-product-image"
                />
                <label htmlFor="newImage">Upload new image:</label>
                <input
                  type="file"
                  id="newImage"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </>
            )}
          </div>
          <button onClick={UpdateProductById}>Update</button>
        </div>
      )}
      {/* <div className="product-input">
        <label>Product Title</label>
        <input type="text" value={productInfo.title} />
      </div>
      <div className="product-input">
        <label>Product Brand</label>
        <input type="text" value={productInfo.brand} />
      </div>
      <div className="product-input">
        <select id="categories" className="w-100 mb-4">
          <option value={""} disabled>
            Select Category
          </option>
          {CategoriesInfo !== undefined &&
            CategoriesInfo.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <div className="product-input">
        <label>Product Title</label>
        <input type="text" value={productInfo.title} />
            </div>*/}
    </div>
  );
}

export default UpdateProduct;
