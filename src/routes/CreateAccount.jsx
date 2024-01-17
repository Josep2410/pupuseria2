import React , {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import Context from '../Context/MyContext'

export default function CreateAccount() {

  /* Idea : combine all three error states to one */
  const {users, usersURL, setUsers} = useContext(Context)
  const [registerEmail, setRegisterEmail] = useState('')
  const [createPassword, setCreatePassword] = useState('')
  const [checkPWD, setCheckPWD] = useState('')
  const [emailPwdError, setEmailpwdError] = useState(null)
  const [pwdError, setPwdError] = useState(null)
  const [otherErrors, setOtherErrors] = useState(null)
  const [createAccountSuccessfully, setCreateAccountSuccessfully] = useState(false)

  const submitForm = (e) =>{
    e.preventDefault()
    setEmailpwdError(null)
    setPwdError(null)
    setOtherErrors(null)
    setCreateAccountSuccessfully(false)
    const existingEmail = users.find(user => user.email === registerEmail)
    const pwdMatch = createPassword === checkPWD

    if(existingEmail) setPwdError('Email already has an account')
    if(!pwdMatch) setPwdError('Passwords do not match')
    else if(!existingEmail && pwdMatch) {
    createNewUser(registerEmail, createPassword)}
    
  }

  const createNewUser = async (email , pwd) => {
    const newUser = {
      id : users.length? users[users.length - 1].id + 1 : 1,
      email : email.toLowerCase(),
      password : pwd
    }
    try{
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
      setCreateAccountSuccessfully(true)
      setRegisterEmail('')
      setCreatePassword('')
      setCheckPWD('')
    }catch(err){
      setOtherErrors(err.message)
    }
  }

  return (
    <section className="createAccount">
      <form className="createAccountForm" onSubmit={submitForm}>
        <h1>Create Account</h1>
        <div>
          <label htmlFor="emailAddr">Email</label>
          <input 
            id="emailAddr"
            type="email" 
            placeholder='Email' 
            value={registerEmail} 
            onChange={(e) => setRegisterEmail(e.target.value)}
            />
          <label htmlFor="regPWd">Password</label>
          <input 
            id="regPWD"
            type="password" 
            placeholder='Password' 
            value={createPassword} 
            onChange={(e) => setCreatePassword(e.target.value)}
            />
          <label htmlFor="checkPWD">Check Password</label>
          <input 
            id="checkPWD"
            type="password" 
            placeholder='Re-type password' 
            value={checkPWD} 
            onChange={(e) => setCheckPWD(e.target.value)}
            />
        </div>
        <button type='submit'>Create Account</button>
        <p>Already have an account ? <Link to='/login'>Log in</Link></p>
        {pwdError && <h4 style={{color : 'red'}}>{pwdError}</h4>}
        {emailPwdError && <h4 style={{color : 'red'}}>{emailPwdError}</h4>}
        {otherErrors&& <h4 style={{color : 'red'}}>{otherErrors}</h4>}
        {createAccountSuccessfully && <h4 style={{color : 'green'}}>Successfully created account</h4>}
      </form>
  </section>
  )
}

/* Can make more realistic by adding requirements to the password  (One uppercase, special char, etc) probably via Regular Expressions / Regex  */
