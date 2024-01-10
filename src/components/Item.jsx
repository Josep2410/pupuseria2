import React from 'react'

export default function Item({item}) {
  return (
    <section className="itemContainer">
      <img src={item.img} alt={`picture of ${item.item}`} />
      <div className="itemInfo">
        <h4>{item.item}</h4>
        <span>{item.price}</span>
      </div>
    </section>
  )
}
