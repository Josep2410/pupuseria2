import React from 'react'
import { useParams, useLocation } from 'react-router-dom'

export default function FoodDetails() {
  const {id} = useParams()
  const location = useLocation()
  const currentItem = location.state.find(item => (item.id).toString() === id)
  console.log(currentItem)


  return (
    <div>{currentItem.item}</div>
  )
}
