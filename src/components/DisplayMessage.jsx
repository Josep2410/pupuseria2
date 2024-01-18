import React from 'react'

export default function DisplayMessage({error = true , message =''}) {
  const style = {color : error ? 'red' : 'green'}
  return (
    <h4 style={style}>{message}</h4>
  )
}
