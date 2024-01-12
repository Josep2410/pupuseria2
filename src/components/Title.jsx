import React from 'react'
import {useLocation} from 'react-router-dom'

export default function Title() {
  const location = useLocation()
  const title = location.pathname.slice(1).toUpperCase()
  return (
    <h2 className="title">{title}</h2>
  )
}
