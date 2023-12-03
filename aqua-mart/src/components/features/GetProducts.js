import React from "react";
import ProductList from "../productList/ProductList";
import "../features/getProducts.css";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { useStateValue } from "../StateProvider";
import { useEffect } from "react";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";

import img from "../../images/53519.jpg";

function GetProducts() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [{ user, details, category, setToken, products }, dispatch] =
    useStateValue();
  const [searchItem, setSearchItem] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [isNewest, setIsNewest] = useState(false);
  const [product, setProduct] = useState([]);
  // const [categoryItem, setCategoryItem] = useState([]);
  const navigate = useNavigate();

  console.log("TOKEN", setToken);
  // console.log("PRO", products);
  console.log(priceRange);
  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem("categories"));
    // const storedProducts = JSON.parse(localStorage.getItem("product"));

    if (storedCategories) {
      // Parse only if the value is not undefined
      // const parsedCategories = JSON.parse(storedCategories);
      // If categories exist in localStorage, use them
      dispatch({ type: "PRODUCT", category: storedCategories });
    } else {
      // Otherwise, fetch categories from the API
      categories();
    }

    // if (storedProducts) {
    // Parse only if the value is not undefined
    // const parsedCategories = JSON.parse(storedCategories);
    // If categories exist in localStorage, use them
    // dispatch({ type: "PRODUCT", category: storedProducts });
    // } else {
    // Otherwise, fetch categories from the API
    // getProducts();
  }, []);

  useEffect(() => {
    axios
      .post(
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
      )
      .then((response) => {
        setProduct(response.data.content);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    const savedProduct = localStorage.getItem("product");
    if (savedProduct) {
      setProduct(JSON.parse(savedProduct));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("product", JSON.stringify(product));
  }, [product]);
  // console.log(searchItem);

  // Category
  async function categories() {
    try {
      const storedCategories = JSON.parse(localStorage.getItem("categories"));

      if (storedCategories) {
        // Categories are already in local storage, dispatch them
        dispatch({ type: "PRODUCT", category: storedCategories });
      } else {
        const response = await axios.get("/product/categories", {
          headers: { "Content-Type": "application/json", token: setToken },
          withCredentials: true,
        });
        const fetchedCategories = response.data.content;
        localStorage.setItem("categories", JSON.stringify(fetchedCategories));
        dispatch({ type: "PRODUCT", category: fetchedCategories });
      }
      // console.log("Categories", fetchedCategories);
      // Store categories in localStorage

      // console.log(valueCategory);
      // navigate("/addproduct");
    } catch (err) {
      console.log(err);
    }
  }

  // async function getProducts() {
  //   // e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "product/products",
  //       {
  //         condition1: null,
  //         condition2: null,
  //         pageNum: 1,
  //         pageSize: 4,
  //       },
  //       {
  //         headers: { "Content-Type": "application/json", token: setToken },
  //         withCredentials: true,
  //       }
  //     );
  //     const fetchedProducts = response.data.content;
  //     console.log("Products", fetchedProducts);
  //     localStorage.setItem("product", JSON.stringify(fetchedProducts));

  //     dispatch({ type: "PRODUCT", products: fetchedProducts });

  //     // console.log("products are here!", response.data.content)
  //     // console.log(response);
  //     // navigate("/list");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  const handleCategoryChange = (categoryName) => {
    if (selectedCategory.includes(categoryName)) {
      setSelectedCategory(
        selectedCategory.filter((cat) => cat !== categoryName)
      );
    } else {
      setSelectedCategory([...selectedCategory, categoryName]);
    }
  };
  
//DETAILS
  const getProductOne = (id) => {
    axios
      .get(`/product/get/${id}`, {
        headers: { "Content-Type": "application/json", token: setToken },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        const fetchedProduct = response.data.content;
        localStorage.setItem("ProductById", JSON.stringify(fetchedProduct));
        dispatch({ type: "ProductById", productById: fetchedProduct });
        navigate("/productdetails");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const handlePriceRangeChange = (newRange) => {
  //   setPriceRange(newRange);
  // };

  // const handleNewestChange = (isChecked) => {
  //   setIsNewest(isChecked);
  // };

  // console.log("details List", details.firstName);

  // const getProduct = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.get(`/product/get/40`, {
  //       headers: { "Content-Type": "application/json", token: setToken },
  //       withCredentials: true,
  //     });
  //     const fetchedProduct = response.data.content;

  //     localStorage.setItem("oneProduct", JSON.stringify(fetchedProduct));
  //     dispatch({ type: "PRODUCT", getProduct: fetchedProduct });

  //     console.log(response);
  //     navigate("/productdetails");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="products-section">
      <main className="main-container mx-auto max-w-7xl px-2 flex sm:px-6 lg:px-8">
        <div className="sidebar">
          {/* Category Filters */}
          <div className="search">
            <input
              className="search-input"
              type="text"
              placeholder="search item...."
              onChange={(e) => setSearchItem(e.target.value)}
            />
          </div>
          <div>
            <h4>Categories</h4>
            {category !== undefined &&
              category.map((category) => (
                <div key={category.id}>
                  <input
                    className="category-checks"
                    type="checkbox"
                    checked={selectedCategory.includes(category.name)}
                    onChange={() => handleCategoryChange(category.name)}
                  />
                  <label>{category.name}</label>
                </div>
              ))}
          </div>
          <div>
            <h4>Price Range</h4>
            <label>Min: {priceRange.min}</label>
            <input
              className="price-range"
              type="range"
              min={0}
              max={1000}
              // value={priceRange.min}
              onChange={(e) => {
                console.log("Min Range Changed:", Number(e.target.value));
                setPriceRange({ ...priceRange, min: Number(e.target.value) });
              }}
            />
            <label>Max: {priceRange.max}</label>
            <input
              type="range"
              min={0}
              max={1000}
              // value={priceRange.max}
              onChange={(e) => {
                console.log("Max Range Changed:", Number(e.target.value));
                setPriceRange({ ...priceRange, max: Number(e.target.value) });
              }}
            />
          </div>
        </div>

        <div className="products">
          {product !== undefined &&
            product
              .filter((val) => {
                if (searchItem == "") {
                  return val;
                } else if (
                  val.title
                    .toLowerCase()
                    .includes(searchItem.toLocaleLowerCase())
                ) {
                  return val;
                }
              })
              .map((p) => {
                return (
                  <div key={p.id} className="product">
                    <div className="product_img">
                      <img src={p.images[0].url} alt="img" />
                    </div>
                    <div className="product_details">
                      <h3 className="product_details-title">{p.title}</h3>
                      <p className="product_details-description">
                        {p.description}
                      </p>
                      <h5 className="product_details-category">
                        {p.category.name}
                      </h5>
                      <span className="product_details-brand">{p.brand}</span>
                      <h3 className="product_details-cost">{p.cost}</h3>

                      <a
                        onClick={() => getProductOne(p.id)}
                        className="product_details-btn">
                        Details
                      </a>
                    </div>
                  </div>
                );
              })}
        </div>
      </main>
    </div>
  );
}

export default GetProducts;

//  <div className="products">
// {products !== undefined &&
//   products.filter((val)=>{
//     if(searchItem == ""){
//       return val;
//     }else if(val.title.toLowerCase().includes(searchItem.toLocaleLowerCase())){
//       return val;
//     }
//   }).map((p) => {
//       return (
//         <div key={p.id}>
//           <h2>{p.title}</h2>
//           <img
//             key={p.images.id}
//             src={p.images.url}
//             alt={p.fileName}
//           />
//           <p>{p.description}</p>
//           <h2>{p.category.name}</h2>
//           <h3>${p.cost}</h3>
//           <p onClick={() => getProduct(p.id)}>Details</p>

//         </div>
//       );
//     })}
// </div>
