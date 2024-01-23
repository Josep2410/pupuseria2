import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import Context from '../Context/MyContext'
import Title from '../components/Title'


export default function Home() {
  const {currentUser} = useContext(Context)
  return (
    <div className="homePage">
    
      <Title/> 
      <ImagePane img="/images/pupusasDish.jpg" text="Authentic Salvadoran food" alt="pupusas dish" link=""/>
      <h4>Come and dine with us</h4>
      <Separator />
      <h3>New Here?</h3>
      <h4>Checkout our most popular items</h4>
      <ImagePane img="images/gallinaIndia.jpg" text="Browse our most popular Items" alt="gallina india" link="/popular"/>
      <Separator />
      <h3>Don't have an account?</h3>
      <h3>Create One</h3>
      <ImagePane img="/images/Salvadoran-Quesadilla.jpg.webp" text="Create Account" link="/createAccount"/>
      <h4>Earn reward points, view your previous orders and much more
        <span>Already have one ? <Link to="/login">Log in</Link></span>
      </h4>
      
      <Separator />
      
      <ImagePane img="/images/ole-spanish-restaurant.jpg" text="Established in 1965" link=""/>
    </div>
  )
}


function ImagePane({img , text, alt , link}){
  return (
  <div className='pane'>
    <Link to={link}>
      <img src={img} alt={alt} />
      <p>{text}</p>
    </Link>
  </div>

  )
} 

function Separator(){
  return(
    <div className="separator">

    </div>
  )
}