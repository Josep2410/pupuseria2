import React, {useState} from 'react'
import { Link } from 'react-router-dom'

export default function Login() {

  const [email , setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
  <section className="logIn">
    <form className="logInForm" onSubmit={(e)=>e.preventDefault()}>
      <h1>Sign in to your account</h1>
      <div>
      <label htmlFor="loginEmail">Email</label>
      <input 
        id="loginEmail" 
        type="email"
        placeholder='Email' 
        value={email} 
        onChange={(e)=>setEmail(e.target.value)}/>
      <label htmlFor="loginPWD">Password</label>
      <input 
        id="loginPWD" 
        type="password" 
        placeholder='Password'
        value={password}
        onChange={(e)=>setPassword(e.target.value)}/>
      </div>
      <button>LOGIN</button>
      <p>Don't have an account ? <Link to="/createAccount">Create one</Link></p>
   </form>

  </section>
  )
}
