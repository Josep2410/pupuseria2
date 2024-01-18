import React , {useContext} from 'react'
import { Link } from 'react-router-dom'
import Context from '../Context/MyContext'
import Title from '../components/Title'
import Item from '../components/Item'
import DisplayTotal from '../components/DisplayTotal'

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
          <DisplayTotal/>
          <button><Link to='/checkout'>Checkout</Link></button>
        </form>
        ) 
        : (
      <section className='noItems'>
          <h1>No Items in Cart</h1>
          <Link to="/">Return to Home</Link>
      </section>
        ) }
    </section >
  )
}


