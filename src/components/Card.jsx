import React,{ useState, useEffect} from 'react'
import axios from "axios"
import Popup from './Popup'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../redux_toolkit/cartSlice'

export default function Card() {

const dispatch=useDispatch()
const cart=useSelector((state)=>state?.cart?.products)
const [products, setProducts] = useState()
const [popup, setPopup]=useState(false)
const [text,setText]=useState("")
const url="https://fakestoreapi.com/products"

const addToCart=(id)=>{
  setPopup(true)
  if(!cart.includes(id)){
    dispatch(addProduct(id))
    setText("Item Added")
  } else {
    setText("Item already present")
    return cart
  }  
}

useEffect(()=>{
  axios.get(url).then(resp=>setProducts(resp.data))
},[])

  return (
    <>
    <div id='cards'>
      <Popup popup={popup} setpopup={setPopup} text={text}/>
      {products?.map((product)=>{
        return(
          <div key={product?.id} id='card'>
            <div>
            <img className='img' src={product?.image} alt='' />
            <p>{product?.title}</p>
            <p>₹{product?.price}</p>
            <p>{product?.rating?.rate}⭐</p>
            <button id='cartBtn' onClick={()=>addToCart(product?.id)}>Add to cart</button>
            </div>
          </div>
        )
      })}
    </div> 
      </>
  )
}
