import React from 'react'
import {Outlet , Navigate} from 'react-router-dom'

export default function Authenticate() {

  const isLoggedIn = localStorage.getItem('loggedIn')

  if(!isLoggedIn) return <Navigate to="login" state={{message : 'Login first', intendedPath : location.pathname}} replace/>

  return <Outlet />
  
}
