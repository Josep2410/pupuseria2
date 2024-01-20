import React, {useContext} from 'react'
import Context from '../Context/MyContext'
import Title from '../components/Title'


export default function Home() {
  const {currentUser} = useContext(Context)
  return (
    <>
      <Title/>
      {currentUser && <p>Hello, {currentUser.name}</p>}
    </>
  )
}
