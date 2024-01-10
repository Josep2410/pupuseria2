import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      {/* empty div used for justify content space between. Keep h1 in center and cart component to the right */}
      <div className="emptyDiv"></div>
      <h1>Mi Pupuseria</h1>
      <Link to="cart">
        <FaShoppingCart className="svg cart"/>
      </Link>
    </header>
  )
}
