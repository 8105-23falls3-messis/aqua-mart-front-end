import React, { useState } from "react";
import "../addProduct/addProduct.css";
import { Category } from "@mui/icons-material";
import { useEffect } from "react";
// import { useStateValue } from "../StateProvider";

function AddProduct() {
  
  // const [{ details }, dispatch] = useStateValue();

  // img
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect()
  // console.log(details);
  // Handle when a user selects an image
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Use FileReader to read the selected image as a data URL
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  // img
  return (
    <div className="addProduct flex item-center justify-center pt-5">
      <div className="addProduct__wrapper  flex flex-col items-center gap-y-4">
        <div className="addProduct__title">
          <h1 className="text-3xl text-black">Add Item:</h1>
        </div>
        <div className="addProduct__form flex flex-col gap-y-2">
          <div className="register__label">
            <label>Item Name/Title:</label>
            <input type="text" />
          </div>
          <div className="register__label">
            <label>Details:</label>
            <input type="phone" />
          </div>
          {/* <div className="register__label">
            <label>How Old? </label>
            <input type="email" />
          </div> */}
          {/* <div className="register__label">
            <label>Email</label>
            <input type="text" />
          </div> */}
          <div className="register__label">
            <label>Address:</label>
            <input type="text" />
          </div>
          <div className="register__label">
            <label>Price:</label>
            <input type="password" />
          </div>
          <div className="register__label">
            <label>Images:</label>
            <input type="password" />
          </div>
          {/*  img*/}
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {selectedImage && (
            <div>
              <h3>Selected Image:</h3>
              <img src={selectedImage} alt="Uploaded" className="w-20" />
            </div>
          )}
          {/* img */}
        </div>
        <button className="addItemBtn">Submit</button>
      </div>
    </div>
  );
}

export default AddProduct;

/*

  //  <div className="addProduct">
  //     <div className="d-flex justify-content-center align-items-center h-100">
  //       <form
  //         onSubmit={handleSubmit}
  //         className="d-flex justify-content-center align-items-center w-100">
  //         <div className="">
  //           <div className="" style={{ borderRadius: "5" }}>
  //             <div className="">
  //               {/* <h2 className="addProduct-title">Add Product</h2> */
  //               <div className="d-flex justify-center align-items-center ">
  //                 <div className="bg-blue d-flex justify-start align-items-start gap-5 w-100 h-100">
  //                   <div className="addproduct-container">
  //                     <div className="input">
  //                       <input
  //                         wrapperClass="mb-4"
  //                         label="Item Name"
  //                         size="lg"
  //                         id="form1"
  //                         type="text"
  //                         onChange={(e) => setProductName(e.target.value)}
  //                         required
  //                       />
  //                     </div>

  //                     <div className="input">
  //                       <input
  //                         wrapperClass="mb-4"
  //                         label="Brand Name"
  //                         size="lg"
  //                         id="form1"
  //                         type="text"
  //                         onChange={(e) => setProductBrand(e.target.value)}
  //                         required
  //                       />
  //                     </div>

  //                     <div className="input">
  //                       {/* <MDBInput
  //                         wrapperClass="mb-4"
  //                         label="Category"
  //                         size="lg"
  //                         id="form2"
  //                         type="text"
  //                         onChange={(e) => setProductCategory(e.target.value)}
  //                         required
  //                       /> */}

  //                       <select
  //                         id="categories"
  //                         className="w-100 mb-4"
  //                         onChange={(e) => setProductCategory(e.target.value)}>
  //                         <option value={""} disabled>
  //                           Select Category
  //                         </option>
  //                         {CategoriesInfo !== undefined &&
  //                           CategoriesInfo.map((c) => (
  //                             <option key={c.id} value={c.id}>
  //                               {c.name}
  //                             </option>
  //                           ))}
  //                       </select>
  //                     </div>
  //                     <div className="input">
  //                       <input
  //                         wrapperClass="mb-4"
  //                         label="Cost ($)"
  //                         size="lg"
  //                         id="form4"
  //                         type="text"
  //                         onChange={(e) => setProductPrice(e.target.value)}
  //                         required
  //                       />
  //                     </div>
  //                   </div>

  //                   <div className="d-flex justify-center align-items-center">
  //                     <div className="input">
  //                       {/* <span className="text-left"> Product Description</span> */}
  //                       <Editor
  //                         apiKey="w9uy9glikbd20zxx2bcxt39mmyc48x4nz63ipssqfv5xg520"
  //                         initialValue="Enter Product Description"
  //                         init={{
  //                           height: 200,
  //                           menubar: false,
  //                           plugins: [
  //                             "advlist autolink lists link image",
  //                             "charmap print preview anchor help",
  //                             "searchreplace visualblocks code",
  //                             "fullscreen",
  //                             "insertdatetime media table paste code help wordcount",
  //                           ],
  //                           toolbar:
  //                             "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
  //                           branding: false,
  //                           forced_root_block: false,
  //                         }}
  //                         onEditorChange={(content) =>
  //                           setProductDescription(content)
  //                         }
  //                         style={{
  //                           overflowY: "auto", // Add a scroll bar for vertical overflow
  //                           zIndex: 1000, // Set the z-index to ensure it appears above other elements
  //                           // Responsive styles for mobile devices
  //                           "@media (max-width: 768px)": {
  //                             height: "auto", // Adjust height for mobile view
  //                             overflowY: "hidden", 
  //                             display: "none"// Hide scroll bar on mobile
  //                           },
  //                         }}
  //                       />
  //                     </div>
  //                     <div className="input text-left mb-4">
  //                       <MDBFile
  //                         label="Upload image"
  //                         id="customFile"
  //                         multiple
  //                         inputRef={inputRef}
  //                         onChange={handleChangeFile}
  //                       />
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //               <button className="register-btn">Add</button>
  //             </div>
  //           </div>
  //         </div>
  //       </form>
  //     </div>
  //   </div>
