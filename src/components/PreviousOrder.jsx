import React , {useState} from 'react'
import Item from './Item'
export default function PreviousOrder({order}) {

  const [isDisplayPrevOrder, SetIsDisplayPrevOrder] = useState(false)
  const displayPreviousOrders = order.itemsInCart.map(item => <Item key={item.item} item={item}/>)
  const toggleDisplay = () =>{
    SetIsDisplayPrevOrder(prev => !prev)
  }

  return (
    <div className="previousOrder">
      <button onClick={toggleDisplay}>{order.date}</button>
      {isDisplayPrevOrder && <div className="prevOrders_container">{displayPreviousOrders}</div>}
    </div>
  )
}
