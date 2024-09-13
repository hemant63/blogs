import React from 'react'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

 const Test = () => {
    const [users, setusers] = useState([])
    const url="https://jsonplaceholder.typicode.com/users"
    const [inputValue, setInputValue] = useState("");
    const previousInputValue= useRef("");
    
    useEffect(()=>{
      previousInputValue.current=inputValue
    })
    
  
  return (
    <div>
        <h1>test component</h1>
        <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <h2>Current Value: {inputValue}</h2>
      <h2>Previous Value: {previousInputValue.current}</h2>
    </div>
  )
}

export default Test 
