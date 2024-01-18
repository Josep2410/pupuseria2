import React from 'react'
import DisplayTotal from '../components/DisplayTotal'
import Title from '../components/Title'

export default function Checkout() {
  return (
   <> 
    <Title />
    <div className="checkoutDiv">
      <DisplayTotal />
      <button>Submit order</button>
    </div>
   </>
  )
}
