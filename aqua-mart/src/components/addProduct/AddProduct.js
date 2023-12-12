import React, { useState } from "react";
import "../addProduct/addProduct.css";
import { Category } from "@mui/icons-material";
import { useEffect } from "react";

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
