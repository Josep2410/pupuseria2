import React, {useContext, useEffect, useState} from 'react'
import { Link , useSearchParams} from 'react-router-dom'
import Context from '../Context/MyContext'
import Item from '../components/Item'

export default function Popular() {
  const {menuItems} = useContext(Context)
  const [popularItems, setPopularItems] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const displayFilter = searchParams.get('display')
  
  useEffect(()=> {
    setPopularItems(menuItems.filter(item => item.popular ))
  }, [menuItems])

  const displayItems = displayFilter
    ? popularItems.filter(item => item.type === displayFilter)
    : popularItems

  return (
    <main className="itemsContainer">
      <nav className="navTabs">
        <Link to=".">All</Link>
        <Link to="?display=food">Food</Link>
        <Link to="?display=drinks">Drinks</Link>
      </nav>
      {
        displayItems.length ? (displayItems.map(drinkObj=>(
          <Link 
              to={`${drinkObj.id}`}
              state={displayItems}
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
