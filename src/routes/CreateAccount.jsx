import React , {useState, useContext , useRef, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Context from '../Context/MyContext'
import DisplayMessage from '../components/DisplayMessage'
import { FaInfoCircle } from "react-icons/fa";


const EMAIL_REGEX =  /\S+@\S+\.\S+/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
//const REGISTER_URL = '/register'

export default function CreateAccount() {
  const userRef= useRef()
  const errRef = useRef()
  const {users, usersURL, setUsers} = useContext(Context)

  const [createAccount , setCreateAccount ] = useState({email : '' , password : ''})
  const [match, setMatch] = useState('')

  const [validEmail , setValidEmail]  = useState(false)
  const [validPwd , setValidPwd] = useState(false)
  const [validMatch , setValidMatch] = useState(false)
  
  const [emailFocus , setEmailFocus]  = useState(false)
  const [pwdFocus , setPwdFocus] = useState(false)
  const [matchFocus , setMatchFocus] = useState(false)

  const [success,setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(()=> {
    setValidEmail(EMAIL_REGEX.test(createAccount.email))
  }, [createAccount.email])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(createAccount.password))
    setValidMatch(createAccount.password === match)
  }, [createAccount.password, match ])

  useEffect(()=> {
    setError('')
  }, [createAccount.email, createAccount.password , match])

  const handleChange = (e) => {
    const {name , value} = e.target
    setCreateAccount(prev => ({...prev , [name] : value}))
  }

  const handleSubmit = (e) =>{
    e.preventDefault()

     // if button enabled with JS hack
     const v1 = EMAIL_REGEX.test(createAccount.email);
     const v2 = PWD_REGEX.test(createAccount.password);
     if (!v1 || !v2) {
         setError("Invalid Entry");
         return;
     }
     createNewUser(createAccount)

  }

  const createNewUser = async ({email, password}) => {


    const newUser = {
      //mongoDb will auto create, delete when DB is set up
      id : users.length? users[users.length - 1].id + 1 : 1,
      email : email.toLowerCase(),
      password : password
    }
    try{
      const existingAcc = users.find(user => user.email === email.toLowerCase())
      if(existingAcc) throw new Error('Email already has account')
      const response = await fetch(`${usersURL}/users` , {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(newUser)
      })
      if(!response.ok) throw new Error('Problem creating new user')
      
      console.log('successfully created user')
      setUsers([...users , newUser])
      setSuccess(true)
      setCreateAccount({email : '' , password : ''})
      setMatch('')
    }catch(err){
      setError(err.message)
     
      errRef.current.focus()
    }
  }

  return (
    <section className="createAccount">
      <p ref={errRef} className={error ? "errmsg" : "offscreen"} aria-live="assertive">{error}</p>
      <h1>Create Account</h1>
      <form  onSubmit={handleSubmit}>
          <label htmlFor="emailAddr" className='offscreenLabel'>Email</label>
          <input 
            required
            id="emailAddr"
            type="email" 
            placeholder='Email'
            name="email" 
            value={createAccount.email} 
            onChange={handleChange}
            autoComplete='off'
            ref={userRef}
            onFocus={()=>setEmailFocus(true)}
            onBlur={()=>setEmailFocus(false)}
            aria-invalid={validEmail? "false" : "true"}
            aria-describedby='emailIDnote'
            />
            <p id='emailIDnote' className={emailFocus && createAccount.email && !validEmail? 'instructions' : 'offscreen'}> <FaInfoCircle />  Enter a valid Email </p>
          
          <label htmlFor="regPWd" className='offscreenLabel'>Password</label>
          <input 
            required
            id="regPWD"
            type="password" 
            name="password"
            placeholder='Password' 
            value={createAccount.password} 
            onChange={handleChange}
            aria-invalid={validPwd? "false" : "true"}
            aria-describedby='pwdNote'
            onFocus={() => setPwdFocus(true)}
            onBlur={()=>setPwdFocus(false)}
            />
            <p id='pwdNote' className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}> <FaInfoCircle /> 8 to 24 characters.<br />
                          Must include uppercase and lowercase letters, a number and a special character.<br />
                          Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span></p>
          <label htmlFor="match" className='offscreenLabel'>Check Password</label>
          <input 
            required
            id="match"
            type="password" 
            placeholder='Re-type password' 
            value={match} 
            onChange={(e) => setMatch(e.target.value)}
            aria-invalid={validMatch? "false" : "true"}
            aria-describedby='matchPWDnote'
            onFocus={() => setMatchFocus(true)}
            onBlur={()=> setMatchFocus(false)}
            />
            <p id='matchPWDnote' className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}><FaInfoCircle /> Must match the first password input field </p>

        <button disabled={!validEmail || !validPwd || !validMatch ? true : false}>Create Account</button>
      </form>

        <p>Already have an account ? <Link to='/login' className='link'>Log in</Link></p>
        {success && <DisplayMessage error={false} message="Successfully created account"/>}
  </section>
  )
}

/* Can make more realistic by adding requirements to the password  (One uppercase, special char, etc) probably via Regular Expressions / Regex  */


/* 

<label htmlFor="username">Name</label>
          <input 
            required
            id="username"
            type="text" 
            placeholder='First name' 
            name="name"
            value={createAccount.name} 
            onChange={handleChange}
            autoComplete='off'
            />

*/