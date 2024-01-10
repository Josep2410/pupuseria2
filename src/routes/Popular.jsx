import React, {useContext, useEffect, useState} from 'react'
import { Link , useSearchParams,  useLocation} from 'react-router-dom'
import Context from '../Context/MyContext'
import Item from '../components/Item'
import Victual from '../components/Victual'

export default function Popular() {
  const {menuItems} = useContext(Context)
  const [popularItems, setPopularItems] = useState([])

  const categories = [...new Set(popularItems.map(item => item.type))]
  
  useEffect(()=> {
    setPopularItems(menuItems.filter(item => item.popular ))
  }, [menuItems])


  return (
    <Victual victualItems={popularItems} categories={categories}/>
  )
}
