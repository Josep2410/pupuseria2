import React, {useContext, useEffect, useState} from 'react'
import { Link , useSearchParams} from 'react-router-dom'
import Context from '../Context/MyContext'
import Item from '../components/Item'

export default function Drinks() {
  const {menuItems} = useContext(Context)
  const [drinks, setDrinks] = useState([])

  
  useEffect(()=> {
    setDrinks(menuItems.filter(item => item.type === 'drinks'))
  }, [menuItems])

  return (
    <main className="itemsContainer">
      <nav className="navTabs">
        <p>All</p>
        <p>Agua Fresca</p>
        <p>Beer</p>
        <p>Others</p>
      </nav>
      {
        drinks.length ? (drinks.map(drinkObj=>(
          <Link 
              to={`${drinkObj.id}`}
              state={drinks}
              key={drinkObj.id}
              >
                <Item  item={drinkObj}/>
            </Link>
        ))) 
        : <h1>Loading...</h1>
      }
    </main>
  )
}
