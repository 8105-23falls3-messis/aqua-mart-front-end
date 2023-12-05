import React from "react";
import "../features/getProducts.css";
import { useState } from "react";
import { useStateValue } from "../StateProvider";
import { useEffect } from "react";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
function GetProducts() {
  const [{ category, setToken }, dispatch] = useStateValue();
  const [searchItem, setSearchItem] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [isNewest, setIsNewest] = useState(false);
  const [product, setProduct] = useState([]);
  const [currNextPage, setCurrNextPage] = useState(1);
  const [currPrevPage, setPrevCurrPage] = useState(1);

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  // const [categoryItem, setCategoryItem] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem("categories"));
    if (storedCategories) {
      dispatch({ type: "PRODUCT", category: storedCategories });
    } else {
      // Otherwise, fetch categories from the API
      categories();
    }
  }, []);

  const getProducts = async (e, page) => {
    try {
      const response = await axios.post(
        "product/products",
        {
          condition1: null,
          condition2: null,
          pageNum: page,
          pageSize: 4,
        },
        {
          headers: { "Content-Type": "application/json", token: cookies.token },
          withCredentials: true,
        }
      );
      localStorage.setItem(
        "product",
        JSON.stringify(response.data.content.list)
      );
      setProduct(response.data.content.list);
      console.log(response.data.content.list[0].images[0].url);
      console.log(response.data.content.list);
      navigate("/list");
      setCurrNextPage(response.data.content.nextPage);
      setPrevCurrPage(response.data.content.prePage);
      console.log(currPrevPage, currNextPage);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("---> use effect");
    // setCurrPage(currPage+1);
    getProducts(null, currNextPage);
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
          headers: { "Content-Type": "application/json", token: cookies.token },
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
  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };
  const handleCategoryChange = (categoryName) => {
    if (selectedCategory.includes(categoryName)) {
      setSelectedCategory(
        selectedCategory.filter((cat) => cat !== categoryName)
      );
    } else {
      setSelectedCategory([...selectedCategory, categoryName]);
    }
    console.log("handle categorychange", selectedCategory);
  };

  //DETAILS
  const getProductOne = (id) => {
    axios
      .get(`/product/get/${id}`, {
        headers: { "Content-Type": "application/json", token: cookies.token },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.content.product);
        const fetchedProduct = response.data.content.product;
        localStorage.setItem("ProductById", JSON.stringify(fetchedProduct));
        dispatch({ type: "ProductById", productById: fetchedProduct });
        navigate("/productdetails");
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
         
          <div className="category-section">
            <h4>Categories</h4>
            {category !== undefined &&
              category.map((category) => (
                <div className="category" key={category.id}>
                  <input
                    className="category-checks"
                    type="checkbox"
                    checked={categoryFilter.includes(category.name)}
                    onChange={handleCategoryFilterChange}
                  />
                  <label className="pl-2">{category.name}</label>
                </div>
              ))}
          </div>
          {/* <div>
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
          </div> */}
        </div>

        <div className="products">
          {product !== undefined &&
            product
              .filter((val) => {
                if (searchItem == "") {
                  console.log("check 1st if", selectedCategory);
                  return val;
                } else if (
                  val.title.toLowerCase().includes(searchItem.toLowerCase())
                  ) {
                    return val;
                  }else if(val.category.name.toLowerCase().includes(categoryFilter.toLowerCase())){
                    return val;
                  }
              })
              .map((p) => {
                return (
                  <div key={p.id} className="product">
                    <div className="product_img">
                      {/* {p.images[0].url !== undefined && (
                        <img src={p.images[0].url} alt="img" />
                      )} */}
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
                        className="product_details-btn text-white">
                        Details
                      </a>
                    </div>
                  </div>
                );
              })}
        </div>
      </main>
      <div className="pagination">
        <a onClick={() => getProducts(null, currPrevPage)}>Previous</a>
        <a onClick={() => getProducts(null, currNextPage)}>Next</a>
      </div>
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

// useEffect(() => {
//   axios
//     .post(
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
//     )
//     .then((response) => {
//       localStorage.setItem("product", JSON.stringify(response.data.content));
//       // setProduct(response.data.content);
//       console.log(response);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }, []);

// useEffect(() => {
//   const savedProduct = localStorage.getItem("product");
//   if (savedProduct) {
//     setProduct(JSON.parse(savedProduct));
//   }
// }, [dispatch]);

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
