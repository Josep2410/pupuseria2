import React, {useContext, useEffect, useState} from 'react'
import { useSearchParams} from 'react-router-dom'
import Context from '../Context/MyContext'
import Victual from '../components/Victual'

export default function Food() {
  const {menuItems} = useContext(Context)
  const [foodItems, setFoodItems] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const displayFilter = searchParams.get('display')
  const categories = [...new Set(foodItems.map(item => item.category))]
  useEffect(()=> {
    setFoodItems(menuItems.filter(item => item.type === 'food'))
  }, [menuItems])
 
  const displayItems = displayFilter 
    ? foodItems.filter(item => item.category === displayFilter)
    : foodItems

  return (
    <Victual displayItems={displayItems} categories={categories}/>
  )
}
