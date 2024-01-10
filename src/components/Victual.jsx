import React from 'react'
import Item from '../components/Item'
import {Link, useLocation} from 'react-router-dom'
 
export default function Victual({displayItems, categories}) {
  const location = useLocation()
  const title = location.pathname.slice(1).toUpperCase()

  const filterTabs = categories.map(category =>(
    <Link to={`?display=${category}`}>{category}</Link>))

  return (
    <main className="itemsContainer">
      <h1>{title}</h1>
      <nav className="navTabs">
        <Link to=".">All</Link>
       {filterTabs}
      </nav>
      {
        displayItems.length ? (displayItems.map(item=>(
          <Link 
              to={`${item.id}`}
              state={displayItems}
              key={item.id}
              >
                <Item  item={item}/>
            </Link>
        ))) 
        : <p>Loading...</p>
      }
    </main>
  )
}
