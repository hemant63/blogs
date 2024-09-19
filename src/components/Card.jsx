import React, { useState, useEffect } from "react";
import axios from "axios";
import Popup from "./Popup";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux_toolkit/cartSlice";
import searchIcon from "../icon/magnifying-glass.png"

export default function Card() {
  const dispatch = useDispatch();
  const [search,setSearch]=useState();
  const [filter,setFilter]=useState({});
  const cart = useSelector((state) => state?.cart?.products);
  const [products, setProducts] = useState();
  const [popup, setPopup] = useState(false);
  const [text, setText] = useState("");
  const url = "https://fakestoreapi.com/products";

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

  useEffect(() => {
    if(Object.keys(filter).length  == 0){
      axios.get(url).then((resp) =>setProducts(resp.data));
      console.log("filter is empty")
    }
  }, []);

  const handleFilter=(event)=>{
    const name = event.target.name
    const value = event.target.value
    setFilter(values=>({...values, [name]:value}))
  }

  const applyFilter=()=>{
    console.log("filter clicked")
    axios.get(`https://fakestoreapi.com/products/category/${filter?.category}`).then((resp) => setProducts(resp.data)
      );
  }

  return (
    <div className="product_wrapper">
      <aside className="sidebar">
        <div>
          <h3>Filters</h3>
          <button onClick={applyFilter}>Apply</button>
        </div>
        <form>
          <h4>Price</h4>
          <h5>Ranges</h5>
          <input
            type="radio"
            id="lessthan50"
            name="price"
            value="50"
            onChange={handleFilter}
          />
          <label htmlFor="lessthan50">less than 50</label>
          <br />
          <input type="radio" id="from51to100" name="price" value="51-100" onChange={handleFilter} />
          <label htmlFor="from51to100">from 51 to 100</label>
          <br />
          <input type="radio" id="from101to200" name="price" value="101-200" onChange={handleFilter}/>
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
          <input className="searchField" type="search" onChange={(e)=>setSearch(e.target.value)} placeholder="Search" />
          <img id="searchIcon" src={searchIcon} alt="" />
        </form>
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
