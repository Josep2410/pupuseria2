import React, {useContext} from 'react'
import Title from '../components/Title'
import Context from '../Context/MyContext'
import DisplayNoContent from '../components/DisplayNoContent'
import PreviousOrder from '../components/PreviousOrder'

export default function PreviousOrders() {

  const {currentUser} = useContext(Context)

  return (
    <div className="previousOrders">
      <Title header='PREVIOUS ORDERS'/>
     <main>
     {currentUser?.previousOrders
        ? currentUser.previousOrders.map(order => <PreviousOrder order={order}/>)
        : <DisplayNoContent
        message="No Previous Orders"
        linkTo="/food"
        linkContent="Start an order" />
      }
     </main>
    </div>
  )
}
