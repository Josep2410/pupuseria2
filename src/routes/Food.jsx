import React, {useContext, useEffect, useState} from 'react'
import { } from 'react-router-dom'
import Context from '../Context/MyContext'
import Victual from '../components/Victual'

export default function Food() {
  const {menuItems} = useContext(Context)
  const [foodItems, setFoodItems] = useState([])
  const categories = [...new Set(foodItems.map(item => item.category))]

  useEffect(()=> {
    setFoodItems(menuItems.filter(item => item.type === 'food'))
  }, [menuItems])
 
 

  return (
    <Victual victualItems={foodItems} categories={categories}/>
  )
}
