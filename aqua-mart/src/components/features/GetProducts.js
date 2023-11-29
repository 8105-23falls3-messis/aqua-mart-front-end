import React from "react";
import ProductList from "../productList/ProductList";

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

function GetProducts() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [{ user, details, category, setToken, products }, dispatch] =
    useStateValue();
  const [searchItem, setSearchItem] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [isNewest, setIsNewest] = useState(false);
  // const [categoryItem, setCategoryItem] = useState([]);

  console.log("TOKEN", setToken);
  // console.log("PRO", products);
 
  useEffect(() => {
    getProducts();
    categories();
  }, [dispatch]);
  // console.log(searchItem);

  // Category
  async function categories() {
    try {
      const response = await axios.get("/product/categories", {
        headers: { "Content-Type": "application/json", "token": setToken },
        withCredentials: true,
      });
      dispatch({ type: "PRODUCT", category: response.data.content });

      console.log("Categories", response);
      // navigate("/addproduct");
    } catch (err) {
      console.log(err);
    }
  }
  async function getProducts() {
    // e.preventDefault();
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
          headers: { "Content-Type": "application/json", "token": setToken },
          withCredentials: true,
        }
      );
      localStorage.setItem('product', JSON.stringify(response.data.content.user));
  
      dispatch({ type: "PRODUCT", products: response.data.content });

      console.log("products are here!", response.data.content)
      // console.log(response);
      // navigate("/list");
    } catch (err) {
      console.log(err);
    }
  }

  const handleCategoryChange = (categoryName) => {
    if (selectedCategory.includes(categoryName)) {
      setSelectedCategory(selectedCategory.filter(cat => cat !== categoryName));
    } else {
      setSelectedCategory([...selectedCategory, categoryName]);
    }
  };
  
  // const handlePriceRangeChange = (newRange) => {
  //   setPriceRange(newRange);
  // };
  
  // const handleNewestChange = (isChecked) => {
  //   setIsNewest(isChecked);
  // };

  // console.log("details List", details.firstName);
  return (
    <div className="bg-white">
      <div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="sidebar">
            {/* Category Filters */}
            <div>
              <h4>Categories</h4>
              {category !== undefined && category.map((category) => (
                <div key={category.id}>
                  <input
                    type="checkbox"
                    checked={selectedCategory.includes(category.name)}
                    onChange={() => handleCategoryChange(category.name)}
                  />
                  <label>{category.name}</label>
                </div>
              ))}
            </div>

            {/* Price Range Filter */}
            {/* <div>
              <h4>Price Range</h4>
              Implement range input/slider
            </div> */}

            {/* Newest Filter */}
            {/* <div>
              <h4>Newest Products</h4>
              <input
                type="checkbox"
                checked={isNewest}
                onChange={(e) => handleNewestChange(e.target.checked)}
              />
            </div> */}
          </div>
          <div className="search">
            <input
              type="text"
              placeholder="search item...."
              onChange={(e) => setSearchItem(e.target.value)}
            />
          </div>
          <div className="products">
            {products !== undefined &&
              products
                .filter((p) => {
                  if (searchItem == "") {
                    return p;
                  } else if (
                    p.title.toLowerCase().includes(searchItem.toLowerCase())
                  ) {
                    return p;
                  }
                  // else if(selectedCategory.includes(p.category.name)){
                  //   return p;
                  // }
                })
                .map((p) => {
                  return (
                    <div key={p.id}>
                      <h2>{p.title}</h2>
                      <img
                        key={p.image.id}
                        src={p.image.url}
                        alt={p.fileName}
                      />
                      <p>{p.description}</p>
                      <h2>{p.category.name}</h2>
                      <h3>${p.cost}</h3>
                    </div>
                  );
                })}
          </div>
        </main>
      </div>
    </div>
  );
}

export default GetProducts;
