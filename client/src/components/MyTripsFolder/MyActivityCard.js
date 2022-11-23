import React from 'react'

const MyActivityCard = ({activity}) => {
  return (
    <div className='myActivity-card'>
        <h4>{activity.title}</h4>
        <span>{activity.activity_type}</span>
        <span>{activity.description}</span>

    </div>
  )
}

export default MyActivityCard