import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Popup from '../components/Popup'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct } from '../redux_toolkit/cartSlice'
import { useNavigate } from 'react-router-dom'

export default function Contact() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const cart=useSelector((state)=>state?.cart?.products)
  const [products, setProducts]=useState([])
  const [popup, setPopup]=useState(false)
  const url="https://fakestoreapi.com/products"
  
  useEffect(()=>{
    axios.get(url).then(resp=>setProducts(resp.data))
  },[])

  const updateCart=(id)=>{
    dispatch(deleteProduct(id))
    setPopup(true)
    }
  

  return (
    <div className='component_body'>
      {(cart.length>0)?
      <table>
        <tbody>
        <Popup popup={popup} setpopup={setPopup} text={"Item Removed"}/>
          {products?.map((product)=>{
            if(cart.includes(product?.id)){
              return(
                <tr key={product?.id} className='row'>
                  <td className='col1'>
                    <img src={product?.image} alt='' />
                  </td>
                  <td className='col2'>
                    <div className='col'>
                      <p>{product?.title}</p>
                      </div>
                      <div className='price-btn'>
                      <p>₹{product?.price}</p>
                      <button id='cartBtn' onClick={()=>updateCart(product?.id)}>Remove</button>
                    </div>
                  </td>
                </tr>
              )
            }
          })}
        </tbody>
      </table>:
      <div className='empty_page'>
        <h1>Cart is empty</h1>
        <button className='cartBtn' onClick={()=>navigate("/about")}>shop</button>
      </div>
      }
      
    </div>
  )
}
