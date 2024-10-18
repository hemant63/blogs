import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function NavBar() {
  const [show, setShow]=useState(false)
  const navigate=useNavigate()
  const cart = useSelector((state)=>state?.cart?.products)
  const registerDialog=()=>{
    navigate("/register")
  }

  return (
    <>
        <div id='navbar'>
          <div>
            <NavLink to="/" className="navItem">Home</NavLink>
            <NavLink to="/about" className="navItem">Products</NavLink>
            <NavLink to="/contact" className="navItem">Cart({cart.length})</NavLink>
          </div>
          <div className='button'>
            <button onClick={registerDialog} >Register</button>
          </div>
        </div>

        <div id='mobile-navbar'>
          <div className='mobile-header'>
            {
              show?
              <span onClick={()=>{setShow(!show)}} >X</span>
              :<span onClick={()=>{setShow(!show)}} >Menu</span>
            }
            <div className='button'>
              <button onClick={registerDialog} >Register</button>
            </div>
          </div>
          {show?
            <div>
               <NavLink to="/" className="navItem">Home</NavLink>
               <NavLink to="/about" className="navItem">Products</NavLink>
               <NavLink to="/contact" className="navItem">Cart({cart.length})</NavLink>
            </div> 
            :<></>}
        </div>

    </>
  )
}


