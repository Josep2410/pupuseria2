import React from 'react'
import { Link } from 'react-router-dom'

export default function DisplayNoContent({message, linkTo, linkContent}) {
  return (
   <section className='noContent'>
    <h1>{message}</h1>
    <Link to={linkTo} className="link">{linkContent}</Link>
   </section>
  )
}
