import React, {useState, useEffect, createContext} from 'react'
import useWindowSize from '../hooks/useWindowSize'

const Context = createContext({})

export function MyContext({children}){
  const baseURL = 'http://localhost:3500'
  const {width , height} = useWindowSize()
  const [menuItems, setMenuItems] = useState([])
  const [error, setError] = useState(null)
  const [itemsInCart , setItemsInCart] = useState([])
  const [totalCartItems, setTotalCartItems] = useState(itemsInCart.reduce((total , curr) => total + curr.numberInCart , 0))

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
   else{
    console.log('Item is not in cart')
   }
  }
  const clearCart = () => {
    setItemsInCart([])
  }

  useEffect(() => {
    const getMenuItems = async () => {
     try{
      setError(null)
      const response = await fetch(`${baseURL}/menu`)
      if(!response.ok) throw Error('An error occurred')
      const data = await response.json()
      setMenuItems(data)
     }
     catch(err){
      setError(err.message)
     }
    }

    getMenuItems()

  }, [])

  useEffect(()=> {
    setTotalCartItems(itemsInCart.reduce((total , curr) => total + curr.numberInCart , 0))

  }, [itemsInCart])

  return (
    <Context.Provider value={{
      width, menuItems, error, itemsInCart,totalCartItems,
      addItemToCart, removeItemFromCart, clearCart
      }}>
      {children}
    </Context.Provider>
  )
}

export default Context