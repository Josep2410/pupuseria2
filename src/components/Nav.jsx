import React from 'react'
import { Link } from 'react-router-dom'
import { IoMdHome } from "react-icons/io";
import { GoStarFill } from "react-icons/go"; // filled star
/* import { FiStar } from "react-icons/fi";  //unfilled star */
import { GiTacos } from "react-icons/gi";
import { LuCupSoda } from "react-icons/lu";
import { MdAccountCircle } from "react-icons/md";

export default function Nav() {

  const drinks ={}
  const food ={}
  const popular ={}

  return (
    <nav className="navRoutes">
      <ul>
       <li>
        <Link to='home'>
          <IoMdHome className="svg home"/>
          <p>Home</p>
        </Link>
       </li>
       <li>
        <Link to="popular">
          <GoStarFill className="svg star-filled"/>
          <p>Popular</p>
        </Link>
       </li>
       <li>
        <Link to="food?" state="hello">
          <GiTacos  className="svg food"/>
          <p>Food</p>
        </Link>
       </li>
       <li>
        <Link to="drinks">
          <LuCupSoda className="svg food"/>
          <p>Drinks</p>
        </Link>
       </li>
       <li>
        <Link to="profile">
          <MdAccountCircle className="svg account"/>
          <p>Account</p>
        </Link>
       </li>
      </ul>
    </nav>
  )
}
