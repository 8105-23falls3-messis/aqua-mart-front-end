import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

let images;
let imagenesArray = [];

function UpdateProduct() {
  const { id } = useParams();

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [productInfo, setProductInfo] = useState();

  const storedCategoriesDataString = localStorage.getItem("categories");
  const CategoriesInfo = JSON.parse(storedCategoriesDataString);
  const [newImage, setNewImage] = useState(null);
  console.log(id);
  const navigate = useNavigate();

  const handleChangeFile = async (e) => {
    debugger;
    const fileList = e.target.files; // This gives you the FileList

    const formData = new FormData();

    const fileArray = Array.from(fileList).map((file, index) => ({
      fileName: file.name,
      type: file.type,
      cover: index === 0,
    }));

    images = fileArray;

    for (let j = 0; j < fileList.length; j++) {
      formData.append("files", fileList[j]);
    }
    try {
      const response = await axios.post("image/upload", formData, {
        headers: { "Content-Type": "multipart/form-data", token: cookies.token },
        withCredentials: true,
      });
      console.log(images);
      console.log(response);

      createImage(response);
    } catch (err) {
      console.log(err);
    }
  };


  function createImage(response) {
    const miImagen = null;

    for (let i = 0; i < response.data.content.length; i++) {
      const miImagen = new Object();
      miImagen.fileName = response.data.content[i].fileName;
      miImagen.contenType = response.data.content[i].contenType;
      miImagen.url = response.data.content[i].url;

      imagenesArray[i] = miImagen;
    }
  }

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
  const UpdateProductById = async (e)=> {
let updateImage;
/*     if (imagenesArray.length==0){
      updateImage=imagenesArray;
    }else{
      updateImage=null;
    } */

    e.preventDefault();
    try {
      const response = await axios
      .put(
        "/product/update",
        JSON.stringify({
          id:productInfo.id,
          title: productInfo.title,
          brand: productInfo.brand,
          cost: productInfo.cost,
          description: productInfo.description,
          category: {
            id: productInfo.category,
          },
          images: imagenesArray,
   
        }),
        {
          headers: { "Content-Type": "application/json", token: cookies.token },
          withCredentials: true,
        }
      );

      console.log(response);
      if (response.status === 200) {
        fetchAndUpdateProductData();
        console.log("Product Updated successfully");
      } else {
        // Handle other scenarios
        console.log("failed to Update product");
      }
      //clear the input field
    } catch (err) {
      console.log("Registration failed:", err);
    }
  };

  const fetchAndUpdateProductData = async () => {
    try {
      const response = await axios.post(
        "product/products",
        {
          condition1: null,
          condition2: null,
          pageNum: 1,
          pageSize: 4,
        },
        {
          headers: { "Content-Type": "application/json", token: cookies.token },
          withCredentials: true,
        }
      );

      // Update the product state
      // setProduct(response.data.content);
      console.log("pRODUCTS IS BEING cALLED");

      // Update local storage
      localStorage.setItem("product", JSON.stringify(response.data.content));
      navigate("/list");
    } catch (err) {
      console.log(err);
    }
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
              value={productInfo.category}
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
                  onChange={handleChangeFile}
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
