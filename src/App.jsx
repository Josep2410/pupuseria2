import React from 'react'
import DefaultLayout   from './routes/DefaultLayout'
import { createBrowserRouter , createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom'
import Home from './routes/Home'
import Popular from './routes/Popular'
import Food from './routes/Food'
import FoodDetails from './routes/FoodDetails'
import Drinks from './routes/Drinks'
import Cart from './routes/Cart'
import Profile from './routes/Profile'
import Missing from './components/Missing'
import { MyContext } from './Context/MyContext'


function App() {

  const router = createBrowserRouter(createRoutesFromElements(
      //Consider adding an errorElement
      <Route path='/' element={<DefaultLayout /> }>
        <Route index element={<Navigate to='home' replace/>}/>
        <Route path="home" element={<Home />}/>
        <Route path="popular" element={<Popular />}/>
        <Route path="food" element={<Food />} />
        <Route path="food/:id" element={<FoodDetails/> } />
        <Route path="drinks" element={<Drinks/>}/>
        <Route path="profile" element={<Profile/>}/>
        <Route path="cart" element={<Cart/>}/>
        <Route path="*" element={<Missing />}/>
      </Route>
  ))

  return (
    <>
      <MyContext>
        <RouterProvider router={router}/>
      </MyContext>
    </>
  )
}

export default App
