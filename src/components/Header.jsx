import React , {useContext} from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Context from  '../Context/MyContext'

export default function Header() {

 const { totalCartItems } = useContext(Context)
 
  return (
    <header>
      {/* empty div used for justify content space between. Keep h1 in center and cart component to the right */}
      <div className="emptyDiv"></div>
      <h1>Mi Pupuseria</h1>
      <Link to="cart">
        <FaShoppingCart className="svg cart"/>
      <span className={totalCartItems > 0 ? 'display' : 'hide'}>{totalCartItems}</span>
      </Link>
    </header>
  )
}
