import React, {useContext, useEffect, useState} from 'react'
import { Link , useSearchParams} from 'react-router-dom'
import Context from '../Context/MyContext'
import Item from '../components/Item'

export default function Food() {
  const {menuItems} = useContext(Context)
  const [foodItems, setFoodItems] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const displayFilter = searchParams.get('display')

  useEffect(()=> {
    setFoodItems(menuItems.filter(item => item.type === 'food'))
  }, [menuItems])
 
  const displayItems = displayFilter 
    ? foodItems.filter(item => item.category === displayFilter)
    : foodItems

  return (
    <main className="itemsContainer">
      <nav className="navTabs">
        <Link to=".">All</Link>
        <Link to="?display=breakfast">Breakfast</Link>
        <Link to="?display=entree">Entrees</Link>
        <Link to="?display=dessert">Desserts</Link>
      </nav>
      {
        displayItems.length ? (displayItems.map(foodObj=>(
          <Link 
              to={`${foodObj.id}`}
              state={displayItems}
              key={foodObj.id}
              >
                <Item  item={foodObj}/>
            </Link>
        ))) 
        : <p>Loading...</p>
      }
    </main>
  )
}
