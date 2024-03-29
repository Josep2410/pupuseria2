import React , {useContext}from 'react'
import {Link, useLocation} from 'react-router-dom'
import { GoStarFill } from "react-icons/go"; // filled star
import { IoMdAdd } from "react-icons/io";
import { GrSubtract } from "react-icons/gr";
import Context from '../Context/MyContext'

export default function Item({item, state = null}) {
  const location = useLocation()
  const {addItemToCart, removeItemFromCart, itemsInCart} = useContext(Context)
  //const existingItem = itemsInCart.find(obj => obj.id ===item.id)
 
  return (
    <section className="itemContainer">
      <img src={item.img} alt={`picture of ${item.item}`} />
      <div className="itemInfo">
        <div>
          <p>{item.item}</p>
          <GoStarFill className={`svg star ${item.popular? "" : 'disappear'}`}/>
        </div>
        <p className="price">${item.price}</p>
        <div>
          {item.numberInCart
            ? <p >Qty : {item.numberInCart}</p>
            : <LinkToItemDetails item={item} state={state}/>}
          {location.pathname !== "/profile/previousOrders" && (
          <>
            <IoMdAdd onClick={()=>addItemToCart(item)} className="svg addBtn"/>
            <GrSubtract onClick={()=>removeItemFromCart(item)} className="svg subtractBtn" />
          </>) }
        </div>
      </div>
    </section>
  )
}


//location.pathname === '/cart' -- was ternary condition
//<p >In Cart : {existingItem.numberInCart}</p>
function LinkToItemDetails({item , state = null}) {
return (
  <Link to={`${item.id}`} className="moreDetails link" state={state}>more details</Link>
  )
}