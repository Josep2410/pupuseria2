import React , {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import Context from '../Context/MyContext'
import DisplayMessage from '../components/DisplayMessage'

export default function CreateAccount() {

  const {users, usersURL, setUsers} = useContext(Context)
  const [createAccount , setCreateAccount ] = useState({email : '' , name : '' , password : ''})
  const [checkPWD, setCheckPWD] = useState('')
  const [createAccountSuccessfully, setCreateAccountSuccessfully] = useState(false)
  const [error, setError] = useState(null)

  const submitForm = (e) =>{
    e.preventDefault()
    setCreateAccountSuccessfully(false)
    setError(null)

    try{
      const existingEmail = users.find(user => user.email === createAccount.email.toLowerCase())
      const pwdMatch = createAccount.password === checkPWD
      if(existingEmail) throw new Error('Email already has an account')
      if(!pwdMatch) throw new Error('Passwords do not match')
      else if(!existingEmail && pwdMatch) createNewUser(createAccount)
    }catch(err){
      setError(err)
    }

  }

  const handleChange = (e) => {
    const {name , value} = e.target
    setCreateAccount(prev => ({...prev , [name] : value}))
  }

  const createNewUser = async ({email , name, password}) => {
    const newUser = {
      id : users.length? users[users.length - 1].id + 1 : 1,
      email : email.toLowerCase(),
      name : name,
      password : password
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
      setCreateAccount({email : '' , name : '' , password : ''})
      setCheckPWD('')
    }catch(err){
      setError(err.message)
    }
  }

  return (
    <section className="createAccount">
      <form className="createAccountForm" onSubmit={submitForm}>
        <h1>Create Account</h1>
        <div>
          <label htmlFor="emailAddr">Email</label>
          <input 
            required
            id="emailAddr"
            type="email" 
            placeholder='Email'
            name="email" 
            value={createAccount.email} 
            onChange={handleChange}
            />
          <label htmlFor="username">Name</label>
          <input 
            required
            id="username"
            type="text" 
            placeholder='First name' 
            name="name"
            value={createAccount.name} 
            onChange={handleChange}
            />
          <label htmlFor="regPWd">Password</label>
          <input 
            required
            id="regPWD"
            type="password" 
            name="password"
            placeholder='Password' 
            value={createAccount.password} 
            onChange={handleChange}
            />
          <label htmlFor="checkPWD">Check Password</label>
          <input 
            required
            id="checkPWD"
            type="password" 
            placeholder='Re-type password' 
            value={checkPWD} 
            onChange={(e) => setCheckPWD(e.target.value)}
            />
        </div>
        <button type='submit'>Create Account</button>
        <p>Already have an account ? <Link to='/login' className='link'>Log in</Link></p>
        {error && <DisplayMessage message={error.message}/>}
        {createAccountSuccessfully && <DisplayMessage error={false} message="Successfully created account"/>}
      </form>
  </section>
  )
}

/* Can make more realistic by adding requirements to the password  (One uppercase, special char, etc) probably via Regular Expressions / Regex  */
