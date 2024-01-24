import React, {useContext} from 'react'
import {useNavigate , Link} from 'react-router-dom'
import Title from '../components/Title'
import Context from '../Context/MyContext'

export default function Profile() {
  const { usersURL , currentUser , setCurrentUser , users , setUsers} = useContext(Context)
  const navigate = useNavigate()
  const logOut = () => {
    localStorage.removeItem("loggedIn")
    navigate('/login' , {replace : true})
  }
 
const deleteAccount = async () => {
  const otherUsers = users.filter(user => user.id !== currentUser.id)
  setUsers(otherUsers)
  setCurrentUser(null)
  try{
    const response = await fetch(`${usersURL}/users/${currentUser.id}` , {method : 'DELETE'})
    if(!response.ok) throw new Error('Error in trying to delete user')
    localStorage.removeItem("loggedIn")
    console.log('account deleted successfully')
    navigate('/home' , {replace : true})
  }catch(err){
    console.log(err.message)
  }

}

  return (
    <section className="profilePage">
      <Title />
      <div><Link to="previousOrders"><button>Previous Orders</button></Link></div>
      <div>   <button onClick={logOut}>Logout </button></div>
      <div><button onClick={deleteAccount} style={{color : '#BC0000'}}>Delete Account</button></div>
    </section>
  )
}
