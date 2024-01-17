import React from 'react'
import {Outlet , Navigate} from 'react-router-dom'

export default function Authenticate() {

  const auth = false

  if(!auth) return <Navigate to="login"/>

  return <Outlet />
  
}
