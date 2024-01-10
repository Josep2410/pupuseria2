import React, {useContext} from 'react'
import Header from '../components/Header'
import Nav from '../components/Nav'
import {Outlet} from 'react-router-dom'
import Context from '../Context/MyContext'

export default function DefaultLayout() {
  
  const {width} = useContext(Context)
 
  return (
   <> 
    <Header />
    {
      width < 610 && width >=0 
      ? (<>
          <Outlet />
          <Nav />
        </>)
      : (<>
        <Nav />
        <Outlet />
      </>) 
    }
   </>
  )
}
