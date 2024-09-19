import React,{useState} from "react"


export default function RegisterModal({modal}) {
    const [user, setUser] = useState({})
    const [users, setUsers] = useState([])
    
    const  handleInput=(event)=>{
        const name=event.target.name
        const value= event.target.value
        setUser(values=>({...values, [name]:value}))
    }
    
    const onSubmit=()=>{
        setUsers([...users, user])
        // document.cookie=`users=${JSON.stringify(user)}`
    }
    console.log(users)

  return (
    <div className="modal">
        <div className="modal-content" >
                <h3>Create account</h3>
            <form >
                <input className="input" placeholder="Enter Name" type="text" name="username" onChange={handleInput} /><br />
                <input className="input" placeholder="Email" type="email" name="email" onChange={handleInput} /><br />
                <input className="input" placeholder="Password" type="text" name="password" onChange={handleInput} /><br />
                <button className="input" onClick={onSubmit} >Submit</button>
            </form>
        </div>
    </div>
  )
}
