import React, { useState } from "react";
import "../addProduct/addProduct.css"

function AddProduct() {
    // img
    const [selectedImage, setSelectedImage] = useState(null);

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
    <div className="addProduct bg-slate-800 flex item-center justify-center pt-5">
      <div className="addProduct__wrapper  flex flex-col items-center gap-y-4">
        <div className="addProduct__title">
          <h1 className="text-3xl text-white">Add Product</h1>
        </div>
        <div className="addProduct__form flex flex-col gap-y-2">
          <div className="register__label">
            <label>Product Name</label>
            <input type="text" />
          </div>
          <div className="register__label">
            <label>Condition</label>
            <input type="phone" />
          </div>
          <div className="register__label">
            <label>How Old? </label>
            <input type="email" />
          </div>
          <div className="register__label">
            <label>Email</label>
            <input type="text" />
          </div>
          <div className="register__label">
            <label>Address:</label>
            <input type="text" />
          </div>
          <div className="register__label">
            <label>Price</label>
            <input type="password" />
          </div>
          <div className="register__label">
            <label>Picture</label>
            <input type="password" />
          </div>
          {/*  img*/}
          <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      {selectedImage && (
        <div>
          <h3>Selected Image:</h3>
          <img src={selectedImage} alt="Uploaded" className="w-20"/>
        </div>
      )}
          {/* img */}
        </div>
        <button className="px-4 py-1">Submit</button>
      </div>
    </div>
  );
}

export default AddProduct;
