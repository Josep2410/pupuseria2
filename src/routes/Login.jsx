import React, {useState, useContext , useRef , useEffect} from 'react'
import { Link , useLocation, useNavigate} from 'react-router-dom'
import Context from '../Context/MyContext'
import DisplayMessage from '../components/DisplayMessage'

export default function Login() {
  
//set up Auth in Context

  const emailRef = useRef()
  const errRef = useRef()

  const navigate = useNavigate()
  const {users, setCurrentUser} = useContext(Context)

  const [login, setLogin] = useState({email : '' , password : ''})
  const [loginError, setLoginError] = useState('')
  const [success, setSuccess] = useState(false)

  const location = useLocation()
  const intendedPath = location.state?.intendedPath || '/profile'


  useEffect(() => {
    emailRef.current.focus()
  }, [])

  const submitForm = (e) => {
    e.preventDefault()
    setLoginError('')
    try{
      const existingUser = users.find(user => user.email === (login.email).toLowerCase())
      
      if(!existingUser) throw new Error('No account found with email')
      const {password} = existingUser
      if(password !== login.password) throw new Error('Incorrect Password')

      setCurrentUser(existingUser)
      setLogin({email : '' , password : ''})
      localStorage.setItem('loggedIn' , true)
      navigate(`${intendedPath}`, {replace : true} )
    
    }catch(err){
      setLoginError(err.message)
      console.log(err.message)
      errRef.current.focus()
    }
  }

  const handleChange = (e) => {
    const {name , value} = e.target
    setLogin((prev) => ({...prev, [name] : value}))
  }

  return (
  <section className="logIn">
    <p className={loginError ? 'errmsg' : 'offscreen'}  aria-live='assertive'>{loginError}</p>
    <h1>Sign in to your account</h1>
    <form className="logInForm" onSubmit={submitForm}>
      <label htmlFor="loginEmail" className="offscreenLabel">Email</label>
      <input 
       ref={emailRef}
        id="loginEmail" 
        name="email"
        type="email"
        placeholder='Email' 
        value={login.email} 
        onChange={handleChange}
        autoComplete='off'
        required
        />
      <label htmlFor="loginPWD" className="offscreenLabel">Password</label>
      <input 
        id="loginPWD" 
        name="password"
        type="password" 
        placeholder='Password'
        value={login.password}
        onChange={handleChange}
        required
        />
  
      <button disabled={!login.email || !login.password ? true : false}>LOGIN</button>
    </form>
    <p> Don't have an account ? <Link to="/createAccount" className='link'>Create one</Link></p>
   {/*  {loginError && <DisplayMessage message={loginError}/>} */}
    {location.state?.message && <DisplayMessage message={location.state.message} />}

  </section>
  )
}
