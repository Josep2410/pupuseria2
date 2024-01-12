import React, {useState, useEffect, createContext} from 'react'
import useWindowSize from '../hooks/useWindowSize'

const Context = createContext({})

export function MyContext({children}){
  const baseURL = 'http://localhost:3500'
  const {width , height} = useWindowSize()
  const [menuItems, setMenuItems] = useState([])
  const [error, setError] = useState(null)
  const [itemsInCart , setItemsInCart] = useState([])


  const addItemToCart = (newItem) => {
    /* setItemsInCart([...itemsInCart, newItem]) */
    console.log('adding item...')
  }
  const removeItemFromCart = (item) => { 
    /*   const {id} = item
    const others = itemsInCart.filter(item => item.id !== id)
    setItemsInCart(others) */
    console.log('removing item...')
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

  return (
    <Context.Provider value={{
      width, menuItems, error, itemsInCart,
      addItemToCart, removeItemFromCart, clearCart
      }}>
      {children}
    </Context.Provider>
  )
}

export default Context