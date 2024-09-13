import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import RegisterModal from './RegisterModal'

export default function NavBar() {

    const [modal, setModal] = useState(false)
const registerDialog=()=>{
    setModal(true)
}

// const closeModal=()=>{
//   setModal(false)
//   console.log("modal closred")
// }

  return (
    <>
        <div id='navbar'>
            <NavLink to="/" className="navItem">Home</NavLink>
            <NavLink to="/about" className="navItem">About</NavLink>
            <NavLink to="/contact" className="navItem">Contact</NavLink>
            <button onClick={registerDialog} className='navItem'>Register</button>
            {(modal)?<RegisterModal modal={modal} />:<></>}
    </div>
    </>
  )
}


