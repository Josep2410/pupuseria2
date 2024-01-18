import React, {useState, useContext} from 'react'
import { Link , useLocation, useNavigate} from 'react-router-dom'
import Context from '../Context/MyContext'
import DisplayMessage from '../components/DisplayMessage'

export default function Login() {
  const navigate = useNavigate()
  const {users} = useContext(Context)
  const [email , setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState({status : false, message : 'Wrong credentials'})
  const location = useLocation()
  const intendedPath = location.state?.intendedPath || '/profile'

  const submitForm = (e) => {
    e.preventDefault()
    setLoginError((prev) => ({...prev, status : false}))
    const existingUser = users.find(user => user.email === email.toLowerCase() && user.password === password)
    if(!existingUser) setLoginError((prev) => ({...prev, status : true}))
    else if(existingUser){
      setEmail('')
      setPassword('')
      localStorage.setItem('loggedIn' , true)
      navigate(`${intendedPath}`, {replace : true} )
    }
  }

  return (
  <section className="logIn">
    <form className="logInForm" onSubmit={submitForm}>
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
      {loginError.status && <DisplayMessage message={ loginError.message} />}
      {location.state?.message && <DisplayMessage message={location.state.message}/>}
   </form>

  </section>
  )
}
