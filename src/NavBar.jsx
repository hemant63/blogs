import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import RegisterModal from './RegisterModal'
import { useSelector } from 'react-redux'

export default function NavBar() {

  // const [productId,setProductId]=useState(JSON.parse(localStorage.getItem("productId")))
  const [modal, setModal] = useState(false)
  const cart = useSelector((state)=>state?.cart?.products)
  const registerDialog=()=>{
    setModal(true)
  }
// console.log(productId)
// const closeModal=()=>{
//   setModal(false)
//   console.log("modal closred")
// }

  return (
    <>
        <div id='navbar'>
          <div className='navItems'>
            <span className='toggle'>Toggle</span>
          <NavLink to="/" className="navItem">Home</NavLink>
            <NavLink to="/about" className="navItem">Products</NavLink>
            <NavLink to="/contact" className="navItem">Cart({cart.length})</NavLink>
          </div>
          <div className='button'>
            <button onClick={registerDialog} >Register</button>
            {(modal)?<RegisterModal modal={modal} />:<></>}
          </div>
    </div>
    </>
  )
}


