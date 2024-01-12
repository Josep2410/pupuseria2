import React , {useContext}from 'react'
import {Link} from 'react-router-dom'
import { GoStarFill } from "react-icons/go"; // filled star
import { IoMdAdd } from "react-icons/io";
import { GrSubtract } from "react-icons/gr";
import Context from '../Context/MyContext'

export default function Item({item, state}) {
  const {addItemToCart, removeItemFromCart} = useContext(Context)
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
          <Link to={`${item.id}`} className="moreDetails" state={state}>more details</Link>
          <IoMdAdd onClick={()=>addItemToCart(item)} className="svg"/>
          <GrSubtract onClick={()=>removeItemFromCart(item)} className="svg" />
        </div>
      </div>
    </section>
  )
}
