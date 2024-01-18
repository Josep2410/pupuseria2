import React from 'react'
import {useNavigate} from 'react-router-dom'

export default function Profile() {
  const navigate = useNavigate()
  const logOut = () => {
    localStorage.removeItem("loggedIn")
    navigate('/login' , {replace : true})
  }
 
  return (
    <div>
      <p>Profile Page</p>
      <button onClick={logOut}>Logout </button>
    </div>
  )
}
