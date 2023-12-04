import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import ReactImageGallery from "react-image-gallery";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import "../../components/productPage/productPage.css"
import PhoneIcon from '@mui/icons-material/Phone';
import { Phone } from "@mui/icons-material";
import { useState } from "react";
import { useEffect } from "react";
import { useStateValue } from "../StateProvider";

/*
import React from 'react';


function Email({email, subject}) {

    const encodedSubject = encodeURIComponent(subject);
    const mailtoLink = `mailto:${email}?subject=${encodedSubject}`;

  return (
   <div>
      <a href={mailtoLink} target="_blank" rel="noopener noreferrer">
      <button>Send Email</button>
    </a>
   </div>
  )
}

export default Email
*/
const ProductPage = () => {
  const [{productById}, dispatch] = useStateValue();
  const [oneProduct, setOneProduct] = useState();
  
  useEffect(() => {
    const savedOneProduct = localStorage.getItem("ProductById");
    if (savedOneProduct) {
      // console.log(savedOneProduct);
      setOneProduct(JSON.parse(savedOneProduct));
    }
  }, []);

// console.log(oneProduct);
  const productDetailItem = {
    images: [
      {
        original:
          "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
    //     thumbnail:
    //       "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        original:
          "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=600",
    //     thumbnail:
    //       "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        original:
          "https://images.pexels.com/photos/2697787/pexels-photo-2697787.jpeg?auto=compress&cs=tinysrgb&w=600",
        thumbnail:
          "https://images.pexels.com/photos/2697787/pexels-photo-2697787.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        original:
          "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        thumbnail:
          "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
    //   {
    //     original:
    //       "https://images.pexels.com/photos/3910071/pexels-photo-3910071.jpeg?auto=compress&cs=tinysrgb&w=600",
    //     thumbnail:
    //       "https://images.pexels.com/photos/3910071/pexels-photo-3910071.jpeg?auto=compress&cs=tinysrgb&w=600",
    //   },
    ],
    title: "BIG ITALIAN SOFA",
    reviews: "150",
    availability: true,
    brand: "apex",
    category: "Sofa",
    sku: "BE45VGTRK",
    price: 450,
    previousPrice: 599,
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem exercitationem voluptate sint eius ea assumenda provident eos repellendus qui neque! Velit ratione illo maiores voluptates commodi eaque illum, laudantium non!",
    size: ["XS", "S", "M", "L", "XL"],
    color: ["gray", "violet", "red"],
  };
  const plusMinuceButton =
    "flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500";
  
    const email = productById.user.email; 
    console.log(productById);
    const encodedSubject = encodeURIComponent(`Regarding Product  namey ${productById.title} you listed on the AquaMart`);
    const mailtoLink = `mailto:${email}?subject=${encodedSubject}`;

  
  
    return (
    <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
      {/* image gallery */}
      <div className="img-container container mx-auto">
      {productById.images.map((x) => {
              return (
                <div
                  key={x.id}
                  className="img-holder"
                >
                  <img src={x.url} alt="img"/>
                </div>
              );
            })}
        {/* /image gallery  */}
      </div>
      {/* description  */}

      <div className="mx-auto px-5 lg:px-5">
        <h2 className="pt-3 text-2xl font-bold lg:pt-0">
          {productById.title}
        </h2>
        {/* <div className="mt-1">
          <div className="flex items-center">
            <Rater
              style={{ fontSize: "20px" }}
              total={5}
              interactive={false}
              rating={3.5}
            />

            <p className="ml-3 text-sm text-gray-400">
              ({productDetailItem.reviews})
            </p>
          </div>
        </div> */}
        {/* <p className="mt-5 font-bold">
          Availability:{" "}
          {productDetailItem.availability ? (
            <span className="text-green-600">In Stock </span>
          ) : (
            <span className="text-red-600">Expired</span>
          )}
        </p> */}
        <p className="font-bold">
          Brand: <span className="font-normal">{productById.brand}</span>
        </p>
        <p className="font-bold">
          Cathegory:{" "}
          <span className="font-normal">{productById.category.name}</span>
        </p>
        {/* <p className="font-bold">
          SKU: <span className="font-normal">{productDetailItem.sku}</span>
        </p> */}
        <p className="mt-1 text-4xl font-bold text-black"> Cost:
          ${productById.cost}
          {/* <span className="text-xs text-gray-400 line-through">
            ${productDetailItem.previousPrice}
          </span> */}
        </p>
        <p className="pt-1 text-sm leading-5 text-gray-500">
          {productById.description}
        </p>
        {/* <div className="mt-6">
          <p className="pb-2 text-xs text-gray-500">Size</p>
          <div className="flex gap-1">
            {productDetailItem.size.map((x, index) => {
              return (
                <div
                  key={index}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
                >
                  {x}
                </div>
              );
            })}
          </div>
        </div> */}
        {/* <div className="mt-6">
          <p className="pb-2 text-xs text-gray-500">Color</p>
          <div className="flex gap-1">
            {productDetailItem.color.map((x, index) => {
              return (
                <div
                  key={index}
                  className={`h-8 w-8 cursor-pointer border border-white bg-${x}-600 focus:ring-2 focus:ring-${x}-500 active:ring-2 active:ring-${x}-500`}
                />
              );
            })}
          </div>
        </div> */}
        {/* <div className="mt-6">
          <p className="pb-2 text-xs text-gray-500">Quantity</p>
          <div className="flex">
            <button className={`${plusMinuceButton}`}>−</button>
            <div className="flex h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500">
              1
            </div>
            <button className={`${plusMinuceButton}`}> +</button>
          </div>
        </div> */}
        <div className="mt-7 flex flex-row items-center gap-6">
          
          <button className="contact-btn flex h-12 w-1/3 items-center justify-center ">
            <PhoneIcon className="mx-2" />
                   <a href={mailtoLink}> Contact</a>           </button>
          {/* <button className="flex h-12 w-1/3 items-center justify-center bg-amber-400 duration-100 hover:bg-yellow-300">
            <AiOutlineHeart className="mx-2" />
            
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default ProductPage;