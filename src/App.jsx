import React from 'react'
import DefaultLayout   from './routes/DefaultLayout'
import { createBrowserRouter , createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom'
import Home from './routes/Home'
import Popular from './routes/Popular'
import Food from './routes/Food'
import ItemDetails from './routes/ItemDetails'
import Drinks from './routes/Drinks'
import Cart from './routes/Cart'
import Profile from './routes/Profile'
import Missing from './components/Missing'
import Authenticate from './components/Authenticate'
import Checkout from './routes/Checkout'
import Login from './routes/Login'
import CreateAccount from './routes/CreateAccount'
import PreviousOrders from './routes/PreviousOrders'
import { MyContext } from './Context/MyContext'



function App() {

  const router = createBrowserRouter(createRoutesFromElements(
      //Consider adding an errorElement
      <Route path='/' element={<DefaultLayout /> }>
        <Route index element={<Navigate to='home' replace/>}/>
        <Route path="home" element={<Home />}/>
        <Route path="popular" element={<Popular />}/>
        <Route path="popular/:id" element={<ItemDetails /> } />
        <Route path="food" element={<Food />} />
        <Route path="food/:id" element={<ItemDetails/> } />
        <Route path="drinks" element={<Drinks/>}/>
        <Route path="drinks/:id" element={<ItemDetails/> } />
        <Route path="cart" element={<Cart/>}/>
        <Route element={<Authenticate />}>
          <Route path="checkout" element={<Checkout/>}/>
          <Route path="profile" element={<Profile/>}/>
          <Route path="profile/previousOrders" element={<PreviousOrders/>}/>
        </Route>
        <Route path="login" element={<Login />}/>
        <Route path="createAccount" element={<CreateAccount />}/>
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
