import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBSelect,
  MDBInput,
  MDBCheckbox,
  MDBFile,
} from "mdb-react-ui-kit";
import { Editor } from "@tinymce/tinymce-react";
import "../addProduct/addProduct.css";
import { useStateValue } from "../StateProvider";
import { type } from "@testing-library/user-event/dist/type";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Cookie } from "@mui/icons-material";
let images;
let imagenes=[];

function AddProduct0() {
  const navigate = useNavigate();
  const [{ details, token, setToken, setUser, category }, dispatch] =
    useStateValue();

  console.log(">>>>>", setToken, setUser);
  const [productName, setProductName] = useState();
  const [productBrand, setProductBrand] = useState();
  const [productCategory, setProductCategory] = useState();
  const [productPrice, setProductPrice] = useState();
  const [productDescription, setProductDescription] = useState();
  const [productImage, setProductImage] = useState();

  const inputRef = React.useRef();

  useEffect(() => {
    categories();
  }, [dispatch]);

  // Category
  async function categories() {
    try {
      const response = await axios.get("/product/categories", {
        headers: { "Content-Type": "application/json", token: setToken },
        withCredentials: true,
      });
      dispatch({ type: "PRODUCT", category: response.data.content });

      console.log("Categories", response);
      // navigate("/addproduct");
    } catch (err) {
      console.log(err);
    }
  }

  // let fileArray = [];
  //const [file, setFile] = useState(null);
  // console.log(details);
  const handleChangeFile = async (e) => {
    debugger;
    //setFile(e.target.files[0]);

    setProductImage(e.target.files);
    // console.log(inputRef.current.files);
    const fileList = e.target.files; // This gives you the FileList
    //setFile(e.target.files[0]);
    
    const formData = new FormData();
    //formData.append('files', fileList);

        // Append each file to the formData
        for (let j = 0; j < fileList.length; j++) {
          formData.append('files', fileList[j]);
        }
    try {
      const response = await axios.post(
        "image/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data", token: Cookie.token },
          withCredentials: true,
        }
      );
      console.log(images);
      console.log(response);

      createImage(response);
    } catch (err) {
      console.log(err);
    }
  };


  function createImage(response){
    const miImagen=null;

    for (let i=0; i<response.data.content.length; i++){
      const miImagen = new Object();
      miImagen.fileName = response.data.content[i].fileName;
      miImagen.contenType = response.data.content[i].contenType;
      miImagen.url = response.data.content[i].url;

      imagenes[i]=miImagen;
    }
  }

  

  // console.log(storedToken);
  // const images = productImage.map((element, index) => ({
  //   id: index, // Assuming you want to initialize all ids with 0
  //   fileName: element.name,
  //   type: element.type,
  //   url: "", // You need to define how you want to handle URLs
  //   product: "", // You need to define the product association
  // }));
  // console.log(storedUser);
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
          headers: { "Content-Type": "application/json", token: setToken },
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

  const handleSubmit = async (e) => {


    e.preventDefault();
    try {
      const response = await axios.post(
        "/product/add",
        JSON.stringify({
          title: productName,
          brand: productBrand,
          cost: productPrice,
          description: productDescription,
          category: {
            id: 2,
          },
          user: {
            id: setUser.id,
          },

          images: imagenes,
          active: true,
        }),
        {
          headers: { "Content-Type": "application/json", token: setToken },
          withCredentials: true,
        }
      );

      console.log(response);
      if (response.status === 200) {
        // Now trigger the API call
        fetchAndUpdateProductData();
        // navigate("/list");

        console.log("Product Added successfully");
      } else {
        // Handle other scenarios
        console.log("failed to add product");
      }
      //clear the input field
    } catch (err) {
      console.log("Registration failed:", err);
    }
  };

  return (
    <MDBContainer fluid className="addProduct">
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <form
          onSubmit={handleSubmit}
          className="d-flex justify-content-center align-items-center w-100">
          <MDBCol col="" className="">
            <MDBCard className="" style={{ borderRadius: "5" }}>
              <MDBCardBody className="text-center d-flex flex-col justify-center align-items-center">
                {/* <h2 className="addProduct-title">Add Product</h2> */}
                <MDBRow className="d-flex justify-center align-items-center ">
                  <MDBCol
                    md="6"
                    className="bg-blue d-flex justify-start align-items-start gap-5 w-100 h-100">
                    <MDBRow className="addproduct-container">
                      <MDBCol md="12">
                        <MDBInput
                          wrapperClass="mb-4"
                          label="Item Name"
                          size="lg"
                          id="form1"
                          type="text"
                          onChange={(e) => setProductName(e.target.value)}
                          required
                        />
                      </MDBCol>

                      <MDBCol md="12">
                        <MDBInput
                          wrapperClass="mb-4"
                          label="Brand Name"
                          size="lg"
                          id="form1"
                          type="text"
                          onChange={(e) => setProductBrand(e.target.value)}
                          required
                        />
                      </MDBCol>

                      <MDBCol md="12">
                        {/* <MDBInput
                          wrapperClass="mb-4"
                          label="Category"
                          size="lg"
                          id="form2"
                          type="text"
                          onChange={(e) => setProductCategory(e.target.value)}
                          required
                        /> */}

                        <select
                          id="categories"
                          className="w-100 mb-4"
                          onChange={(e) => setProductCategory(e.target.value)}>
                          <option value={""} disabled>
                            Select Category
                          </option>
                          {category !== undefined &&
                            category.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            ))}
                        </select>
                      </MDBCol>
                      <MDBCol md="12">
                        <MDBInput
                          wrapperClass="mb-4"
                          label="Cost ($)"
                          size="lg"
                          id="form4"
                          type="text"
                          onChange={(e) => setProductPrice(e.target.value)}
                          required
                        />
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="d-flex justify-center align-items-center">
                      <MDBCol md="12">
                        {/* <span className="text-left"> Product Description</span> */}
                        <Editor
                          apiKey="w9uy9glikbd20zxx2bcxt39mmyc48x4nz63ipssqfv5xg520"
                          initialValue="Enter Product Description"
                          init={{
                            height: 200,
                            menubar: false,
                            plugins: [
                              "advlist autolink lists link image",
                              "charmap print preview anchor help",
                              "searchreplace visualblocks code",
                              "fullscreen",
                              "insertdatetime media table paste code help wordcount",
                            ],
                            toolbar:
                              "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                            branding: false,
                            forced_root_block: false, 
                          }}
                          onEditorChange={(content) =>
                            setProductDescription(content)
                          }
                        />
                        {/* <MDBInput
                          wrapperClass="mb-4"
                          //   labelClass="text-black"
                          label="Description"
                          size="lg"
                          id="form8"
                          type="text"
                          onChange={(e) =>
                            setProductDescription(e.target.value)
                          }
                          required
                        /> */}
                      </MDBCol>
                      <MDBCol md="12" className="text-left mb-4">
                        <MDBFile
                          label="Upload image"
                          id="customFile"
                          multiple
                          inputRef={inputRef}
                          onChange={handleChangeFile}
                        />
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
                <button className="register-btn">Add</button>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </form>
      </MDBRow>
    </MDBContainer>
  );
}

export default AddProduct0;
