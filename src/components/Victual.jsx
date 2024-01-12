import React from 'react'
import Item from '../components/Item'
import {Link,  useSearchParams} from 'react-router-dom'
import Title from './Title'

export default function Victual({victualItems, categories}) {
 
  const [searchParams, setSearchParams] = useSearchParams() 
  const displayFilter = searchParams.get('display')
  const displayItems = displayFilter 
    ? victualItems.filter(item => item.category === displayFilter || item.type === displayFilter)
    : victualItems
  const filterTabs = categories.map((category,indx) =>(
    <p 
      className={displayFilter===category ? "activeTab" : "tabs"}
      onClick={() => setSearchParams({display : category})}
      key={indx}>{upperCaseWord(category)}</p>))

  return (
    <main className="itemsContainer">
      <Title />
      <nav className="navTabs">
        <Link to="." className={!displayFilter ? "activeTab" : "tabs"}>All</Link>
       {filterTabs}
      </nav>
      {
        displayItems.length ? (displayItems.map(item=>(<Item key={item.id} item={item} state={displayItems}/>))) 
        : <p>Loading...</p>
      }
    </main>
  )
}


const upperCaseWord = (str) => {
  const firstLetter = str.charAt(0).toUpperCase()
  const others = str.slice(1)
  return firstLetter + others
}