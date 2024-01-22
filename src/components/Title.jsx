import React from 'react'
import {useLocation} from 'react-router-dom'

export default function Title({header=''}) {
  const location = useLocation()
  const title = header || location.pathname.slice(1).toUpperCase()
  return (
    <h2 className="title">{title}</h2>
  )
}
