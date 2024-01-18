import React ,{useContext} from 'react'
import { IoArrowBackCircle } from "react-icons/io5";
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'
import Context from '../Context/MyContext';
import { GoStarFill } from "react-icons/go"; // filled star

export default function FoodDetails() {
  const {addItemToCart, removeItemFromCart} = useContext(Context)
  const navigate = useNavigate()
  const {id} = useParams()
  const location = useLocation()
  const currentItem = location.state.find(item => (item.id).toString() === id)

  return (
    <section className="itemDetailsContainer">
      <section>
        <Link to=".." onClick={() => navigate(-1) } className="backBtn"><IoArrowBackCircle className="svg"/></Link>
        <h3>{currentItem.item.toUpperCase()}</h3>
        <GoStarFill className={`svg star ${currentItem.popular? "" : 'hide'}`}/>
      </section>
      <img src={currentItem.img} alt={`image of ${currentItem.item}`} />
      <div className="itemDetailsInfo">
        <p>Ingredients: <span className='ingredients'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda alias fugiat optio cupiditate, vero fuga.</span>
        </p>
        <p>${currentItem.price}</p>
      </div>
        <button className="addToCart" onClick={() => addItemToCart(currentItem)}>Add to Cart</button>
        <button className="removeFromCart" onClick={() => removeItemFromCart(currentItem)}>Remove 
        </button>
    </section>
  )
}
