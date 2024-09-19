import React from 'react'

export default function Popup({popup, setpopup, text}) {
    
    if(popup){
        setTimeout(()=>{
            setpopup(false)
        },3000)
    }
    
  return (
    <>
    {(popup)?
    <div className='popup'>
        <p id='content'>{text}</p>
        <button className='close' onClick={()=>setpopup(false)}>X</button>
    </div>:<></>}
    </>
  )
}
