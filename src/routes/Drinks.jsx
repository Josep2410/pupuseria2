import React, {useContext, useEffect, useState} from 'react'
import { useSearchParams} from 'react-router-dom'
import Context from '../Context/MyContext'
import Victual from '../components/Victual'

export default function Drinks() {
  const {menuItems} = useContext(Context)
  const [drinks, setDrinks] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const displayFilter = searchParams.get('display')
  const categories = [...new Set(drinks.map(item => item.category))]

  useEffect(()=> {
    setDrinks(menuItems.filter(item => item.type === 'drinks'))
  }, [menuItems])

  const displayItems = displayFilter
    ? drinks.filter(item => item.category === displayFilter)
    : drinks

  return (
    <Victual displayItems={displayItems} categories={categories}/>
  )
}
