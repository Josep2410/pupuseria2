import React, {useState, useContext} from 'react'
import { Link , useLocation, useNavigate} from 'react-router-dom'
import Context from '../Context/MyContext'
import DisplayMessage from '../components/DisplayMessage'

export default function Login() {

  /* Idea : combine email and password states*/
  const navigate = useNavigate()
  const {users, setCurrentUser} = useContext(Context)
  const [login, setLogin] = useState({email : '' , password : ''})
  const [loginError, setLoginError] = useState(null)
  const location = useLocation()
  const intendedPath = location.state?.intendedPath || '/profile'

  const submitForm = (e) => {
    e.preventDefault()
    setLoginError(null)

    try{
      const existingUser = users.find(user => user.email === (login.email).toLowerCase())
      
      if(!existingUser) throw new Error('No account found with email')
      const {password} = existingUser
      if(!(password === login.password)) throw new Error('Incorrect Password')

      setCurrentUser(existingUser)
      setLogin({email : '' , password : ''})
      localStorage.setItem('loggedIn' , true)
      navigate(`${intendedPath}`, {replace : true} )
    
    }catch(err){
      setLoginError(err)
    }
  }

  const handleChange = (e) => {
    const {name , value} = e.target
    setLogin((prev) => ({...prev, [name] : value}))
  }

  return (
  <section className="logIn">
    <form className="logInForm" onSubmit={submitForm}>
      <h1>Sign in to your account</h1>
      <div>
      <label htmlFor="loginEmail">Email</label>
      <input 
        id="loginEmail" 
        name="email"
        type="email"
        placeholder='Email' 
        value={login.email} 
        onChange={handleChange}/>
      <label htmlFor="loginPWD">Password</label>
      <input 
        id="loginPWD" 
        name="password"
        type="password" 
        placeholder='Password'
        value={login.password}
        onChange={handleChange}/>
      </div>
      <button>LOGIN</button>
      <p>Don't have an account ? <Link to="/createAccount" className='link'>Create one</Link></p>
      {loginError && <DisplayMessage message={ loginError.message} />}
      {location.state?.message && <DisplayMessage message={location.state.message}/>}
   </form>

  </section>
  )
}
