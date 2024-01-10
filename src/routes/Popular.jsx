import React, {useContext, useEffect, useState} from 'react'
import { Link , useSearchParams,  useLocation} from 'react-router-dom'
import Context from '../Context/MyContext'
import Item from '../components/Item'

export default function Popular() {
  const {menuItems} = useContext(Context)
  const [popularItems, setPopularItems] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const displayFilter = searchParams.get('display')
  const location = useLocation()
  const title = location.pathname.slice(1).toUpperCase()
  
  useEffect(()=> {
    setPopularItems(menuItems.filter(item => item.popular ))
  }, [menuItems])

  const displayItems = displayFilter
    ? popularItems.filter(item => item.type === displayFilter)
    : popularItems

  return (
    <main className="itemsContainer">
       <h1 className="title">{title}</h1>
      <nav className="navTabs">
        <Link to=".">All</Link>
        <Link to="?display=food">Food</Link>
        <Link to="?display=drinks">Drinks</Link>
      </nav>
      {
        displayItems.length ? (displayItems.map(obj=>(
          <Link 
              to={`${obj.id}`}
              state={displayItems}
              key={obj.id}
              >
                <Item item={obj}/>
            </Link>
        ))) 
        : <h1>Loading...</h1>
      }
    </main>
  )
}
