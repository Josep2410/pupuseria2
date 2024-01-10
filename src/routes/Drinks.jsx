import React, {useContext, useEffect, useState} from 'react'
import { Link , useSearchParams, useLocation} from 'react-router-dom'
import Context from '../Context/MyContext'
import Item from '../components/Item'

export default function Drinks() {
  const {menuItems} = useContext(Context)
  const [drinks, setDrinks] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const displayFilter = searchParams.get('display')
  const location = useLocation()
  const title = location.pathname.slice(1).toUpperCase()

  useEffect(()=> {
    setDrinks(menuItems.filter(item => item.type === 'drinks'))
  }, [menuItems])

  const displayItems = displayFilter
    ? drinks.filter(item => item.category === displayFilter)
    : drinks
  return (
    <main className="itemsContainer">
      <h1 className="title">{title}</h1>
      <nav className="navTabs">
        <Link to=".">All</Link>
        <Link to="?display=cold">Cold</Link>
        <Link to="?display=hot">Hot</Link>
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
