import React, {useState, useContext} from 'react'
import {useNavigate , Link} from 'react-router-dom'
import Title from '../components/Title'
import Context from '../Context/MyContext'
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';


export default function Profile() {

  const [modal, setModal] = useState(false);

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
      <div><button onClick={logOut}>Logout </button></div>
      <div><button onClick={() => setModal(true)} style={{color : '#BC0000'}}>Delete Account</button></div>
      <PureModal
        header="Are you sure? "
        footer={
          <div>
            <button onClick={() => setModal(false)}>Cancel</button>
            <button onClick={deleteAccount} className='danger'>YES, I'm sure</button>
          </div>
        }
        isOpen={modal}
        draggable={true}
        closeButton="X"
        closeButtonPosition="header"
        onClose={() => {
        setModal(false);
        return true;
    }}
       
  >
    <p>Deleting your account will delete all your information</p>
  </PureModal>
    </section>
  )
}
