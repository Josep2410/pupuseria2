import React, {useState, useEffect, createContext} from 'react'
import useWindowSize from '../hooks/useWindowSize'

const Context = createContext({})

export function MyContext({children}){
  const menuURL = 'http://localhost:3500'
  const usersURL = 'http://localhost:4000'

  const {width , height} = useWindowSize()
  const [menuItems, setMenuItems] = useState([])
  const [users, setUsers] = useState([])
  const [currentUser , setCurrentUser] = useState(null)
  const [error, setError] = useState(null)
  const [itemsInCart , setItemsInCart] = useState([])
  const [totalCartItems, setTotalCartItems] = useState(itemsInCart.reduce((total , curr) => total + curr.numberInCart , 0))

  /* 
    UseEffect :
      1. Call and populate menuItems and users state-variables
      2. Ensure the user is logged off when the app first loads. Reason is to avoid a contradication/error
  */
  useEffect(() => { 
    const getMenuItems = async () => {
     try{
      setError(null)
      const response = await fetch(`${menuURL}/menu`)
      if(!response.ok) throw Error('An error occurred')
      const data = await response.json()
      setMenuItems(data)
     }
     catch(err){
      setError(err.message)
     }
    }

    const getUsers = async () => {
      try{
        setError(null)
        const response = await fetch(`${usersURL}/users`)
        if(!response.ok) throw new Error('Could not fetch users')
        const data = await response.json()
        setUsers(data)
      }catch(err){
        setError(err.message)
      }
    }

    getMenuItems()
    getUsers()
    localStorage.removeItem("loggedIn")
  }, [])

 /* Set the total number of items in the itemsInCart state-variable */
 useEffect(()=> {
  setTotalCartItems(itemsInCart.reduce((total , curr) => total + curr.numberInCart , 0))
  } , [itemsInCart])

  const addItemToCart = (newItem) => {
    const existingItem = itemsInCart.find(item => item.id === newItem.id)
    if(existingItem){
      const others = itemsInCart.filter(item => item.id !== existingItem.id)
      setItemsInCart([...others, {...existingItem, numberInCart : existingItem.numberInCart + 1}])
    }
   else{
    setItemsInCart([...itemsInCart, {...newItem, numberInCart : 1}])
   }
  }

  const removeItemFromCart = (item) => { 
   const existingItem = itemsInCart.find(obj => obj.id === item.id)
   if(existingItem){
    const others = itemsInCart.filter(obj => obj.id !== existingItem.id)
    existingItem.numberInCart >1 
      ? setItemsInCart([...others, {...existingItem , numberInCart : existingItem.numberInCart - 1}])
      : setItemsInCart([...others])
   }
  }
  const clearCart = () => {
    setItemsInCart([])
  }

  const updateUser = async (key, obj) => {
    const {id} = currentUser
    const others = users.filter(user => user.id !== id)
    const updateUser = currentUser.previousOrders ? [...currentUser.previousOrders , obj] : [obj]
    setCurrentUser({...currentUser , [key] : updateUser})
    setUsers([...others, {...currentUser, [key] : obj}])
    try{
      const response = await fetch(`${usersURL}/users/${id}`, {
        method : 'PATCH',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify({[key] : updateUser}) // try to push into existing array
      })
      if(!response.ok) throw new Error("PUT request error")

    }catch(err){
      console.log(err)
    }
   
  }

  return (
    <Context.Provider value={{
      usersURL , width, menuItems, error, itemsInCart,totalCartItems, users, currentUser,
      addItemToCart, removeItemFromCart, clearCart ,setUsers, setCurrentUser, updateUser
      }}>
      {children}
    </Context.Provider>
  )
}

export default Context