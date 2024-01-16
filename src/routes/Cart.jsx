import React , {useContext, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Context from '../Context/MyContext'
import Title from '../components/Title'
import Item from '../components/Item'

export default function Cart() {
  const {itemsInCart , totalCartItems,clearCart} = useContext(Context)

  const displayCartItems = itemsInCart.sort((a,b) => a.id - b.id).map(obj => <Item key={obj.id} item={obj}/>)

  return (
    <section className="cartPage">
      <Title />
      {displayCartItems.length
        ? 
        (
        <form onSubmit={(e)=> e.preventDefault()} >
          {displayCartItems}
          <p onClick={clearCart} style={{color : 'red', textDecoration: 'underline'}}>CLEAR CART</p>
          <DisplayTotal itemsInCart={itemsInCart} totalCartItems={totalCartItems} />
          <button>Submit</button>
        </form>
        ) 
        : (
      <>
          <h1>No Items in Cart</h1>
          <Link to="/">Return to Home</Link>
      </>
        ) }
    </section >
  )
}


function DisplayTotal({itemsInCart, totalCartItems}){

  const subTotal = (Math.round((itemsInCart.reduce((total , curr) => total + (curr.numberInCart * curr.price) , 0)) * 100) /100)
  const tax =  (Math.round((subTotal * .0825) * 100) / 100).toFixed(2)
  const total = (parseInt(tax)+ subTotal)
 
  return(
    <section className="totalPage">
      <p>
        <span>Total Number of Items :</span> 
        <span>{totalCartItems}</span>
      </p>
      <p>
        <span>Subtotal :</span> 
        <span>${subTotal}</span>
      </p>
      <p>
        <span>Tax :</span> 
        <span>${tax}</span>
      </p>
      <div></div>
      <p>
        <span>Total : </span>
        <span>${total}</span>
        </p>
    </section>
  )
}