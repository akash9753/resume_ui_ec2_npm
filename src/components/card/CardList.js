import React from 'react'
import Card from './Card';
import "./cardList.css"
const CardList = ({ cards,setData }) => {
  return (
    <div className="card-list">
      {cards?.map((card) => (
        <Card
          key={card.id}
          image={card.image}
          description={card.description}
          resumeId={card.resumeId}
          resumeName={card.resumeName}
          setData={setData}
        />
      ))}
    </div>
  )
}

export default CardList