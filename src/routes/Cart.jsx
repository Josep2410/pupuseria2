import React , {useContext} from 'react'
import { Link } from 'react-router-dom'
import Context from '../Context/MyContext'
import Title from '../components/Title'
import Item from '../components/Item'
import DisplayTotal from '../components/DisplayTotal'
import DisplayNoContent from '../components/DisplayNoContent'

export default function Cart() {
  const {itemsInCart ,clearCart} = useContext(Context)

  const displayCartItems = itemsInCart.sort((a,b) => a.id - b.id).map(obj => <Item key={obj.id} item={obj}/>)

  return (
    <section className="cartPage">
      <Title />
      {displayCartItems.length
        ? 
        (
        <form onSubmit={(e)=> e.preventDefault()} className='cartForm' >
          {displayCartItems}
          <p onClick={clearCart} className='clearCart'>CLEAR CART</p>
          <DisplayTotal/>
          <button><Link to='/checkout'>Checkout</Link></button>
        </form>
        ) 
        : (
          <DisplayNoContent
             message="No Items in Cart"
             linkTo="/"
             linkContent="Return to Home" />
        ) }
    </section >
  )
}


