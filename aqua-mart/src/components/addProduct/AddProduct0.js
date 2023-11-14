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

function AddProduct0() {
  const [productName, setProductName] = useState();
  const [productBrand, setProductBrand] = useState();
  const [productCategory, setProductCategory] = useState();
  const [productPrice, setProductPrice] = useState();
  const [productDescription, setProductDescription] = useState();
  const [productImage, setProductImage] = useState();

  const inputRef = React.useRef();

  const handleChangeFile = (e) => {
    setProductImage(e.target.files);
    console.log(inputRef.current.files);
}
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("PNaem:", productName, "\nPBrand:", productBrand, "\nCate:", productCategory, "\nFiles: ", productImage,"\nPDes:", productBrand  )
    // try {
    //   const response = await axios.post("/user/register", JSON.stringify({}), {
    //     headers: { "Content-Type": "application/json" },
    //     withCredentials: true,
    //   });

    //   //   console.log(response.data)
    //   //   console.log(response.accessToken);
    //   console.log(JSON.stringify(response));
    //   if (response.data.status === 200) {
    //     navigate("/login");
    //     // Registration was successful, you can redirect or show a success message.
    //     console.log("Registration successful");
    //   } else if (
    //     response.data.status === 200 &&
    //     response.data.msg === "Account exist!"
    //   ) {
    //     // User already exists
    //     console.log("User with the same email already exists");
    //   } else {
    //     // Handle other scenarios
    //     console.log("Registration failed for an unknown reason");
    //   }
    //   //clear the input field
    // } catch (err) {
    //   console.log("Registration failed:", err);
    // }
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
                  <MDBCol md="6" className="bg-blue d-flex justify-start align-items-start gap-5 w-100 h-100">
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
                        <MDBInput
                          wrapperClass="mb-4"
                          label="Category"
                          size="lg"
                          id="form2"
                          type="text"
                          onChange={(e) => setProductCategory(e.target.value)}
                          required
                        />
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
                          apiKey='w9uy9glikbd20zxx2bcxt39mmyc48x4nz63ipssqfv5xg520'
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
                          }}
                          onEditorChange={(content) => setProductDescription(content)}
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
