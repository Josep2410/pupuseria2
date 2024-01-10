import React, {useState, useEffect, createContext} from 'react'
import useWindowSize from '../hooks/useWindowSize'

const Context = createContext({})

export function MyContext({children}){
  const baseURL = 'http://localhost:3500'
  const {width , height} = useWindowSize()
  const [menuItems, setMenuItems] = useState([])
  const [error, setError] = useState(null)

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
    <Context.Provider value={{width, menuItems, error}}>
      {children}
    </Context.Provider>
  )
}

export default Context