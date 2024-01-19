import React , {useContext} from 'react'
import DisplayTotal from '../components/DisplayTotal'
import Title from '../components/Title'
import Context from '../Context/MyContext'
import emailjs from 'emailjs-com'

export default function Checkout() {
  const {itemsInCart , totalCartItems} = useContext(Context)

  const handleSubmit = (e) =>{
    e.preventDefault()
    emailjs.sendForm('service_nerl3hs', 'contact_form', e.target, 'C865dYJwizaxcQPPT')
      .then(()=> console.log('Success'), (err) => console.log(err))
  }

  return (
   <> 
    <Title />
    <div className="checkoutDiv">
      <DisplayTotal />
      <form id="submitOrderForm" onSubmit={handleSubmit}>
        <input type="hidden" value="josephpinoy2@yahoo.com" name="recipient" />
        <input type="hidden" value="rolando" name="to_name"/>
        <input type="hidden" value="blee blop bloo" name="message" />
        <input type="hidden" value="joseph" name="from_name" />
        <button type='submit'>Submit order</button>
      </form>
    </div>
   </>
  )
}
