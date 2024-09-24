import React, { useState, useEffect } from "react";
import axios from "axios";
import Popup from "./Popup";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux_toolkit/cartSlice";
import searchIcon from "../icon/magnifying-glass.png";


export default function Card() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({});
  const cart = useSelector((state) => state?.cart?.products);
  const [products, setProducts] = useState([]);
  const [popup, setPopup] = useState(false);
  const [text, setText] = useState("");
  const url = "https://fakestoreapi.com/products";

  // Display pop up
  const addToCart = (id) => {
    setPopup(true);
    if (!cart.includes(id)) {
      dispatch(addProduct(id));
      setText("Item Added");
    } else {
      setText("Item already present");
      return cart;
    }
  };

  // Add key value in filter object
  const handleFilter = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFilter((values) => ({ ...values, [name]: value }));
  };

  // Filtering products
  const filtercontent = () => {
    if (Object.keys(filter).length == 0) {
      try {
        axios.get(url).then((resp) => setProducts(resp.data));
      } catch (error) {
        console.log(error);
      }
    } else {
      var localProducts=[]
      if (filter?.category) {
        axios.get(`https://fakestoreapi.com/products/category/${filter?.category}`)
          .then((resp) => {
            localProducts=(resp.data);
            if (filter?.price) {
              const priceSort = [];
              const price = filter?.price?.split("-");
              localProducts?.map((product) => {
                if (product.price >= price[0] && product.price <= price[1]) {
                  priceSort.push(product);
                }
              });
              console.log(priceSort);
              setProducts(priceSort);
            } else {
              setProducts(localProducts);
              console.log(localProducts)
            }
          });
      } 
      else {
        axios.get(url).then((resp) => {
          localProducts=(resp.data);
          if (filter?.price) {
            const price = filter?.price?.split("-");
            const priceSort = [];
            localProducts?.map((product) => {
              if (product.price >= price[0] && product.price <= price[1]) {
                priceSort.push(product);
              }
            });
            setProducts(priceSort);
          }
        });
      }
    }
  };

  // Render page whenever any change occur in filter object
  useEffect(() => {
    filtercontent();
  }, [filter]);

  // To apply searching
  const handleSearch = () => {
    axios.get(url).then((resp) => {
      var searchArr = [];
      resp.data.map((product) => {
        var category = product?.category?.toLowerCase();
        var title = product?.title?.toLowerCase();
        if (
          category?.includes(search.toLowerCase()) ||
          title?.includes(search.toLowerCase())
        ) {
          searchArr = [...searchArr, product];
        }
      });
      setProducts(searchArr);
    });
  
  };

  // Debouncing for filter
  useEffect(()=>{
    const debounceTimer=setTimeout(() => {
      handleSearch()
    }, 1000);
    return ()=>{
      clearTimeout(debounceTimer)
    }
  },[search])


  return (
    <div className="product_wrapper">
      <aside className="sidebar">
        <h3>Filters</h3>
        <div className="applied_filters">
          {filter?.category ? (
            <div className="applied_filter">
              <p>{filter?.category}</p>
            </div>
          ) : (
            <></>
          )}
          {filter?.price ? (
            <div className="applied_filter">
              <p>{filter?.price}</p>
            </div>
          ) : (
            <></>
          )}
        </div>
        <form>
          <h4>Price</h4>
          <h5>Ranges</h5>
          <input
            type="radio"
            id="lessthan50"
            name="price"
            value="0-50"
            onChange={handleFilter}
          />
          <label htmlFor="lessthan50">less than 50</label>
          <br />
          <input
            type="radio"
            id="from51to100"
            name="price"
            value="51-100"
            onChange={handleFilter}
          />
          <label htmlFor="from51to100">from 51 to 100</label>
          <br />
          <input
            type="radio"
            id="from101to200"
            name="price"
            value="101-200"
            onChange={handleFilter}
          />
          <label htmlFor="from101to200">from 101 to 200</label>
          <br />
        </form>
        <form>
          <h4>Categories</h4>
          <input
            type="radio"
            id="menclothing"
            name="category"
            value="men's clothing"
            onChange={handleFilter}
          />
          <label htmlFor="menclothing">Men's clothing</label>
          <br />
          <input
            type="radio"
            id="womenclothing"
            name="category"
            value="women's clothing"
            onChange={handleFilter}
          />
          <label htmlFor="womenclothing">Women's clothing</label>
          <br />
          <input
            type="radio"
            id="jewelery"
            name="category"
            value="jewelery"
            onChange={handleFilter}
          />
          <label htmlFor="jewelery">Jewellery</label>
          <br />
          <input
            type="radio"
            id="electronics"
            name="category"
            value="electronics"
            onChange={handleFilter}
          />
          <label htmlFor="electronics">Electronics</label>
          <br />
        </form>
      </aside>
      <div className="main_content">
        <form className="search_form">
          <input
            className="searchField"
            type="input"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
          <img id="searchIcon" src={searchIcon} alt="" />
        </form>
        {/* {search ? <Search search={search}/> : <></>} */}
        <div id="cards">
          <Popup popup={popup} setpopup={setPopup} text={text} />
          {products?.map((product) => {
            return (
              <div key={product?.id} id="card">
                <div>
                  <img className="img" src={product?.image} alt="" />
                  <p>{product?.title}</p>
                  <p>₹{product?.price}</p>
                  <p>{product?.rating?.rate}⭐</p>
                  <button
                    className="cartBtn"
                    onClick={() => addToCart(product?.id)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
