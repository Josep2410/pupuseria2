import React from 'react'
import { useParams, useLocation } from 'react-router-dom'

export default function FoodDetails() {
  const {id} = useParams()
  const location = useLocation()
  const currentItem = location.state.find(item => (item.id).toString() === id)

  return (
    <div>{currentItem.item}</div>
  )
}
