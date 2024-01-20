import React , {useState ,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import DisplayTotal from '../components/DisplayTotal'
import Title from '../components/Title'
import Context from '../Context/MyContext'
import emailjs from 'emailjs-com'
import {format} from 'date-fns'

export default function Checkout() {
  const navigate = useNavigate()
  const {itemsInCart , updateUser, currentUser , clearCart} = useContext(Context)

  const [total , setTotal] = useState(0)
  const [date , setDate] = useState(format( new Date() , 'MM/dd/yyyy HH:mm:ss'))
  const confirmationNum = makeid(8)
 
  const orderDetails = itemsInCart.map(item => `\tItem : ${item.item} \t Qty : ${item.numberInCart} \t Price : $${item.numberInCart * item.price}`) 
  const emailBody = 
    `Order placed on ${date}\nTotal of $${total} was charged to your account.\nOrder details : \n${orderDetails.join('\n')}`


 

  const handleSubmit = (e) =>{
    e.preventDefault()
    updateUser('previousOrders', itemsInCart )
    emailjs.sendForm('service_nerl3hs', 'contact_form', e.target, 'C865dYJwizaxcQPPT')
      .then(()=> console.log('Success'), (err) => console.log(err))
    clearCart()
    navigate('/home')
  }

  return (
   <> 
    <Title />
    <div className="checkoutDiv">
      <DisplayTotal setTotal={setTotal}/>
      <form id="submitOrderForm" onSubmit={handleSubmit}>
        <input type="hidden" value={currentUser.email} name="recipient" />
        <input type="hidden" value={currentUser.name} name="to_name"/>
        <input type="hidden" value={emailBody} name="message" />
        <input type="hidden" value={confirmationNum} name="confirmationNumber" />
        <input type="hidden" value="MI PUPUSERIA" name="from_name" />
        <button type='submit'>Submit order</button>
      </form>
    </div>
   </>
  )
}


function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}