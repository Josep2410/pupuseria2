import React, {useContext} from 'react'
import Context from '../Context/MyContext'

export default function DisplayTotal() {
  const {itemsInCart , totalCartItems,clearCart} = useContext(Context)
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
