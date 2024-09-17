import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Popup from '../components/Popup'

export default function Contact() {

  const [products, setProducts]=useState()
  const [productId, setProductId] = useState(JSON.parse(localStorage.getItem("productId")))
  const [popup, setPopup]=useState(false)
  const url="https://fakestoreapi.com/products"
  
  useEffect(()=>{
    axios.get(url).then(resp=>setProducts(resp.data))
  },[])

  const updateCart=(id)=>{
    setPopup(true)
     var newCart = (productId.filter((val)=>val!=id))
     setProductId(newCart)
    }
    localStorage.setItem("productId",JSON.stringify(productId))
  

  return (
    <div>
      <table>
        <tbody>
        <Popup popup={popup} setpopup={setPopup} text={"Item Removed"}/>
          {products?.map((product)=>{
            if(productId.includes(product?.id)){
              return(
                <tr key={product?.id} className='row'>
                  <td className='col1'>
                    <img src={product?.image} />
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
      </table>
    </div>
  )
}
