import React from 'react'
import {useNavigate} from 'react-router-dom'
import Title from '../components/Title'

export default function Profile() {
  const navigate = useNavigate()
  const logOut = () => {
    localStorage.removeItem("loggedIn")
    navigate('/login' , {replace : true})
  }
 
  return (
    <section className="profilePage">
      <Title />
      <button onClick={logOut}>Logout </button>
    </section>
  )
}
