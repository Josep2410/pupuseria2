import React , {useContext} from 'react'
import { Link } from 'react-router-dom'
import Context from '../Context/MyContext'
import Title from '../components/Title'

export default function Cart() {
  const {itemsInCart , addItemToCart , removeItemFromCart , clearCart} = useContext(Context)

  const displayCartItems = itemsInCart.map(item => (
    <p>{item.item}</p>
  ))

  return (
    <section className="cartPage">
      <Title />
      {displayCartItems.length
        ? 
        (
        <form onSubmit={(e)=> e.preventDefault()} >
          {displayCartItems}
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
